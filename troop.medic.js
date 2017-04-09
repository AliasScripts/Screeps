var troopMedic = {


    run: function(creep) {

        creep.heal(creep);

        let flag = Game.flags.ralley;
        var targetRoom = flag.pos.roomName;

        if(creep.pos.roomName == targetRoom){

            //Weak Units
            var weak = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: s => s.hits < s.hitsMax
            });

            var defenders = creep.pos.findInRange(FIND_MY_CREEPS, 50, {
                filter: function (s) {
                    return s.memory.role == 'Defender'
                }
            })[0];

            console.log(defenders);

            if(defenders){
                creep.moveTo(defenders);
                if(creep.heal(weak)==-9){
                    creep.moveTo(defenders);
                }
            }else{
                creep.moveTo(flag);
            }


        }else{
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(targetRoom)));
        }

    }

}

module.exports = troopMedic;