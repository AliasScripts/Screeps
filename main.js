var clearDead = require('mem.clearDead');
var checkEnergy = require('mem.checkEnergy');
var unitSpawner = require('factory.unitSpawner');
var moveCitizens = require('command.moveCitizens');

module.exports.loop = function () {

    //Clear leftover memory from dead units... RIP
    //Count the living and store them in memory as Memory.creepCount
    clearDead.run();

    //Check energy available and store it in memory as Memory.spawnEnergy
    //Check room level and store it in memory as Memory.roomLevel
    //Display energy levels on structures
    checkEnergy.run();

    //Spawn needed units
    unitSpawner.run();

    //Move supporting units
    moveCitizens.run();

    //Move combat units
}