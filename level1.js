var harvest = require('task.harvest');
var build = require('task.build');

var level1={

    run: function(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources){

        //Count and move units
        var peonsAlive = 0;

        for(var i in room.find(FIND_MY_CREEPS)) {
            var creeps = room.find(FIND_MY_CREEPS);
            var creep = creeps[i];

            if(creep.memory.role == 'peon'){
                peonsAlive++;
                harvest.run(creep,roomSpawn,roomEnergy,roomEnergyMax,sources, roomLevel, room);
            }
            if(creep.memory.role == 'expand'){
                //creep.suicide();
                build.run(creep,roomLevel,roomSpawn,sources,room);
            }
        }

        //Spawn needed units
        if(peonsAlive<2){
            if(roomEnergy >= 300){
                roomSpawn.createCreep([MOVE,MOVE,WORK,CARRY],'Peon_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'peon',task:'idle'});
            }
        }


    }

}

module.exports = level1;