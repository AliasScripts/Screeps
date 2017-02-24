var taskContainer = {

    run: function(creep) {

        //Get sources
        var sources = creep.room.find(FIND_SOURCES);
        var sourceCount = sources.length;

        //Check which source to work at
        var target = 0;
        //For each source
        for(i=0;i < sources.length;i++){
            //check for a containment unit within range
            let containmentTeam = sources[i].pos.findInRange(FIND_MY_CREEPS, 2, {
                    filter: s => s.memory.task == 'containment'
            })[0];
            //if this creep is standing next to the source
            if(containmentTeam==creep){
                //target this source
                var target = i;
                //store it in memory
                creep.memory.targetContainer = i;
                //and stop looking
                break;
            //If there is no containment unit by the source
            }else if(containmentTeam==undefined){
                //target that source
                var target = i;
                //save it in memory
                creep.memory.targetContainer = i;
                //and stop searching
                break;
            }
            //If there is a containment unit next to the source, but it's not this unit, keep looking for a source to target
        }

        //Check if there is a container next to source 1
        let container = sources[target].pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];

        //Check if there is a container construction site next to source 1
        let workSites = sources[target].pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];


        //if there is no container by source 1
        if(container == undefined){
            //If there is a job site to build one
            if(workSites!=null){
                //If never gathered, give it a gather variable
                if(creep.memory.gathering == null){
                    creep.memory.gathering = true;
                }
                //If the creep is not gathering and has 0 energy
                if(!creep.memory.gathering && creep.carry.energy == 0) {
                    //tell it to gather
                    creep.memory.gathering = true;
                }
                //If the creep is gathering and has full energy
                if(creep.memory.gathering && creep.carry.energy == creep.carryCapacity) {
                    //tell it to stop gathering
                    creep.memory.gathering = false;
                }
                //If the creep is gathering
                if(creep.memory.gathering==true){
                    //Find energy sources
                    var sources = creep.room.find(FIND_SOURCES);
                    //If a source is in range harvest
                    if(creep.harvest(sources[target]) == ERR_NOT_IN_RANGE) {
                        //if not, move closer
                        creep.moveTo(sources[target]);
                    }
                }
                //If the creep is not gathering
                else {
                    if(creep.build(workSites) == ERR_NOT_IN_RANGE){
                        creep.moveTo(workSites);
                    }
                }
            }else{
                //if the peon is next to source
                if(sources[target].pos.getRangeTo(creep)==1){
                    //Make a job site
                    creep.room.createConstructionSite(creep.pos,STRUCTURE_CONTAINER);
                }else{
                    //if not, move to source
                    creep.moveTo(sources[target])
                }
            }

        }else{
            //If there IS a container
            //If the unit is not 1 block adjacent to it
            if(creep.pos.getRangeTo(container)!=1){
                creep.moveTo(container);
            }else{

                //If the creep is 1 block away from the container
                //If the creep has no energy
                if(creep.carry.energy==0){
                    creep.withdraw(container,RESOURCE_ENERGY);
                }else if(container.hits<container.hitsMax){
                    creep.repair(container);
                }
            }
        }

    }
};
module.exports = taskContainer;
