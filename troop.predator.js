var troopPredator = {


    run: function(creep) {


        let flag = Game.flags.Flag1;
        var targetRoom = flag.pos.roomName;

        let ralley = Game.flags.ralley;
        var ralleyRoom = ralley.pos.roomName;

        if(creep.pos.roomName == targetRoom){
            var targetStructure=flag.pos.findClosestByRange(FIND_STRUCTURES);

            if(targetStructure){
                if(targetStructure.pos.getRangeTo(flag)==0){
                    if(creep.pos.getRangeTo(targetStructure)>1){
                        creep.moveTo(targetStructure);
                    }
                    else if(creep.pos.getRangeTo(targetStructure)==1){
                        var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                        if(creep.pos.getRangeTo(enemy)==1){
                            creep.attack(enemy);
                        }else{
                            creep.attack(targetStructure);
                        }
                    }
                }else{
                    var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if(target != null){
                        if(creep.pos.getRangeTo(target)>1){
                            creep.moveTo(target);
                        }
                        else if(creep.pos.getRangeTo(target)==1){
                            creep.attack(target);
                        }
                    }else{
                        creep.moveTo(flag)
                    }
                }
            }else{
                var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(target != null){
                    if(creep.pos.getRangeTo(target)>1){
                        creep.moveTo(target);
                    }
                    else if(creep.pos.getRangeTo(target)==1){
                        creep.attack(target);
                    }
                }else{
                    creep.moveTo(flag)
                }
            }
        }else{
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(targetRoom)));
        }

    }

}

module.exports = troopPredator;