var claim = {

    run: function(creep) {

        var c1 = Game.flags.claim;
        if (creep.pos.roomName == c1.pos.roomName) {
            var target=c1.room.controller;
            if(creep.pos.getRangeTo(target)>1){
                creep.moveTo(target);
            }else{
                creep.claimController(target);
            }
        } else {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(c1.pos.roomName)));
        }
    }

}

module.exports = claim;