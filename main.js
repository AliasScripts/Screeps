var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    /*
     var result = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], null, {role: 'harvester',working:false});
     var result = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], null, {role: 'upgrader',working:false});
     var result = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], null, {role: 'builder',working:false});

     */

    // check for memory entries of died creeps by iterating over Memory.creeps
    for(var name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    //Count Active Units
    var harvesterCount = 0;
    var builderCount = 0;
    var upgraderCount = 0;
    for(var role in Game.creeps){
        var creep = Game.creeps[role];
        if(creep.memory.role == 'harvester'){
            harvesterCount++;
        }

        if(creep.memory.role == 'upgrader'){
            upgraderCount++;
        }

        if(creep.memory.role == 'builder') {
            builderCount++;
        }

    }
    console.log('Harvesters: '+harvesterCount);
    console.log('Upgraders: '+upgraderCount);
    console.log('Builders: '+builderCount);
    console.log('-----------------');

    //Spawn Units
    var maxHarvester = 10;
    var maxUpgrader = 20;
    var maxBuilder = 10

    if(harvesterCount<maxHarvester){
        if(Game.spawns.Spawn1.canCreateCreep([WORK, WORK, CARRY, MOVE],null) == OK ){
            var result = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], null, {role: 'harvester',working:false});
            console.log('Spawning: Harvester');
            console.log('-----------------');
        }
    }else if(upgraderCount<maxUpgrader){
        if(Game.spawns.Spawn1.canCreateCreep([WORK, CARRY, MOVE, MOVE],null)==OK){
            var result = Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE], null, {role: 'upgrader',working:false});
            console.log('Spawning: Upgrader');
            console.log('-----------------');
        }

    }else if(builderCount<maxBuilder){
        if(Game.spawns.Spawn1.canCreateCreep([WORK, CARRY, CARRY, MOVE],null)==OK){
            var result = Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE], null, {role: 'builder',working:false});
            console.log('Spawning: Builder');
            console.log('-----------------');
        }

    }else{
        console.log('Spawning: Nothing');
        console.log('-----------------');
    }

    //Move Units
    for(var name in Game.creeps) {

        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep,Spawn);
        }

        if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }

        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }

    }
}