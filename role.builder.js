/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleUpgrader = require('role.upgrader');

var roleBuilder = {

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
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite != undefined){
                if(creep.build(constructionSite) == ERR_NOT_IN_RANGE){
                    moveTo(constructionSite);
                }
            }
            else{
                roleUpgrader.run(creep);
            }

        }

        /*
         if(creep.carry.energy < creep.carryCapacity) {
         var sources = creep.room.find(FIND_SOURCES);
         if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
         creep.moveTo(sources[1]);
         }
         }
         else {
         if(creep.upgradeController(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
         creep.moveTo(creep.room.controller);
         }
         }
         */
    }
};

module.exports = roleBuilder;