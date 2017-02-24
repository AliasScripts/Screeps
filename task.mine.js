var taskMine = {

    run: function(creep) {
        //Get sources
        var sources = creep.room.find(FIND_SOURCES);
        var sourceCount = sources.length;

        //Check which source to work at
        var target = 0;
        //For each source
        for(i=0;i < sources.length;i++){
            //check for a miner unit within range of the source
            let minerTeam = sources[i].pos.findInRange(FIND_MY_CREEPS, 1, {
                    filter: s => s.memory.role == 'miner'
            })[0];
            //if there is a miner next to the source, and it's this unit
            if(minerTeam==creep){
                //target this source
                var target = i;
                //store it in memory
                creep.memory.targetMine = i;
                //and stop looking
                break;
            //If there is no containment unit by the source
            }else if(minerTeam==undefined){
                //target this source
                var target = i;
                //save it in memory
                creep.memory.targetMine = i;
                //and stop searching
                break;
            }
            //If there is a miner next to the source, but it's not this unit, keep looking for a source to target
        }

        // find container next to source
        let container = sources[target].pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
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

module.exports = taskMine;