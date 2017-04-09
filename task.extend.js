var taskBuild = {

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

        if(creep.memory.gathering==true){


            if(Memory.queue<=0){
                if(creep.withdraw(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['Spawn1']);
                }
            }else{
                creep.moveTo(Game.spawns['Spawn1']);
            }



            /*
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
             }
             */

        }
        else {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            var workSites = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,{
                    filter: s => s.structureType == STRUCTURE_RAMPART
            });

            if(workSites!=undefined){
                if(creep.build(workSites) == ERR_NOT_IN_RANGE){
                    creep.moveTo(workSites);
                }
            }else if (constructionSite != undefined){
                var result = creep.build(constructionSite);
                if(result == ERR_NOT_IN_RANGE){
                    creep.moveTo(constructionSite);
                }else if(result == ERR_INVALID_TARGET){
                    creep.moveTo(24,15);
                }
            }else{

                // find all walls in the room
                var walls = creep.room.find(FIND_STRUCTURES, {
                        filter: (s) => s.structureType == STRUCTURE_WALL
                });

                var target = undefined;

                // loop with increasing percentages
                for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                    // find a wall with less than percentage hits
                    for (let wall of walls) {

                        if (wall.hits < 5000) {
                            target = wall;
                            //console.log(wall.hits);
                            break;
                        }else if (wall.hits / wall.hitsMax < percentage) {
                            target = wall;
                            //console.log(wall.hits);
                            //break;
                        }

                    }

                    // if there is one
                    if (target != undefined) {
                        // break the loop
                        //console.log(target.hits);
                        break;
                    }
                }

                // if we find a wall that has to be repaired
                if (target != undefined) {
                    // try to repair it, if not in range
                    creep.room.visual.circle(target.pos, {
                        fill: 'transparent',
                        stroke: 'green',
                        radius: 0.75
                    });
                    var formattedNumber = target.hits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    creep.room.visual.text(formattedNumber, target.pos.x + 1, target.pos.y, {
                        align: 'left',
                        color: '#7DE3B5',
                        size: 0.7
                    });
                    if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(target);
                    }
                }

                else if(creep.upgradeController(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //if not, move closer
                    creep.moveTo(creep.room.controller);
                }
            }

        }
    }
};

module.exports = taskBuild;