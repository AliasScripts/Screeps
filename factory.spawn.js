var unitSpawner = {

    run: function() {

        //Get room level using the value we stored in mem.checkEnergy;
        var roomLevel=Memory.roomLevel;

        //Get the potential value of extensions
        var eVal = 0;
        if(roomLevel<2){
            eVal = 0;
        }
        else if(roomLevel<=6){
            eVal = 50;
        }
        else if(roomLevel==7){
            eVal=100
        }
        else if(roomLevel==8){
            eVal==200;
        }

        //Get current energy levels using the value we stored in mem.checkEnergy
        var energy = Memory.spawnEnergy;

        //count Extensions
        var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: {structureType: STRUCTURE_EXTENSION}
        });
        extensions = extensions.length;

        //Find max energy possible
        var maxEnergy = 300 + (extensions * eVal);

        var move = true; //Do you want the unit to move at max speed
        var work = true;
        var carry = true;
        var attack = false;
        var ranged =false;
        var heal = false;
        var tough = false;

        var balance = maxEnergy;

        var moveParts=1;
        var workParts=0;
        var carryParts=0;
        var cost = 50;

        var parts = 'MOVE,';
        while (balance >0){

            var addedCost = 0;

            if(move==true){
                if (work == true){
                    addedCost = 0;
                    addedCost = cost + 100;
                    addedCost = cost + 50;
                    if(cost+addedCost<=balance){
                        workParts=workParts++;
                        moveParts=moveParts++;
                        cost=cost+addedCost;
                    }

                }
                if(carry==true){
                    addedCost = 0;
                    addedCost = cost + 50;
                    addedCost = cost + 50;
                    if(cost+addedCost<=balance){
                        carryParts=carryParts++;
                        moveParts=moveParts++;
                    }
                }
            }

        }






        //figure out if we are stable (more energy coming?)

        /*
         t = ceil(k * W / M)

         Where:
         t = time (game ticks)
         k = terrain factor (1x for plain, 0.5x for road, 5x for swamp)
         W = creep weight (Number of body parts, excluding MOVE and empty CARRY parts)
         M = number of MOVE parts
         */





    }
};

module.exports = unitSpawner;