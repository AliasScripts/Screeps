var mine = {

    run: function(creep,sources) {
        //Check which source to work at
        var target = 0;
        //For each source
        for(i=0;i < sources.length;i++){
            //find the closest miner to the source
            var minerTeam = sources[i].pos.findInRange(FIND_MY_CREEPS, 50, {
                filter: function (s) {
                    return s.memory.role == 'miner'
                }
            })[0];
            //tell the closest miner to target this source
            if(minerTeam==creep){
                target = i;
            }
            //If there is a miner next to the source, but it's not this unit, keep looking for a source to target
        }

        // find container next to source
        var container = sources[target].pos.findInRange(FIND_STRUCTURES, 1, {
            filter: function (s) {
                return s.structureType == STRUCTURE_CONTAINER
            }
        })[0];

        //If there isn't a container ready yet
        if(container==undefined){
            //idle
        }
        // if creep is on top of the container
        else if (creep.pos.isEqualTo(container.pos)) {
            // harvest source
            creep.harvest(sources[target]);
        }
        // if creep is not on top of the container
        else {
            // move towards it
            creep.moveTo(container);
        }

    }

}

module.exports = mine;