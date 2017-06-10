var taskGather = require('task.gather');
var towers = require('task.towers');
var build = {

    run: function(creep,roomLevel,roomSpawn,sources,room) {


        var constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

        //Containers
        var weakContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function (s) {
                return s.structureType == STRUCTURE_CONTAINER && s.hits < s.hitsMax
            }
        });

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

        }else if(weakContainer){
            var result = creep.repair(weakContainer);
            if(result == ERR_NOT_IN_RANGE){
                creep.moveTo(weakContainer);

            }
        }else if (constructionSite) {
                var result = creep.build(constructionSite);
                if(result == ERR_NOT_IN_RANGE){
                    creep.moveTo(constructionSite);
                }else if(result == ERR_INVALID_TARGET){
                    creep.moveTo(0,0);
                }
        }else{
            towers.run(creep,sources,roomSpawn,room);

        }
    }
};
module.exports = build;
