var upgrade = require('task.upgrade');
var build = require('task.build');

var harvest = {

    run: function(creep,roomSpawn,roomEnergy,roomEnergyMax) {

        if(roomEnergy<roomEnergyMax){

            if(creep.carry.energy < creep.carryCapacity) {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            else {
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
                    //If there is no empty extender
                    var result = creep.transfer(roomSpawn, RESOURCE_ENERGY);
                    if(result == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roomSpawn);
                    }
                }
            }
        }else{
            if(creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES)!=null){
                build.run(creep);
            }else{
                upgrade.run(creep);
            }
        }

    }
};
module.exports = harvest;
