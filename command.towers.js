var towers = {

    /** @param {Game} game **/
    run: function() {
        towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        })

        _.forEach(towers, function(tower){


            //Enemies
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            //Containers
            var container = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER && s.hits < s.hitsMax
            });

            //Weak Units
            var weak = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: s => s.hits < s.hitsMax
            });


            //Spawn
            var spawn = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_SPAWN && s.hits < s.hitsMax
            });

            //Roads
            var road = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax
            });

            //walls and ramparts
            var walls = tower.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART
        });



            if(weak){
                tower.heal(weak);
            }

            else if(closestHostile) {
                if(closestHostile.pos.y>5){
                    tower.attack(closestHostile);
                }else if(weak){
                    tower.heal(weak);
                }else if(spawn){
                    tower.repair(spawn);
                }

                if(closestHostile.pos.x>=17){
                    if(closestHostile.pos.y<=26){
                        if(closestHostile.pos.x<=42){
                            Game.rooms.E87N31.controller.activateSafeMode();
                        }
                    }
                }

            }

            else if(spawn){
                tower.repair(spawn);
            }

            else if(container){
                tower.repair(container);
            }

            else if(road){
                tower.repair(road);
            }

            else if(walls){
                var target = undefined;

                // loop with increasing percentages
                for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                    // find a wall with less than percentage hits
                    for (let wall of walls) {


                        if(wall.structureType=='rampart'){
                            if (wall.hits < 5000) {
                                target = wall;
                                //console.log(wall.hits);
                                break;
                            }else if (wall.hits <=Memory.wallHP) {
                                target = wall;
                                //console.log(wall.hits);
                                //break;
                            }
                        }else{
                            if (wall.hits < 5000) {
                                target = wall;
                                //console.log(wall.hits);
                                break;
                                Memory.wallHP=target.hits;
                            }else if (wall.hits / wall.hitsMax < percentage) {
                                target = wall;
                                Memory.wallHP=target.hits;
                                //console.log(wall.hits);
                                //break;
                            }
                        }

                    }

                    // if there is one
                    if (target != undefined) {
                        // break the loop
                        //console.log(target.hits);
                        break;
                    }
                }

                tower.repair(target);
            }


            else if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

        })
    }
};

module.exports = towers;