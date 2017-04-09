var towerFeeder = {

    run: function(creep) {

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

        var storage = creep.room.storage;


        _.forEach(towers, function(tower){
            if(tower.energy<tower.energyCapacity){
                //If the creep is gathering
                if(creep.memory.gathering==true){
                    if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage);
                    }
                }else{

                    if (tower.energy < tower.energyCapacity){

                        if(tower!=undefined){
                            //If there IS a container
                            //If the unit is not 1 block adjacent to it
                            if(creep.pos.getRangeTo(tower)!=1){
                                creep.moveTo(tower);
                            }else{
                                creep.transfer(tower,RESOURCE_ENERGY);
                            }
                        }
                    }
                }
            }
        })


    }

}

module.exports = towerFeeder;