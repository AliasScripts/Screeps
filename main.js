var level1 = require('level1');
var level2 = require('level2');
var level3 = require('level3');
var level4 = require('level4');

var unitTower = require('unit.tower');
var claim = require('task.claim');
var expand = require('task.expand');

module.exports.loop = function () {

    var alive=0;
    var dead=0;
    // Check for memory entries of dead creeps by iterating over Memory.creeps
    for(var i in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[i] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[i];
            //(and count them)
            dead++;
            // if so, count the living.
        }else{
            alive++;
        }
    }

    // Store the count in memory as Memory.creepCount
    var oldCount = Memory.creepCount;
    Memory.creepCount=alive;

    //rooms
    var roomcount = 0;
    for (var i in Game.rooms){
        roomcount++;
    }
    //Loop through all rooms, give instructions to inhabitants
    var roomNumber=0;
    for (var i in Game.rooms){
        roomNumber++;
        var room = Game.rooms[i];
        var roomSpawn = room.controller.pos.findClosestByRange(FIND_MY_SPAWNS);
        var roomEnergy = room.energyAvailable;
        var roomLevel=room.controller.level;

        //expand
        if(roomNumber==1){
            var claimFlag = Game.flags.claim;
            if(claimFlag != null){
                var claimCreep;
                var expandCreep;
                for(var i in Game.creeps){
                    if(Game.creeps[i].memory.role=='claim'){
                        claimCreep=Game.creeps[i];
                    }
                    if(Game.creeps[i].memory.role=='expand'){
                        expand.run(Game.creeps[i]);
                        expandCreep=Game.creeps[i];
                    }
                    if(Game.creeps[i].memory.role=='builder'){
                        Game.creeps[i].memory.role='expand';
                    }
                }
                //console.log(claimCreep);

                if(claimCreep!=null){
                    claim.run(claimCreep);
                }else if(roomEnergy>=650){
                    Game.spawns.Spawn1.createCreep([MOVE,CLAIM],'Claim_'+ (Math.floor(Math.random() * 65534) + 1),{role: 'claim',task:'Claiming'})
                }
            }
        }

        var extensions = room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        var sources = room.find(FIND_SOURCES);
        var roomEnergyMax;
        if(roomLevel<7){
            roomEnergyMax = extensions.length * 50 + 300;
        }else if(roomLevel==7){
            roomEnergyMax = extensions.length * 100 + 300
        }else if(roomLevel==8){
            roomEnergyMax = extensions.length * 200 + 300;
        }

        //Control Towers
        unitTower.run(room);

        //Display remaining controller energy
        var remainingEnergy = room.controller.progressTotal - room.controller.progress;
        var formattedNumber = remainingEnergy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        room.visual.text(formattedNumber, room.controller.pos.x + 1, room.controller.pos.y-1, {
            align: 'left',
            size: 1,
            color: '#7DE3B5'
        });

        if(roomLevel<=1){
            level1.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax);
        }else if(roomLevel==2){
            //containers
            //5 extensions
            if(extensions.length>=5){
                level3.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
            }else{
                level2.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax);
            }
            //walls & ramparts?
        }else if(roomLevel==3){
            if(extensions.length>=5){
                level3.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
            }else{
                level2.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax);
            }
            //Tower
        }else if(roomLevel==4){
            level4.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
        }else if(roomLevel==5){
            level4.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
        }else if(roomLevel<=7){
            //Extractors
            //Labs
            //Terminal
            //3rd tower
            level4.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
        }else if(roomLevel>=8){
            //Observer
            //Power Spawn
            //4th,5th,6th towers
            level4.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
        }

    }

}