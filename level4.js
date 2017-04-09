var harvest = require('task.harvest');
var upgrade = require('task.upgrade');
var build = require('task.build');
var mine = require('task.mine');
var mule = require('task.mule');
var autoConstruct = require('autoConstruct');

var level3={

    run: function(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources){
        //Count and move units
        var peons = 0;
        var miners = 0;
        var mules=0;
        var builders = 0;
        var upgraders = 0;
        var claim = 0;
        var jobs = room.find(FIND_CONSTRUCTION_SITES);

        for(var i in room.find(FIND_MY_CREEPS)) {
            var creeps = room.find(FIND_MY_CREEPS);
            var creep = creeps[i];

            if(creep.memory.role == 'builder'){
                builders++;
            }
            else if(creep.memory.role == 'miner'){
                miners++;
            }
            else if(creep.memory.role == 'mule'){
                mules++;
            }
            else if(creep.memory.role == 'upgrade'){
                upgraders++;
            }
            else if(creep.memory.role == 'claim'){
                claim++;
            }
            else if(creep.memory.role == 'peon'){
                if(peons>0){
                    creep.suicide();
                }else{
                    peons++;
                }
            }

        }

        for(var i in room.find(FIND_MY_CREEPS)) {

            var creeps = room.find(FIND_MY_CREEPS);
            var creep = creeps[i];

            if(creep.memory.role == 'builder'){
                build.run(creep,roomLevel,roomSpawn,sources,room);
            }
            else if(creep.memory.role == 'miner'){
                mine.run(creep,sources);
            }
            else if(creep.memory.role == 'mule'){
                mule.run(creep,sources,roomSpawn,room);
            }
            else if(creep.memory.role == 'upgrade'){
                upgrade.run(creep,roomLevel,sources);
            }
            else if(creep.memory.role == 'peon'){
                if(miners>0 && mules>0){
                    creep.suicide();
                }else{
                    harvest.run(creep,roomSpawn,roomEnergy,roomEnergyMax);
                }
            }

        }

        //Spawn needed units
            //Peon if no miner and not enough energy for one
            //Miner for each source
            //Mule for each miner (upgrades if max energy)
            //Builder
        if(miners==0){
            if(peons<1){
                if(roomEnergy<550){
                    if(roomEnergy>=300){
                        roomSpawn.createCreep([MOVE,MOVE,WORK,CARRY],'FailSafe_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'peon',task:'harvest'});
                    }
                }
            }
        }else if(mules==0){
            if(roomEnergy >= 300){
                roomSpawn.createCreep([MOVE,MOVE,MOVE,CARRY,CARRY,CARRY],'Mule_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'mule',task:'Mule things.'});
            }
        }
        if(extensions.length>=20){
            if(miners<sources.length){
                if(roomEnergy >= 550){
                    roomSpawn.createCreep([MOVE,WORK,WORK,WORK,WORK,WORK],'Miner_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'miner',task:'idle'});
                }
            }
            else if(mules<sources.length*2){
                if(roomEnergy >= 300){
                    roomSpawn.createCreep([MOVE,MOVE,MOVE,CARRY,CARRY,CARRY],'Mule_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'mule',task:'Mule things.'});
                }
            }
            else if(upgraders<3){
                if(roomEnergy >= 1250){
                    roomSpawn.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY],'Upgrader_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'upgrade',task:'upgrading'});
                }
            }
            else if(builders<2){
                if(roomEnergy >= 1250){
                    roomSpawn.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY],'Builder_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'builder',task:'working'});
                }
            }
        }

        //Put in work orders
        autoConstruct.run(room,roomSpawn,roomLevel,extensions);


    }

}

module.exports = level3;