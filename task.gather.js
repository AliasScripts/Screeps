var gather = {

    run: function(creep,sources) {

        //pull info

        //Find energy on the ground
        var pickup = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);

        //choose targets

        var target;

        //For each source
        var largestContainer = 0;
        for(i=0;i < sources.length;i++){

            var container = sources[i].pos.findInRange(FIND_STRUCTURES, 1, {
                filter: function (s) {
                    return s.structureType == STRUCTURE_CONTAINER
                }
            })[0];

            if(container!=null){
                if(container.store[RESOURCE_ENERGY] > largestContainer){
                    largestContainer = container.store[RESOURCE_ENERGY];
                    target = container;
                }
            }
        }

        //gather

        if(largestContainer>=1750){
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }else if(pickup!=null){
            if(creep.pickup(pickup) == ERR_NOT_IN_RANGE){
                creep.moveTo(pickup);
            }
        }else if(target!=null){
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }else{
            //Find energy sources
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            //If a source is in range harvest
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                //if not, move closer
                creep.moveTo(source);
            }
        }
    }
};
module.exports = gather;
