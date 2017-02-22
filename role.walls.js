/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleUpgrader = require('role.upgrader');
//var roleHarvester = require('role.harvester');

var roleWalls = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if(creep.memory.working==false){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        else {

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
                // if we can't fine one
                else {
                    // look for construction sites
                    roleUpgrader.run(creep);
                }


        }
    }
};

module.exports = roleWalls;