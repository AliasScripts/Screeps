var troopPredator = require('troop.predator');
var troopArcher = require('troop.archer');
var antiTower = require('troop.antiTower');
var troopMedic = require('troop.medic');

var moveMilitary = {



    run: function() {

        for(var role in Game.creeps) {
            var creep = Game.creeps[role];

            if(creep.memory.role == 'medic'){
                troopMedic.run(creep);
            }
            else if(creep.memory.role == 'Defender'){
                troopPredator.run(creep);
            }
            else if(creep.memory.role == 'anti'){
                antiTower.run(creep);
            }
            else if(creep.memory.role == 'archer'){
                troopArcher.run(creep);
            }

        }
    }

};

module.exports = moveMilitary;