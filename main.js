var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    /*
    //Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Harvester1' );

    //Create Worker
    var upgraderCount=0;

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester'){
            upgraderCount++;
        }
        //console.log(upgraderCount);
    }
    //console.log(upgraderCount);

    if(upgraderCount<3){
        if(Game.spawns.Spawn1.canCreateCreep([WORK,CARRY,MOVE],name)==OK){
            var result = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], null, {role: 'harvester'});

            if(_.isString(result)) {
                console.log('Harvester name is: '+result);
            }
            else {
                console.log('Harvester error: '+result);
            }

        }

    }

*/

    //Count Harvesters
    var harvesters5=0;

    //Create Harvester

    //Create Upgrader
    if(Game.spawns.Spawn1.canCreateCreep([WORK,CARRY,MOVE],name)==OK){
        var result = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], null, {role: 'upgrader'});
        console.log(result.toString());

        for(var name1 in Game.creeps) {
            var creep1 = Game.creeps[name1];
            if(name1==result.toString()){
                creep1.memory.working=false;
            }
        }

        if(_.isString(result)) {
            console.log('Upgrader name is: '+result);
        }
        else {
            console.log('Upgrader error: '+result);
        }

    }


    //Move Units
    for(var name in Game.creeps) {

        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }

        if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }

    }
}