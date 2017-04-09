
var swiftBoots = {

    run: function(creep) {
        //Puts in work orders for roads on top of swamps that it chose to walk over.
        var terrain = creep.room.lookForAt('terrain', creep.pos.x, creep.pos.y);

        if(terrain == 'swamp'){
            creep.room.createConstructionSite(creep.pos,STRUCTURE_ROAD);
        }


    }
};

module.exports = swiftBoots;