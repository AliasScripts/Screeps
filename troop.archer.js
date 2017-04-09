var troopArcher = {

    run: function(creep) {

        let flag = Game.flags.Flag1;
        var targetRoom = flag.pos.roomName;

        let ralley = Game.flags.ralley;
        var ralleyRoom = ralley.pos.roomName;

        if(creep.pos.roomName == targetRoom){
            var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(creep.hits<400){
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(ralleyRoom)));
                creep.rangedAttack(target);
            }
            else{
                if(target != null){
                    if(creep.pos.getRangeTo(target)<=3){
                        creep.rangedAttack(target);
                        if(creep.pos.y==49){
                            creep.moveTo(target);
                        }
                    }else{
                        creep.moveTo(target);
                    }
                }else{
                    creep.moveTo(flag)
                }
            }
        }else{
            if(creep.hits<400){
                creep.moveTo(ralley);
            }else{
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(targetRoom)));
            }

        }
    }

        /*

        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target != null){
            if(creep.pos.getRangeTo(target)>3){

                if(target.pos.x>=13){
                    creep.say('!');
                    creep.moveTo(target)
                }else{
                    creep.say('HOLD!');
                    creep.moveTo(18,21)
                }
            }else if(creep.pos.getRangeTo(target)<3){
                creep.rangedAttack(target);
                creep.say('RETREAT!');
                creep.moveTo(18,21)
            }else if(creep.pos.getRangeTo(target)==3){
                creep.say('Pew!');
                creep.rangedAttack(target);
                if(creep.pos.getRangeTo(target)!=3){
                    creep.moveTo(target);
                }
            }
        }else{
            //creep.say('.');
            creep.moveTo(18,21);
        }

    }

    */

}

module.exports = troopArcher;