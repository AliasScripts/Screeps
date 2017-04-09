var taskNeo = {

    run: function(creep) {

        var roomController = creep.room.controller;
        // find container next to source
        let container = roomController.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];



        //If there isn't a container ready yet
        if(container==undefined){
            creep.moveTo(creep.room.controller);
        }else{
            var energyLeft=container.store[RESOURCE_ENERGY];

            // if creep is on top of the container
            if (creep.pos.getRangeTo(container)<=1) {
                //Uplink Energy
                if(creep.carry.energy==0){
                    creep.withdraw(container,RESOURCE_ENERGY);
                    creep.upgradeController(creep.room.controller, RESOURCE_ENERGY);
                }else{
                    creep.upgradeController(creep.room.controller, RESOURCE_ENERGY);
                }
            }
            // if creep is not on top of the container
            else {
                // move towards it
                creep.moveTo(container);
            }
        }

    }

}

module.exports = taskNeo;