var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleWalls = require('role.walls');
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

    //loop through all spawns
    for (var i in Game.spawns) {
        var thisRoom = Game.spawns[i].room;
        var remainingEnergy = thisRoom.controller.progressTotal - thisRoom.controller.progress;

        //Display energy needed to upgrade controller
        if (remainingEnergy > 0) {
            var formattedNumber = remainingEnergy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (remainingEnergy == 420) {
                thisRoom.visual.text("Blaze it fgt \uD83C\uDF41\uD83D\uDD25 \uD83D\uDC4C\uD83D\uDE38\uD83D\uDD95", thisRoom.controller.pos.x + 1, thisRoom.controller.pos.y, {
                    align: 'left',
                    size: 3,
                    color: '#7DE3B5'
                });
            } else {
                thisRoom.visual.text(formattedNumber, thisRoom.controller.pos.x + 1, thisRoom.controller.pos.y, {
                    align: 'left',
                    size: 1,
                    color: '#7DE3B5'
                });
            }
        }

    }
    console.log('~~~~~~~~~~~~~~');

    //Count Active Units, while moving them
    var harvesterCount = 0;
    var builderCount = 0;
    var upgraderCount = 0;
    var repairCount = 0;
    for(var role in Game.creeps){
        var creep = Game.creeps[role];
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
            passiveRoads.run(creep);
            harvesterCount++;
        }

        if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
            passiveRoads.run(creep);
            upgraderCount++;
        }

        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            passiveRoads.run(creep);
            builderCount++;
        }
        if(creep.memory.role == 'repair') {
            roleWalls.run(creep);
            //passiveRoads.run(creep);
            repairCount++;
        }

    }

    console.log('Harvesters: '+harvesterCount);
    console.log('Upgraders: '+upgraderCount);
    console.log('Repair: '+repairCount);
    console.log('Builders: '+builderCount);

    //Spawn Units
    var maxHarvester = 5;
    var maxUpgrader = 10;
    var maxRepair = 5;
    var maxBuilder = 5;
    var deadUnits = true;

    if(harvesterCount<maxHarvester){
        if(Game.spawns.Spawn1.canCreateCreep([WORK, WORK, CARRY, MOVE],null) == OK ){
            var result = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], null, {role: 'harvester',working:false});
            console.log('Spawn: Harvester');
        }
    }else if(upgraderCount<maxUpgrader){
        if(Game.spawns.Spawn1.canCreateCreep([WORK, CARRY, MOVE, MOVE],null)==OK){
            var result = Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE], null, {role: 'upgrader',working:false});
            console.log('Spawn: Upgrader');
        }

    }else if(repairCount<maxRepair){
        if(Game.spawns.Spawn1.canCreateCreep([WORK, CARRY, CARRY, MOVE],null)==OK){
            var result = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], null, {role: 'repair',working:false});
            console.log('Spawn: Repair');
        }

    }else if(builderCount<maxBuilder){
        if(Game.spawns.Spawn1.canCreateCreep([WORK, CARRY, CARRY, MOVE],null)==OK){
            var result = Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE], null, {role: 'builder',working:false});
            console.log('Spawn: Builder');
        }

    }else{
        console.log('Spawn: None');
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