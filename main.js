var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var passiveRoads = require('passive.roads');

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

    //Count Active Units, while moving them
    var harvesterCount = 0;
    var builderCount = 0;
    var upgraderCount = 0;
    var repairCount = 0;
    for(var role in Game.creeps){
        var creep = Game.creeps[role];
        if(creep.memory.role == 'harvester'){
            passiveRoads.run(creep);
            roleHarvester.run(creep);
            harvesterCount++;
        }

        if(creep.memory.role == 'upgrader'){
            passiveRoads.run(creep);
            roleUpgrader.run(creep);
            upgraderCount++;
        }

        if(creep.memory.role == 'builder') {
            passiveRoads.run(creep);
            roleBuilder.run(creep);
            builderCount++;
        }
        if(creep.memory.role == 'repair') {
            //passiveRoads.run(creep);
            roleBuilder.run(creep);
            repairCount++;
        }

    }
    console.log('Harvesters: '+harvesterCount);
    console.log('Upgraders: '+upgraderCount);
    console.log('Builders: '+builderCount);
    console.log('Repair: '+repairCount);
    console.log('-----------------');

    //Spawn Units
    var maxHarvester = 10;
    var maxUpgrader = 10;
    var maxBuilder = 5;
    var maxRepair = 0;
    var deadUnits = true;

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
            var deadUnits = false;
        }

    }else if(repairCount<maxRepair){
        if(Game.spawns.Spawn1.canCreateCreep([WORK, CARRY, CARRY, MOVE],null)==OK){
            var result = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], null, {role: 'repair',working:false});
            console.log('Spawning: Repair');
            console.log('-----------------');
            var deadUnits = false;
        }

    }else{
        console.log('Spawning: Nothing');
        console.log('-----------------');
    }

    //Move Units
    /*
    for(var name in Game.creeps) {

        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester'){
            passiveRoads.run(creep);
            roleHarvester.run(creep,deadUnits);
        }

        if(creep.memory.role == 'upgrader'){
            passiveRoads.run(creep);
            roleUpgrader.run(creep);
        }

        if(creep.memory.role == 'builder'){
            passiveRoads.run(creep);
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repair'){
            //passiveRoads.run(creep);
            roleBuilder.run(creep);
        }

    }
    */

}