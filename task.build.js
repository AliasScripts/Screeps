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
            if(roomLevel>=3){

                var container = sources[1].pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: function (s) {
                        return s.structureType == STRUCTURE_CONTAINER
                    }
                })[0];
                
                if(container!=null){
                    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
                }else{
                                    //Find energy sources
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                //If a source is in range harvest
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    //if not, move closer
                    creep.moveTo(source);
                }
                }
            }else{
                //Find energy sources
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                //If a source is in range harvest
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    //if not, move closer
                    creep.moveTo(source);
                }
            }
        }else if(weakContainer != null){
            var result = creep.repair(weakContainer);
            if(result == ERR_NOT_IN_RANGE){
                creep.moveTo(weakContainer);

            }
        }else if (constructionSite != undefined) {
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
