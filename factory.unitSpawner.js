var unitSpawner = {

    run: function() {
        //Get energy levels using the value we stored in mem.checkEnergy
        var energyLeft=Memory.spawnEnergy;

        //Get room level using the value we stored in mem.checkEnergy;
        var roomLevel=Memory.roomLevel;
        //Get sources
        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);

        //Initialize variables
        var maxPeons =  4;
        var maxMiners =  sources.length;

        //Variables for counting units
        //Pull active jobs
        var peons = 0;
        var harvesters = 0;
        var upgraders = 0;
        var containment = 0;
        var miners = 0;
        var mules = 0;
        var builders = 0;
        var uplinks = 0;
        var neo = 0;
        var idle = 0;
        var unknownUnit = 0;
        for(var role in Game.creeps){
            var creep = Game.creeps[role];
            if(creep.memory.task == 'harvest'){
                harvesters++;
                peons++;
            }
            else if(creep.memory.task == 'upgrade'){
                upgraders++;
                peons++;
            }
            else if(creep.memory.task == 'containment'){
                containment++;
                peons++;
            }
            else if(creep.memory.task == 'idle'){
                if(creep.memory.role == 'peon'){
                    peons++;
                }
                idle++;
            }
            else if(creep.memory.role == 'peon'){
                peons++;
            }
            else if(creep.memory.role == 'miner'){
                miners++;
            }
            else if(creep.memory.role == 'mule'){
                mules++;
            }
            else if(creep.memory.role == 'builder'){
                builders++;
            }
            else if(creep.memory.role == 'uplink'){
                uplinks++;
            }
            else if(creep.memory.role == 'neo'){
                neo++;
            }
        }

        //Store active jobs in memory in case we need them elsewhere
        Memory.peonHarvesters = harvesters;
        Memory.peonUpgraders = upgraders;
        Memory.peonContainers = containment;
        Memory.idle = idle;

        //Store unit count in memory
        Memory.unitPeons = peons;
        Memory.unitMiners = miners;
        Memory.unitMules = mules;
        Memory.unitBuilders = builders;
        Memory.unitUplink = uplinks;
        Memory.unitNeo = neo;

        //Calculate needed units
        var needPeons = 0;
        var needMiners = 0;
        var needMules = 0;
        var needBuilders = 0;
        var needUplink = 0;
        var needNeo = 0;

        if(roomLevel == 1){
            var mines = sources.length;
            //+1 Containment worker per source
            //+1 harvester
            //+1 upgrader
            needPeons = mines + 2;
            //1 Miner for each container / source
            needMiners = mines;
        }
        else if(roomLevel >= 2){
            //count sources
            var mines = sources.length;
            //+1 Containment worker per source
            needPeons = mines;
            //+1 Miner per source
            needMiners = mines;
            //+1 Mule for each source
            //+4 to speed things up
            needMules = mines +4;
            //+3 Builder for extensions
            needBuilders = 3;
            //+1 Uplink
            needUplink=1;
            //+1 neo
            needNeo=1;
        }

        //Calculate queue length
        var queue = (needPeons+needMiners+needMules+needBuilders+needUplink+needNeo)- Memory.creepCount;
        Memory.queue = queue;

        //count Extensions
        var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        //console.log(extensions.length);

        //Spawn units
        if(extensions.length>=1){
            //if we need a worker
            if(peons<needPeons){
                //and there's enough energy for one
                if(energyLeft >= 300){
                    Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE],null, {role: 'peon',task:'idle'});
                }
            }
            //if we need a miner
            else if(miners<needMiners){
                //and there's enough energy for one
                if(energyLeft >= 350){
                    Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,MOVE],null, {role: 'miner',task:'idle'});
                }
            }
            //If we need a Mule
            else if(mules<needMules){
                //and there's enough energy for one
                if(energyLeft >= 350){
                    Game.spawns.Spawn1.createCreep([MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],null, {role: 'mule',task:'Mule things.'});
                }
            }//If we need a Builder
            else if(builders<needBuilders){
                //and there's enough energy for one
                if(energyLeft >= 350){
                    Game.spawns.Spawn1.createCreep([WORK,WORK,MOVE,CARRY,CARRY],null, {role: 'builder',task:'Builder things.'});
                }
            }
            //If we need an Uplink
            else if(uplinks<needUplink){
                //and there's enough energy for one
                if(energyLeft >= 350){
                    Game.spawns.Spawn1.createCreep([WORK,WORK,MOVE,CARRY,CARRY],null, {role: 'uplink',task:'Beam me up scotty!'});
                }
            }
            //If we need Neo
            else if(neo<needNeo){
                //If there's enough energy for the almighty NEO
                if(energyLeft >= 300){
                    Game.spawns.Spawn1.createCreep([WORK,WORK,MOVE,CARRY],'NEO', {role: 'neo',task:'Hacking the matrix.'});
                }
            }
        }else{
            //if we need a worker
            if(peons<needPeons){
                //and there's enough energy for one
                if(energyLeft >= 300){
                    Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE],null, {role: 'peon',task:'idle'});
                }
            }
            //if we need a miner
            else if(miners<needMiners){
                //and there's enough energy for one
                if(energyLeft >= 250){
                    Game.spawns.Spawn1.createCreep([WORK,WORK,MOVE],null, {role: 'miner',task:'idle'});
                }
            }
            //If we need a Mule
            else if(mules<needMules){
                //and there's enough energy for one
                if(energyLeft >= 300){
                    Game.spawns.Spawn1.createCreep([MOVE,CARRY,CARRY,CARRY,CARRY,CARRY],null, {role: 'mule',task:'Mule things.'});
                }
            }//If we need a Builder
            else if(builders<needBuilders){
                //and there's enough energy for one
                if(energyLeft >= 300){
                    Game.spawns.Spawn1.createCreep([WORK,WORK,MOVE,CARRY],null, {role: 'builder',task:'Builder things.'});
                }
            }
        }


    }

};

module.exports = unitSpawner;