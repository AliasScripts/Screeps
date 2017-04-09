var taskMule = {

    run: function(creep) {
        //Get sources
        var sources = creep.room.find(FIND_SOURCES);
        var sourceCount = sources.length;

        //Check which source to work at
        var target = 0;
        //For each source
        for(i=0;i < sources.length;i++){
            //check for a miner unit within range of the source
            let muleTeam = sources[i].pos.findInRange(FIND_MY_CREEPS, 5, {
                    filter: s => s.memory.role == 'mule'
            })[0];
            //if there is a mule near the container, and it's this unit
            if(muleTeam==creep){
                //target this source
                var target = i;
                //store it in memory
                creep.memory.targetContainer = i;
                //and stop looking
                break;
            //If there is no mule near the container
            }else if(muleTeam==undefined){
                //target this source
                var target = i;
                //save it in memory
                creep.memory.targetContainer = i;
                //and stop searching
                break;
            }
            //If there is a miner next to the source, but it's not this unit, keep looking for a source to target
        }

        // find container next to source, change source to target for standard container muling
        let container = sources[0].pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];

        //If there isn't a container ready yet
        if(container==undefined){
            //idle
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
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }else{

            //find extensions
            var choice = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function (s) {
                    return s.structureType == STRUCTURE_EXTENSION && s.energy<s.energyCapacity
                }
            })
            //check for empty bins
            /*
            var choice;
            for(i=0; i < extension.length; i++){
                if(extension[i].energy<50){
                    var choice = extension[i];
                    break;
                }
            }
            */
            //If there is a bucket
            if(choice != undefined){
                if(creep.transfer(choice, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(choice);
                }
            }else{
                //If there is no empty extender
                if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['Spawn1']);
                }
            }
        }

    }

}

module.exports = taskMule;