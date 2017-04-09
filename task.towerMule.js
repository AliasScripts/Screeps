var towerMule = {

    run: function(creep) {

        var sources = creep.room.find(FIND_SOURCES);

        var storage = creep.room.storage;

        // find container next to source
        let container = sources[1].pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];

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

        var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        })
        _.forEach(towers, function(tower){
            if(tower.energy<tower.energyCapacity){
                //If the creep is gathering
                if(creep.memory.gathering==true){
                    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }else{

                    if (tower.energy < tower.energyCapacity){

                        if(tower!=undefined){
                            //If there IS a container
                            //If the unit is not 1 block adjacent to it
                            if(creep.pos.getRangeTo(storage)!=1){
                                creep.moveTo(storage);
                            }else{
                                creep.transfer(storage,RESOURCE_ENERGY);
                            }
                        }
                    }
                }
            }
        })


    }

}

module.exports = towerMule;