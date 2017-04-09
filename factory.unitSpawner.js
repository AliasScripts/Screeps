var unitSpawner = {

    run: function() {
        //Get energy levels using the value we stored in mem.checkEnergy
        var energyLeft=Memory.spawnEnergy;

        //Get room level using the value we stored in mem.checkEnergy;
        var roomLevel=Memory.roomLevel;
        //Get sources
        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);

        //count Extensions
        var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });

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
        var morpheus = 0;
        var neo = 0;
        var defender=0;
        var archers=0;
        var towerMule=0
        var anti=0
        var idle = 0;
        var medic = 0;
        var feeder = 0;
        var rangeMiner=0;
        var claim=0;

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
            else if(creep.memory.role == 'Defender'){
                defender++;
            }
            else if(creep.memory.role == 'morpheus'){
                morpheus++;
            }
            else if(creep.memory.role == 'archer'){
                archers++;
            }
            else if(creep.memory.role == 'towerMule'){
                towerMule++;
            }
            else if(creep.memory.role == 'anti'){
                anti++;
            }
            else if(creep.memory.role == 'medic'){
                medic++;
            }
            else if(creep.memory.role == 'feeder'){
                feeder++;
            }
            else if(creep.memory.role == 'rangeMiner'){
                rangeMiner++;
            }
            else if(creep.memory.role == 'claim'){
                claim++;
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
        Memory.unitMorpheus = morpheus;
        Memory.unitTMule = towerMule;
        Memory.unitFeeder = feeder;
        Memory.unitRangeMiner = rangeMiner;
        Memory.unitClaim = claim;


        //Store Troops
        Memory.troopAnti = anti;
        Memory.troopDefender = defender;
        Memory.troopArcher = archers;
        Memory.troopMedic=medic;

        //count sources
        var mines = sources.length;

        //Needed units
        var needPeons = 0;
        var needMiners = mines;
        var needMules = mines;
        var needBuilders = 0;
        var needUplink=0;
        var needNeo=3;
        var needDefender=0;
        var needArchers=0;
        var needMorpheus=3;
        var needTMule=2;
        var needAnti=0;
        var needMedic=0;
        var needFeeder=1;
        var needRangeMiner=0;
        var needClaim=1;

        //Calculate queue length
        var queue = (needPeons+needMiners+needMules+needBuilders+needUplink+needNeo+needDefender+needMorpheus+needArchers+needTMule+needAnti+needMedic+needFeeder+needRangeMiner+needClaim)- Memory.creepCount;
        Memory.queue = queue;


        if(feeder<needFeeder){
            //and there's enough energy for one
            if(energyLeft >= 100){
                Game.spawns.Spawn1.createCreep([MOVE,CARRY],'Feeder_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'feeder',task:'Feeding tower'});
            }
        }
        else if(mules<needMules){
            //and there's enough energy for one
            if(energyLeft >= 300){
                Game.spawns.Spawn1.createCreep([MOVE,MOVE,MOVE,CARRY,CARRY,CARRY],'Mule_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'mule',task:'Mule things.'});
            }
        }
        //if we need a miner
        else if(miners<needMiners){
            //and there's enough energy for one
            if(energyLeft >= 550){
                Game.spawns.Spawn1.createCreep([MOVE,WORK,WORK,WORK,WORK,WORK],'Miner_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'miner',task:'idle'});
            }
        }
        else if(towerMule<needTMule){
            //and there's enough energy for one
            if(energyLeft >= 400){
                //move: 1,2 Carry: 850
                Game.spawns.Spawn1.createCreep([MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],'Tmule_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'towerMule',task:'filling tower'});
            }
        }
        else if(archers<needArchers){
            if(energyLeft>= 260){
                Game.spawns.Spawn1.createCreep([TOUGH,MOVE,MOVE,RANGED_ATTACK],'Archer_'+ (Math.floor(Math.random() * 65534) + 1),{role: 'archer',task:'pew pew'});
            }
        }
        else if(peons<needPeons){
            //and there's enough energy for one
            if(energyLeft >= 300){
                Game.spawns.Spawn1.createCreep([MOVE,MOVE,WORK,CARRY],'Peon_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'peon',task:'idle'});
            }
        }
        //If we need an Uplink
        else if(uplinks<needUplink){
            //and there's enough energy for one
            if(energyLeft >= 800){
                Game.spawns.Spawn1.createCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY],'Operator_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'uplink',task:'Beam me up scotty!'});
            }
        }
        //If we need Neo
        else if(neo<needNeo){
            //If there's enough energy for the almighty NEO
            if(energyLeft >= 500){
                //upgrades 10/tick Move: 2,3
                Game.spawns.Spawn1.createCreep([MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY],'NEO_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'neo',task:'Hacking the matrix.'});
            }
        }
        else if(morpheus<needMorpheus){
            //and there's enough energy for one
            if(energyLeft >= 400){
                //moves every tick, carries 650
                Game.spawns.Spawn1.createCreep([MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],'Morpheus_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'morpheus',task:'Empowering NEO.'});
            }
        }
        else if(builders<needBuilders){
            //and there's enough energy for one
            if(energyLeft >= 750){
                Game.spawns.Spawn1.createCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY],'Builder_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'builder',task:'Builder things.'});
            }
        }
        else if(anti<needAnti){
            //and there's enough energy for one
            if(energyLeft >= 1080){
                Game.spawns.Spawn1.createCreep([TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL],'Anti_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'anti',task:'Draining Towers.'});
            }
        }
        else if(claim<needClaim){
            if(energyLeft>= 1300){
                Game.spawns.Spawn1.createCreep([MOVE,MOVE,CLAIM,CLAIM],'Claim_'+ (Math.floor(Math.random() * 65534) + 1),{role: 'claim',task:'Claiming'});
            }
        }
        else if(defender<needDefender){
            if(energyLeft>= 2210){
                Game.spawns.Spawn1.createCreep([ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE],'KillBot_'+ (Math.floor(Math.random() * 65534) + 1),{role: 'Defender',task:'defending'});
            }
        }
        else if(medic<needMedic){
            if(energyLeft>= 2280){
                Game.spawns.Spawn1.createCreep([TOUGH,MOVE,TOUGH,MOVE,TOUGH,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE],'Medic_'+ (Math.floor(Math.random() * 65534) + 1),{role: 'medic',task:'Saving lives.'});
            }
        }
        else if(rangeMiner<needRangeMiner){
            if(energyLeft>= 1250){
                Game.spawns.Spawn1.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY],'rMiner_'+ (Math.floor(Math.random() * 65534) + 1),{role: 'rangeMiner',task:'Mining'});
                //[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            }
        }
    }

};

module.exports = unitSpawner;