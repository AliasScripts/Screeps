var build = require('task.build');
var expand = {

    run: function(creep) {
        var c1 = Game.flags.claim;
        if (creep.pos.roomName == c1.pos.roomName) {
            var room = c1.room;
            var roomSpawn = room.controller.pos.findClosestByRange(FIND_MY_SPAWNS);
            var roomLevel=room.controller.level;
            var sources = room.find(FIND_SOURCES);
            build.run(creep,roomLevel,roomSpawn,sources,room);
        } else {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(c1.pos.roomName)));
        }
    }

}

module.exports = expand;