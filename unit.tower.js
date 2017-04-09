var unitTower = {
    run: function(room) {

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
            }

        }

    }

};
module.exports = unitTower;