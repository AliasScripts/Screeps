var antiTower = {


    run: function(creep) {

        creep.heal(creep);

        let flag = Game.flags.Flag2;
        var targetRoom = flag.pos.roomName;

        let ralley = Game.flags.ralley

        if(creep.pos.roomName == targetRoom){
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(ralley)));
        }else{
            if(creep.hits<creep.hitsMax){
                creep.moveTo(ralley);
            }else{
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(targetRoom)));
            }

        }

    }

}

module.exports = antiTower;