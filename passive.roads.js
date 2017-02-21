/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('passive.roads');
 * mod.thing == 'a thing'; // true
 */

var passiveRoads = {

    run: function(creep) {

        Game.rooms.W81S17.createConstructionSite(creep.pos,STRUCTURE_ROAD);

    }
};

module.exports = passiveRoads;