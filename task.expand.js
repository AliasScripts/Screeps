var build = require('task.build');
var expand = {

    run: function(creep) {

        var c1 = Game.flags.claim;
        if (creep.pos.roomName == c1.pos.roomName) {
            build.run(creep);
        } else {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(c1.pos.roomName)));
        }
    }

}

module.exports = expand;