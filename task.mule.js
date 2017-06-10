var taskGather = require('task.gather');
var mule = {

    run: function(creep,sources,roomSpawn,room) {

        // find container next to controller
        var overflow = room.controller.pos.findInRange(FIND_STRUCTURES, 2, {
            filter: function (s) {
                return s.structureType == STRUCTURE_CONTAINER
            }
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
            taskGather.run(creep,sources);
        }else{

            //find extensions
            var choice = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (s) {
                    return s.structureType == STRUCTURE_EXTENSION && s.energy<s.energyCapacity
                }
            })
            if(choice != undefined){
                if(creep.transfer(choice, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(choice);
                }
            }else{
                if(roomSpawn.energy<300){
                    //If there is no empty extender
                    var result=creep.transfer(roomSpawn, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roomSpawn);
                    }
                }else{

                    //If everything is full
                    var result=creep.transfer(overflow, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(overflow);
                    }
                }

            }
        }

    }

}

module.exports = mule;