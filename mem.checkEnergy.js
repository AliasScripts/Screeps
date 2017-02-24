var checkEnergy = {

    run: function() {
        //loop through all spawns
        for (var i in Game.spawns) {
            var thisRoom = Game.spawns[i].room;

            //Get spawn energy
            var spawnEnergy = thisRoom.energyAvailable;

            //Store the room level in memory
            Memory.roomLevel=thisRoom.controller.level;

            //Store spawn Energy in memory as Memory.roomEnergy
            Memory.spawnEnergy=spawnEnergy;

            //Display total spawn energy
            var formattedNumber = 'Energy: '
            formattedNumber = formattedNumber + spawnEnergy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            thisRoom.visual.text(formattedNumber, Game.spawns[i].pos.x-2, Game.spawns[i].pos.y-4, {
                align: 'left',
                size: 1,
                color: '#7DE3B5'
            });

            //Display queue
            var formattedNumber = 'Queue: '
            formattedNumber = formattedNumber + Memory.queue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            thisRoom.visual.text(formattedNumber, Game.spawns[i].pos.x-2, Game.spawns[i].pos.y-3, {
                align: 'left',
                size: 1,
                color: '#7DE3B5'
            });

            //Display remaining controller energy
            var remainingEnergy = thisRoom.controller.progressTotal - thisRoom.controller.progress;
            var formattedNumber = remainingEnergy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            thisRoom.visual.text(formattedNumber, thisRoom.controller.pos.x + 1, thisRoom.controller.pos.y, {
                align: 'left',
                size: 1,
                color: '#7DE3B5'
            });

        }
    }
};

module.exports = checkEnergy;