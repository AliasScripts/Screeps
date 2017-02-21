
var passiveRoads = {

    run: function(creep) {

        Game.rooms.W81S17.createConstructionSite(creep.pos,STRUCTURE_ROAD);

    }
};

module.exports = passiveRoads;