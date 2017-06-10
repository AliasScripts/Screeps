var mule = require('task.mule');
var taskGather = require('task.gather');
var towers = {

    run: function(creep,sources,roomSpawn,room) {

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
            //find towers
            var choice = room.controller.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (s) {
                    return s.structureType == STRUCTURE_TOWER && s.energy<s.energyCapacity
                }
            });

            if(choice != undefined){
                if(creep.transfer(choice, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(choice);
                }
            }else{
                mule.run(creep,sources,roomSpawn,room);
            }
        }

    }

}

module.exports = towers;