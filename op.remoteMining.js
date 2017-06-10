var autoConstruct = require('autoConstruct');
var taskGather = require('task.gather');
var taskMine = require('task.mine');
var remoteMining = {

    run: function() {

    	for (var i in Game.rooms){
    		if(Game.rooms[i].controller && Game.rooms[i].controller.level>=4 && Game.rooms[i].controller.owner.username == "AliasCreeps"){

    			//check if remote mining is activated for this room
    			var miningAvtivated=false;
    			var homeRoom = Game.rooms[i];
    			var homeFlag;
        		for(i in Game.flags){
            		if(Game.flags[i].room==homeRoom){
            			if(Game.flags[i].pos.x==1 && Game.flags[i].pos.y==0){
                    		homeFlag=Game.flags[i];
                    		miningAvtivated=true;
                		}
            		}
            		if(Game.flags[i].name=="Flag11"){
                        //Game.flags[i].pos.createConstructionSite(STRUCTURE_CONTAINER);
					}
            	}

            	//get the flag pattern for this operation
            	if(miningAvtivated){
        			var color1 = homeFlag.color;
        			var color2 = homeFlag.secondaryColor;
        		}

        		//Find remote mining room
        		for(i in Game.flags){
            		if(Game.flags[i].color==color1 && Game.flags[i].secondaryColor==color2&&Game.flags[i] != homeFlag){
            			var miningRoom = Game.flags[i].room;
            			var miningFlag = Game.flags[i];
                    }
                }

                //Figure out if there are construction sites in the remote mining room
                var needContainer = false;
                for(i in Game.constructionSites){
                	if(Game.constructionSites[i].pos.roomName == miningFlag.pos.roomName){
                		needContainer = true;
                	}
        		}

                //Figure out whaat units are needed for this room's remote mining operation
                var reserveCount=0;
                var builderCount=0;
                var muleCount=0;
                var minerCount=0;
                var defenderCount=0;
                for(i in Game.creeps){
                	if(Game.creeps[i].memory.home){
            			if(Game.creeps[i].memory.home.pos.roomName==homeRoom.name){
            				if(Game.creeps[i].memory.role=="remoteReserve"){
                				reserveCount++;
                			}
                			if(Game.creeps[i].memory.role=="remoteBuilder"){
                				builderCount++;
                			}
                			if(Game.creeps[i].memory.role=="remoteMule"){
                				muleCount++;
                			}
                			if(Game.creeps[i].memory.role=="remoteMiner"){
                				minerCount++;
                			}
                			if(Game.creeps[i].memory.role=="defender"){
                				defenderCount++;
                			}	
                		}
                	}
                }

                //Spawn needed units
                var roomSpawn = homeRoom.controller.pos.findClosestByRange(FIND_MY_SPAWNS);
                if(defenderCount<1){
                	roomSpawn.createCreep([TOUGH,WORK,WORK,CARRY,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL],'rDefender_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'defender',home:homeFlag,workSite:miningFlag});
                }else if(reserveCount<1){
                	roomSpawn.createCreep([MOVE,CLAIM,CLAIM],'rReserve_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'remoteReserve',home:homeFlag,workSite:miningFlag});
                }else if(builderCount<1 && needContainer){
                	roomSpawn.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY],'rBuilder_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'remoteBuilder',home:homeFlag,workSite:miningFlag});
                }else if(minerCount<1){
                	roomSpawn.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK],'rMiner_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'remoteMiner',home:homeFlag,workSite:miningFlag});
                }else if(muleCount<3){
                	roomSpawn.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],'rMule_'+ (Math.floor(Math.random() * 65534) + 1), {role: 'remoteMule',home:homeFlag,workSite:miningFlag});
                }
            }
        }

        //Move remote workers
        for(i in Game.creeps){
        	var creep = Game.creeps[i];
        	var currentRoom = creep.pos.roomName;
        	var workSite = creep.memory.workSite;
        	var creepHome = creep.memory.home;
        	var controller = creep.room.controller;

	        var weakContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
	            filter: function (s) {
	                return s.structureType == STRUCTURE_CONTAINER && s.hits < s.hitsMax
	            }
	        });

            if(creep.memory.role=="remoteReserve"){
             	if(currentRoom != workSite.pos.roomName){
             		creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(workSite.pos.roomName)));
             	}else{
            		if(creep.pos.getRangeTo(controller)>1){
                		creep.moveTo(controller);
            		}else{
            			creep.signController(controller,"Remote Mining Site - Hard Hats Required");
                		creep.reserveController(controller);
                        autoConstruct.run(creep.room,null,1,0);
            		}
             	}



            }
            if(creep.memory.role=="defender"){
            	//If never gathered, give it a gather variable
			    if(creep.memory.gathering == null){
			        creep.memory.gathering = true;
			    }

			    //If the creep is not gathering and has 0 energy
			    if(!creep.memory.gathering && creep.carry.energy == 0) {
			        //tell it to gather
			        creep.memory.gathering = true;
			    }
			    //If the creep is gathering and has full energy
			    if(creep.memory.gathering && creep.carry.energy == creep.carryCapacity) {
			        //tell it to stop gathering
			        creep.memory.gathering = false;
			    }


             	if(currentRoom != workSite.pos.roomName){
             		creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(workSite.pos.roomName)));
             	}else{

             		//kill enemies
             		var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
             		var targetStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
             		var weak = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
			                    filter: s => s.hits < s.hitsMax
			        });

	                if(target != null){
	                    if(creep.pos.getRangeTo(target)>1){
	                        creep.moveTo(target);
	                    }
	                    else if(creep.pos.getRangeTo(target)==1){
	                        creep.attack(target);
	                    }
	                }

             		//heal allies
             		else if(weak){
			            if(weak){
			                creep.moveTo(weak);
			                if(creep.heal(weak)==-9){
			                    creep.moveTo(weak);
			                }
			            }
             		}
             		//heal self
             		else if(creep.hits<creep.hitsMax){
             			creep.heal(creep);
             		}
             		//repair bucket
             		else if(weakContainer){
             			if(creep.memory.gathering==true){
			        	taskGather.run(creep,creep.room.find(FIND_SOURCES));
			        	}else{
				            if(creep.repair(weakContainer) == ERR_NOT_IN_RANGE){
			                	creep.moveTo(weakContainer);
				        	}
				        }
			        }else if(targetStructure){
			        	if(creep.attack(targetStructure) == ERR_NOT_IN_RANGE){
			                	creep.moveTo(targetStructure);
				        }
			        }else{
			        	//idle
			        	var source = creep.pos.findClosestByRange(FIND_SOURCES);
			        	if(creep.pos.getRangeTo(source.pos)>3){
			        		creep.moveTo(creep.pos.findClosestByRange(FIND_SOURCES));
			        	}else{
			        		creep.moveTo(controller);
			        	}
			        }
             	}
            }
            if(Game.creeps[i].memory.role=="remoteBuilder"){
            	 if(currentRoom != workSite.pos.roomName){
             		creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(workSite.pos.roomName)));
             	}else{
             		//If never gathered, give it a gather variable
			        if(creep.memory.gathering == null){
			            creep.memory.gathering = true;
			        }

			        //If the creep is not gathering and has 0 energy
			        if(!creep.memory.gathering && creep.carry.energy == 0) {
			            //tell it to gather
			            creep.memory.gathering = true;
			        }
			        //If the creep is gathering and has full energy
			        if(creep.memory.gathering && creep.carry.energy == creep.carryCapacity) {
			            //tell it to stop gathering
			            creep.memory.gathering = false;
			        }

			        var constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);



			        //If the creep is gathering
			        if(creep.memory.gathering==true){
			            taskGather.run(creep,creep.room.find(FIND_SOURCES));
			            if(!constructionSite){
			            	creep.suicide();
			            }

			        }else{
					    var result = creep.build(constructionSite);
		                if(result == ERR_NOT_IN_RANGE){
		                    creep.moveTo(constructionSite);
		                }else if(result == ERR_INVALID_TARGET){
		                	if(creep.carry.energy>0){
			                	//find extensions
					            var choice = creep.pos.findClosestByRange(FIND_STRUCTURES, {
					                filter: function (s) {
					                    return s.structureType == STRUCTURE_CONTAINER
					                }
					            });

					            if(creep.transfer(choice, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                    			creep.moveTo(choice);
	                			}
		                	}
		                }
			        }
             	}
      			
            }
            if(Game.creeps[i].memory.role=="remoteMule"){
            	    //If never gathered, give it a gather variable
			        if(creep.memory.gathering == null){
			            creep.memory.gathering = true;
			        }

			        //If the creep is not gathering and has 0 energy
			        if(!creep.memory.gathering && creep.carry.energy == 0) {
			            //tell it to gather
			            creep.memory.gathering = true;
			        }
			        //If the creep is gathering and has full energy
			        if(creep.memory.gathering && creep.carry.energy == creep.carryCapacity) {
			            //tell it to stop gathering
			            creep.memory.gathering = false;
			        }

			        //If the creep is gathering
			        if(creep.memory.gathering==true){
			        	if(currentRoom != workSite.pos.roomName){
             				creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(workSite.pos.roomName)));
             			}else{
             				taskGather.run(creep,creep.room.find(FIND_SOURCES));
             			}
			        }else{

				            if(creep.carry.energy<creep.carryCapacity-100){
				            	creep.memory.gathering = true;
				            }
	             			var terrain = creep.room.lookForAt('terrain', creep.pos.x, creep.pos.y);
	             			var someStructure = creep.pos.lookFor(LOOK_STRUCTURES);
	             			if(terrain == 'swamp'){
	             				creep.pos.createConstructionSite(STRUCTURE_ROAD);
	             			}
				            if (someStructure.length && (someStructure[0].hitsMax - someStructure[0].hits > 0)) {
				                creep.repair(someStructure[0]);
				            }
				        	if(currentRoom != creepHome.pos.roomName){
	             				creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creepHome.pos.roomName)));
	             			}else{
					            //find extensions
					            var choice = creep.pos.findClosestByRange(FIND_STRUCTURES, {
					                filter: function (s) {
					                    return s.structureType == STRUCTURE_CONTAINER
					                }
					            });
								if(creep.transfer(choice, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                    			creep.moveTo(choice);
	                			}
	             			}
			        }
            }
            if(Game.creeps[i].memory.role=="remoteMiner"){
             	if(currentRoom != workSite.pos.roomName){
             		creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(workSite.pos.roomName)));
             	}else{
             		taskMine.run(creep,creep.room.find(FIND_SOURCES));
             	}
            }	
        }   

    }

}

module.exports = remoteMining;