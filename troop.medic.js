var medic = {


    run: function(creep) {

        creep.heal(creep);

        var flag = Game.flags.Flag1;
        var targetRoom = flag.pos.roomName;

        if(creep.pos.roomName == targetRoom){

            //Weak Units
            var weak = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function (s) {
                    return s.hits < s.hitsMax
                }
            });

            var tanks = creep.pos.findInRange(FIND_MY_CREEPS, 50, {
                filter: function (s) {
                    return s.memory.role == 'Tank'
                }
            })[0];

            if(tanks){
                creep.moveTo(tanks);
                if(creep.heal(weak)==-9){
                    creep.moveTo(tanks);
                }
            }else{
                creep.moveTo(flag);
            }


        }else{
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(targetRoom)));
        }

    }

}

module.exports = medic;