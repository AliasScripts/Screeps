var unitTower = {
    run: function(room) {

        var farmMode = false;
        for(i in Game.flags){
            if(Game.flags[i].room==room){
                if(Game.flags[i].pos.x==0 && Game.flags[i].pos.y==0){
                    farmMode=true;
                }
            }
        }

        var towers = room.controller.pos.findInRange(FIND_MY_STRUCTURES,50, {
            filter: { structureType: STRUCTURE_TOWER }
        });

        towers = _.sortBy(towers, s => room.controller.pos.getRangeTo(s));

        for(var i in towers) {

            var tower = towers[i];

            //Find things

            //Enemies
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            //Containers
            var container = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (s) {
                    return s.structureType == STRUCTURE_CONTAINER && s.hits < s.hitsMax
                }
            });

            //Weak Units
            var weak = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function (s) {
                    return s.hits < s.hitsMax
                }
            });

            //Roads
            var roads = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (s) {
                    return s.structureType == STRUCTURE_ROAD && s.hits < s.hitsMax
                }
            });

            //Walls
            var walls = tower.room.find(FIND_STRUCTURES, {
                filter: function (s) {
                    return s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART
                }
            });

            if(towers.length==1){
                if(closestHostile!= null){
                    tower.attack(closestHostile);
                }else if (weak != null){
                    tower.heal(weak);
                }else if (container != null){
                    tower.repair(container);
                }else if (roads != null){
                    tower.repair(roads);
                }else if (walls != null){
                    var target = undefined;
                    var target = undefined;
                    var  targetHP = 999999999;
                    for(i in walls){
                        if(walls[i].hits<targetHP){
                            targetHP = walls[i].hits;
                            target=walls[i];
                        }
                    }
                    if(farmMode){
                        if(target!=null){
                            if(target.structureType==STRUCTURE_RAMPART){
                                tower.repair(target);
                            }
                        }
                    }else{
                        tower.repair(target);
                    }
                }
            }else if(i<towers.length-1){
                if (weak != null){
                    tower.heal(weak);
                }else if(closestHostile!= null){
                    tower.attack(closestHostile);
                }
            }else{
                if(closestHostile!= null){
                    tower.attack(closestHostile);
                }else if (weak != null){
                    tower.heal(weak);
                }else if (container != null){
                    tower.repair(container);
                }else if (roads != null){
                    tower.repair(roads);
                }else if (walls != null){
                    var target = undefined;
                    var  targetHP = 999999999;
                    for(i in walls){
                        if(walls[i].hits<targetHP){
                            targetHP = walls[i].hits;
                            target=walls[i];
                        }
                    }
                    if(farmMode){
                        if(target!=null){
                            if(target.structureType==STRUCTURE_RAMPART){
                                tower.repair(target);
                            }
                        }
                    }else{
                        tower.repair(target);
                    }
                }
            }

        }

    }

};
module.exports = unitTower;