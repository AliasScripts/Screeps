var level1 = require('level1');
var level2 = require('level2');
var level3 = require('level3');
var level4 = require('level4');

var unitTower = require('unit.tower');
var claim = require('task.claim');
var expand = require('task.expand');
var remoteMining = require('op.remoteMining');

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
        if(Game.rooms[i].controller && Game.rooms[i].controller.level>0 && Game.rooms[i].controller.owner.username == "AliasCreeps"){
            roomNumber++;
            var room = Game.rooms[i];

            var roomSpawn = room.controller.pos.findClosestByRange(FIND_MY_SPAWNS);
            var roomEnergy = room.energyAvailable;
            var roomLevel=room.controller.level;
            var sources = room.find(FIND_SOURCES);

            //expand
            if(room.name=='E81N31'){
                var claimFlag = Game.flags.claim;
                var checkPoint = Game.flags.checkpoint;
                var atkTarget = Game.flags.target;
                if(claimFlag != null){
                    var claimCreep;
                    var expandCreep;
                    var atkCreep;
                    for(var i in Game.creeps){
                        if(Game.creeps[i].memory.role=='claim'){
                            claimCreep=Game.creeps[i];
                        }
                        if(Game.creeps[i].memory.role=='atk'){
                            atkCreep=Game.creeps[i];
                        }
                        if(Game.creeps[i].memory.role=='expand'){
                            if(Game.creeps[i].memory.task=='moving'){
                                if(Game.creeps[i].pos.roomName != checkPoint.pos.roomName){
                                    Game.creeps[i].moveTo(Game.creeps[i].pos.findClosestByPath(Game.creeps[i].room.findExitTo(checkPoint.pos.roomName)));
                                }else{
                                    Game.creeps[i].memory.task='building';
                                }
                            }else{
                                if(Game.creeps[i].pos.roomName != claimFlag.pos.roomName){
                                    Game.creeps[i].moveTo(Game.creeps[i].pos.findClosestByPath(Game.creeps[i].room.findExitTo(claimFlag.pos.roomName)));
                                }else{
                                    expand.run(Game.creeps[i]);
                                }
                            }

                            expandCreep=Game.creeps[i];
                        }
                        if(Game.creeps[i].memory.role=='builder' && Game.creeps[i].pos.roomName=='E81N31'){
                            Game.creeps[i].memory.role='expand';
                            Game.creeps[i].memory.task='moving';
                        }
                    }

                    if(claimCreep!=null){
                        if(claimCreep.memory.task=='moving'){
                            if(claimCreep.pos.roomName != checkPoint.pos.roomName){
                                claimCreep.moveTo(claimCreep.pos.findClosestByPath(claimCreep.room.findExitTo(checkPoint.pos.roomName)));
                            }else{
                                claimCreep.memory.task='claiming';
                            }
                        }else{
                            claim.run(claimCreep);
                        }
                    }else if(roomEnergy>=650){
                        //Game.spawns.Spawn5.createCreep([MOVE,CLAIM],'Claim_'+ (Math.floor(Math.random() * 65534) + 1),{role: 'claim',task:'moving'});
                    }

                    if(atkCreep!=null){
                        if(atkCreep.memory.task=='moving'){
                            if(atkCreep.pos.roomName != checkPoint.pos.roomName){
                                atkCreep.moveTo(atkCreep.pos.findClosestByPath(atkCreep.room.findExitTo(checkPoint.pos.roomName)));
                            }else{
                                atkCreep.memory.task='atkIng';
                            }
                        }else{
                            if(atkCreep.pos.roomName != atkTarget.pos.roomName){
                                atkCreep.moveTo(atkCreep.pos.findClosestByPath(atkCreep.room.findExitTo(atkTarget.pos.roomName)));
                            }else{
                                var targetStructure=atkTarget.pos.findClosestByRange(FIND_STRUCTURES);

                                if(targetStructure){
                                    if(targetStructure.pos.getRangeTo(atkTarget)==0){
                                        if(atkCreep.pos.getRangeTo(targetStructure)>1){
                                            atkCreep.say('!');
                                            atkCreep.moveTo(targetStructure);
                                        }
                                        else if(atkCreep.pos.getRangeTo(targetStructure)==1){
                                            atkCreep.say('Pew!');
                                            atkCreep.attack(targetStructure);
                                        }
                                    }
                                }
                            }
                        }
                        
                    }else{
                        //Game.spawns.Spawn5.createCreep([MOVE,ATTACK],'atk_'+ (Math.floor(Math.random() * 65534) + 1),{role: 'atk',task:'moving'});
                    }
                }
            }

            var extensions = room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            });

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
                level1.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
            }else if(roomLevel==2){
                //containers
                //5 extensions
                //level2.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
                if(extensions.length>=5){
                    level3.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
                }else{
                    level2.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
                }
                //walls & ramparts?
            }else if(roomLevel==3){
                if(extensions.length>=5){
                    level3.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
                }else{
                    level2.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
                }
                //Tower
            }else if(roomLevel==4){
                if(extensions.length>=20){
                    level4.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
                }else{
                    level3.run(room,roomSpawn,roomEnergy,roomLevel,extensions,roomEnergyMax,sources);
                }
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
    remoteMining.run();

}