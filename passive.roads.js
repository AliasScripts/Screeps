
var passiveRoads = {

    run: function(creep) {

        //Puts in work orders for roads wherever it steps
        Game.rooms.W81S17.createConstructionSite(creep.pos,STRUCTURE_ROAD);

        //Repairs any road it steps on
        if (creep.carry.energy > 0) {
            //All creeps check for road under them and repair if needed.
            var someStructure = creep.pos.lookFor(LOOK_STRUCTURES);
            if (someStructure.length && (someStructure[0].hitsMax - someStructure[0].hits >= 600)) {
                creep.repair(someStructure[0]);
            }
        }
    }
};

module.exports = passiveRoads;