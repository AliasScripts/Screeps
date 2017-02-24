
var swiftBoots = {

    run: function(creep) {
        //Puts in work orders for roads wherever it steps
        creep.room.createConstructionSite(creep.pos,STRUCTURE_ROAD);
    }
};

module.exports = swiftBoots;