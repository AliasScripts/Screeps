var taskUplink = {

    run: function(creep) {

        var roomController = creep.room.controller;

        //Check if there is a container next to controller
        let container = roomController.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];

        //Check if there is a container construction site next to controller
        let workSites = roomController.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];


        //if there is no container by controller
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
                    //Don't pull energy if a unit needs to spawn
                    if(Memory.queue==0){
                        if(creep.withdraw(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.spawns['Spawn1']);
                        }
                    }else{
                        creep.moveTo(Game.spawns['Spawn1']);
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
                if(roomController.pos.getRangeTo(creep)==1){
                    //Make a job site
                    creep.room.createConstructionSite(creep.pos,STRUCTURE_CONTAINER);
                }else{
                    //if not, move to source
                    creep.moveTo(roomController);
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
module.exports = taskUplink;
