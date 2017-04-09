var checkEnergy = {

    run: function() {
        //loop through all spawns
        for (var i in Game.spawns) {
            var thisRoom = Game.spawns[i].room;

            ///////////////////////

            //////////////////////

            //Get spawn energy
            var spawnEnergy = thisRoom.energyAvailable;

            //check for emergency
            if(Game.spawns[i].hits < Game.spawns[i].hitsMax){
                Game.rooms.E87N31.controller.activateSafeMode();

            }

            //Store the room level in memory
            Memory.roomLevel=thisRoom.controller.level;

            //Store spawn Energy in memory as Memory.roomEnergy
            Memory.spawnEnergy=spawnEnergy;

            //Display total spawn energy
            var formattedNumber = 'Energy: '
            formattedNumber = formattedNumber + spawnEnergy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            thisRoom.visual.text(formattedNumber, Game.spawns[i].pos.x-5, Game.spawns[i].pos.y-4, {
                align: 'left',
                size: 1,
                color: '#7DE3B5'
            });

            //Display queue
            var formattedNumber = 'Queue: '
            formattedNumber = formattedNumber + Memory.queue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            thisRoom.visual.text(formattedNumber, Game.spawns[i].pos.x-5, Game.spawns[i].pos.y-3, {
                align: 'left',
                size: 1,
                color: '#7DE3B5'
            });

            //Display remaining controller energy
            var remainingEnergy = thisRoom.controller.progressTotal - thisRoom.controller.progress;
            var formattedNumber = remainingEnergy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            thisRoom.visual.text(formattedNumber, thisRoom.controller.pos.x - 3, thisRoom.controller.pos.y-1, {
                align: 'left',
                size: 1,
                color: '#7DE3B5'
            });

        }
    }
};

module.exports = checkEnergy;