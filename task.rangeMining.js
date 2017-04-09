var rangeMining = {

    run: function(creep) {

        let flag = Game.flags.mine;

        let home = Game.flags.home;
        var controller=home.room.controller;

        //Check if there is a container next to controller
        let container = controller.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];

        //If never gathered, give it a gather variable
        if(creep.memory.gathering == null){
            creep.memory.gathering = true;
        }

        //If the creep is not gathering and has 0 energy
        if(!creep.memory.gathering && creep.carry.energy == 0) {
            //tell it to gather
            creep.memory.gathering = true;
        }
        //If the creep is gathering and has full energy
        if(creep.memory.gathering && creep.carry.energy == creep.carryCapacity) {
            //tell it to stop gathering
            creep.memory.gathering = false;
        }

        //If the creep is gathering
        if(creep.memory.gathering==true){
            if(creep.pos.roomName == flag.pos.roomName){
                creep.moveTo(flag);
                var source=flag.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }

            }else{
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(flag.pos.roomName)));
            }

        }else{
            if(creep.pos.roomName == home.pos.roomName){
                if(container!=undefined){
                    //If there IS a container
                    //If the unit is not 1 block adjacent to it
                    if(creep.pos.getRangeTo(container)!=1){
                        creep.moveTo(container);
                    }else{
                        creep.transfer(container,RESOURCE_ENERGY);
                    }
                }
            }else{
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(home.pos.roomName)));
            }

        }

    }

}

module.exports = rangeMining;