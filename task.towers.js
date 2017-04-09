var mule = require('task.mule');
var upgrade = require('task.upgrade');
var towers = {

    run: function(creep,sources,roomSpawn,room,towers) {

        //Check which source to work at
        var target = 0;
        //For each source
        for(i=0;i < sources.length;i++){
            //check for a miner unit within range of the source
            var muleTeam = sources[i].pos.findInRange(FIND_MY_CREEPS, 2, {
                filter: function (s) {
                    return s.memory.role == 'mule'
                }
            })[0];
            //if there is a mule near the container, and it's this unit
            if(muleTeam==creep){
                //target this source
                target = i;
                break;
            //If there is no mule near the container
            }else if(muleTeam==undefined){
                //target this source
                target = i;
                break;
            }
            //If there is a miner next to the source, but it's not this unit, keep looking for a source to target
        }

        // find container next to source
        var container = sources[target].pos.findInRange(FIND_STRUCTURES, 1, {
            filter: function (s) {
                return s.structureType == STRUCTURE_CONTAINER
            }
        })[0];

        // find container next to controller
        var overflow = room.controller.pos.findInRange(FIND_STRUCTURES, 2, {
            filter: function (s) {
                return s.structureType == STRUCTURE_CONTAINER
            }
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
            //find towers
            var choice = room.controller.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (s) {
                    return s.structureType == STRUCTURE_TOWER && s.energy<s.energyCapacity
                }
            });

            if(choice != undefined){
                if(creep.transfer(choice, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(choice);
                }
            }else{
                mule.run(creep,sources,roomSpawn,room);
            }
        }

    }

}

module.exports = towers;