var clearDead = {

    run: function() {

        var alive=0;
        var dead=0;

        // Check for memory entries of dead creeps by iterating over Memory.creeps
        for(var name in Memory.creeps) {
            // and checking if the creep is still alive
            if (Game.creeps[name] == undefined) {
                // if not, delete the memory entry
                delete Memory.creeps[name];
                //(and count them)
                dead++;
            // if so, count the living.
            }else{
                alive++;
            }
        }

        // Store the count in memory as Memory.creepCount
        var oldCount = Memory.creepCount;
        Memory.creepCount=alive;

        //Speak in console
        if(oldCount != alive){
            console.log("New unit count: "+alive);
        }
        if(dead>0){
            console.log("RIP: "+dead+' units');
        }
    }
};

module.exports = clearDead;