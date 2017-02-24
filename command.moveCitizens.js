var taskHarvest = require('task.harvest');
var taskUpgrade = require('task.upgrade');
var taskContainer = require('task.container');
var taskMine = require('task.mine');
var taskMule = require('task.mule');
var taskBuild = require('task.extend');
var taskUplink = require('task.uplink');
var taskNeo = require('task.neo');
var buffSwiftBoots = require('buff.swiftBoots');

var moveCitizens = {

    run: function() {
        //Get room level using the value we stored in mem.checkEnergy;
        var roomLevel=Memory.roomLevel;

        //Pull active unit count that we stored in unitSpawner
        var harvesters = Memory.peonHarvesters;
        var upgraders = Memory.peonUpgraders;
        var containment = Memory.peonContainers;
        var miners = Memory.unitMiners;
        var mules = Memory.unitMules;
        var idle = Memory.idle;

        //Get sources
        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        var sourceCount = sources.length;

        //Cycle through all creeps and move them
        for(var role in Game.creeps){
            var creep = Game.creeps[role];

            //Buff the unit
            if(creep.memory.role!='builder'){
                if(creep.memory.role!='uplink'){
                    buffSwiftBoots.run(creep); // Puts in road orders where it steps
                }
            }

            //if it's a peon,
            if(creep.memory.role == 'peon'){
                //and it's idle,
                if(creep.memory.task == 'idle'){
                    //if containment units are needed
                    if(containment<sourceCount){
                        //turn the peon into a containment unit
                        creep.memory.task = 'containment';
                        containment++;
                    }
                    //if there are no harvesters
                    else if(harvesters<1){
                        //turn the peon into a harvester
                        creep.memory.task = 'harvest';
                        harvesters++;
                    }
                    //else if there are no upgraders
                    else if(upgraders<1){
                        //turn the peon into an upgrader
                        creep.memory.task = 'upgrade';
                        upgraders++;
                    }
                    else{
                        //if remaining idle, wait by controller
                        creep.moveTo(creep.room.controller);
                    }
                }
                //and it's harvesting
                if(creep.memory.task == 'harvest'){
                    //if there is only one harvester
                    if(harvesters==1){
                        //tell it to harvest
                        taskHarvest.run(creep);
                        //if there are too many peonHarvesters
                    }else if(harvesters > 1){
                        //tell it to idle
                        creep.memory.task='idle';
                        harvesters--;
                    }

                }
                //and it's upgrading
                else if(creep.memory.task == 'upgrade'){
                    //if there is only one upgrader
                    if(upgraders==1){
                        //tell it to upgrade
                        taskUpgrade.run(creep);
                        //if there are too many peonUpgraders
                    }else if(upgraders > 1){
                        //tell it to idle
                        creep.memory.task='idle';
                        upgraders--;
                    }

                }
                //and it's containing
                else if(creep.memory.task == 'containment'){

                    if(containment<=sourceCount){
                        //tell it to contain
                        taskContainer.run(creep);
                        //if there are too many containment units
                    }else if(containment > sourceCount){
                        //tell it to idle
                        creep.memory.task='idle';
                        containment--;
                    }

                }
            }
            //if it's a miner
            else if(creep.memory.role == 'miner'){
                creep.memory.task = 'working';
                taskMine.run(creep);
            }
            //if it's a mule
            else if(creep.memory.role == 'mule'){
                creep.memory.task = 'working';
                taskMule.run(creep);
            }
            //if it's a builder
            else if(creep.memory.role == 'builder'){
                creep.memory.task = 'working';
                taskBuild.run(creep);
            }
            //if it's an uplink
            else if(creep.memory.role=='uplink'){
                creep.memory.task = 'working';
                taskUplink.run(creep);
            }
            //if it's NEO
            else if(creep.memory.role=='neo'){
                taskNeo.run(creep);
            }
        }

    }

};

module.exports = moveCitizens;