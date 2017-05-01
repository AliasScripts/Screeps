var upgrade = {

    run: function(creep) {

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
            var bucket = creep.room.controller.pos.findInRange(FIND_STRUCTURES, 2, {
                filter: function (s) {
                    return s.structureType == STRUCTURE_CONTAINER
                }
            })[0];

            if(bucket!=null){
                if(creep.withdraw(bucket, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(bucket);
                }
                //If the room controller is in range upgrade
                if(creep.upgradeController(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //if not, move closer
                    creep.moveTo(creep.room.controller);
                }

            }else{
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                //If a source is in range harvest
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    //if not, move closer
                    creep.moveTo(source);
                }
            }
        }
        //If the creep is not gathering
        else {
            //If the room controller is in range upgrade
            if(creep.upgradeController(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //if not, move closer
                creep.moveTo(creep.room.controller);
            }
        }

    }
};
module.exports = upgrade;
