var harvest = require('task.harvest');
var upgrade = require('task.upgrade');
var build = require('task.build');
var autoConstruct = require('autoConstruct');

var level2={

    run: function(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax){

        //Count and move units
        var peons = 0;
        var harvesters = 0;
        var upgraders = 0;
        var builders = 0;
        var idles = 0;

        for(var i in room.find(FIND_MY_CREEPS)) {
            var creeps = room.find(FIND_MY_CREEPS);
            var creep = creeps[i];

            if(creep.memory.role == 'peon'){
                peons++;
            }

            if(creep.memory.task == 'idle'){
                idles++;
            }else if(creep.memory.task == 'harvest'){
                harvesters++;
            }else if(creep.memory.task == 'upgrade'){
                upgraders++;
            }else if(creep.memory.task == 'build'){
                builders++;
            }
        }

        for(var i in room.find(FIND_MY_CREEPS)) {

            var creeps = room.find(FIND_MY_CREEPS);
            var creep = creeps[i];

            if(creep.memory.task == 'idle'){
                if(harvesters<2){
                    creep.memory.task='harvest';
                    harvesters++;
                }
                else if(upgraders<2){
                    creep.memory.task='upgrade';
                    upgraders++;
                }
                else if(upgraders<2){
                    creep.memory.task='upgrade';
                    upgraders++;
                }else{
                    creep.memory.task='build';
                    builders++;
                }
            }else if(creep.memory.task == 'harvest'){
                harvest.run(creep,roomSpawn,roomEnergy,roomEnergyMax);
                if(harvesters>2){
                    creep.memory.task="idle";
                    idles++;
                    harvesters--;
                }
            }else if(creep.memory.task == 'upgrade'){
                upgrade.run(creep,roomLevel,roomSpawn);
                if(upgraders>2){
                    creep.memory.task="idle";
                    idles++;
                    upgraders--;

                }else if(harvesters<2){
                    creep.memory.task="idle";
                    idles++;
                    upgraders--;
                }
            }else if(creep.memory.task == 'build'){
                build.run(creep);
                if(upgraders<2){
                    creep.memory.task="idle";
                    idles++
                    builders--;
                }
            }

        }

        //Spawn needed units
        if(peons<10){
            if(roomEnergy >= 300){
                roomSpawn.createCreep([MOVE,MOVE,WORK,CARRY],'Peon_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'peon',task:'idle'});
            }
        }

        //Put in work orders
        autoConstruct.run(room,roomSpawn,roomLevel,extensions);


    }

}

module.exports = level2;