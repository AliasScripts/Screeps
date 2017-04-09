var taskMorpheus = {

    run: function(creep) {

        target = creep.room.controller;

        // find container next to source
        let container = target.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
    })[0];


        //If there isn't a container ready yet
        if(container==undefined){
            //idle
        }else{
            //Get container energy
            var energyLeft=container.store[RESOURCE_ENERGY];
        }

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

            if(Memory.queue<=0){
                if(creep.withdraw(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['Spawn1']);
                }
            }else{
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }else{

            if (energyLeft < 2000){
                //Give energy to Neo

                //Check if there is a container next to controller
                let container = creep.room.controller.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
            })[0];

                if(container!=undefined){
                    //If there IS a container
                    //If the unit is not 1 block adjacent to it
                    if(creep.pos.getRangeTo(container)!=1){
                        creep.moveTo(container);
                    }else{
                        creep.transfer(container,RESOURCE_ENERGY);
                    }
                }
            }
        }

    }

}

module.exports = taskMorpheus;