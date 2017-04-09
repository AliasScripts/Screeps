
var autoConstruct={
    run: function(room,roomSpawn,roomLevel,extensions){

        //Create a new spawn
        if(Game.flags.claim != null){
            var newSpawn = Game.flags.claim.pos;
            var extendSite = newSpawn.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(extendSite == null){
                newSpawn.createConstructionSite(STRUCTURE_SPAWN);
            }else if(extendSite.pos.getRangeTo(newSpawn)!=0){
                extendSite = newSpawn.findClosestByRange(FIND_STRUCTURES);
                if(extendSite.pos.getRangeTo(newSpawn)!=0){
                    newSpawn.createConstructionSite(STRUCTURE_SPAWN);
                }
            }
        }

        //Create containers by sources
        for(var i in room.find(FIND_SOURCES)) {

            var sources = room.find(FIND_SOURCES);

            var extensionSites = sources[i].pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });

            var containers = sources[i].pos.findInRange(FIND_STRUCTURES, 1, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });

            var towers = room.find(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_TOWER }
            });

            var towerSites = room.find(FIND_CONSTRUCTION_SITES, {
                filter: { structureType: STRUCTURE_TOWER }
            });

            if(extensionSites.length>0){

            }else if(containers.length>0){

            }else{
                var width = 8;
                var height = 8;
                var x = -(width - height)/2;
                var y = 0;
                var dx = 1;
                var dy = 0;
                var x_limit = (width - height)/2;
                var y_limit = 0;
                var counter = 0;

                var needContainer = true;
                while(needContainer){
                    if ((-width/2 < x && x <= width/2)  && (-height/2 < y && y <= height/2)) {
                        var currentX = sources[i].pos.x+x;
                        var currentY = sources[i].pos.y+y;
                        if(currentX > 3 && currentX < 47 && currentY > 3 && currentY < 47){
                            if(sources[i].pos.getRangeTo(currentX,currentY)==1){
                                if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX, currentY).length==0) {
                                    if (room.lookForAt(LOOK_STRUCTURES, currentX, currentY).length == 0) {
                                        if (room.lookForAt(LOOK_SOURCES, currentX, currentY).length == 0) {
                                            if (room.lookForAt('terrain', currentX, currentY) != "wall") {
                                                room.createConstructionSite(currentX,currentY,STRUCTURE_CONTAINER);
                                                needContainer=false;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                    if( dx > 0 ){//Dir right
                        if(x > x_limit){
                            dx = 0;
                            dy = 1;
                        }
                    }
                    else if( dy > 0 ){ //Dir up
                        if(y > y_limit){
                            dx = -1;
                            dy = 0;
                        }
                    }
                    else if(dx < 0){ //Dir left
                        if(x < (-1 * x_limit)){
                            dx = 0;
                            dy = -1;
                        }
                    }
                    else if(dy < 0) { //Dir down
                        if(y < (-1 * y_limit)){
                            dx = 1;
                            dy = 0;
                            x_limit += 1;
                            y_limit += 1;
                        }
                    }
                    counter += 1;
                    //alert (counter);
                    x += dx;
                    y += dy;
                }
            }

        }

        //Put a container near the controller
        var extensionSites = room.controller.pos.findInRange(FIND_CONSTRUCTION_SITES, 2, {
            filter: { structureType: STRUCTURE_CONTAINER }
        });

        var containers = room.controller.pos.findInRange(FIND_STRUCTURES, 2, {
            filter: { structureType: STRUCTURE_CONTAINER }
        });

        if(extensionSites.length>0){

        }else if(containers.length>0){

        }else{
            var width = 8;
            var height = 8;
            var x = -(width - height)/2;
            var y = 0;
            var dx = 1;
            var dy = 0;
            var x_limit = (width - height)/2;
            var y_limit = 0;
            var counter = 0;

            var needContainer = true;
            while(needContainer){
                if ((-width/2 < x && x <= width/2)  && (-height/2 < y && y <= height/2)) {
                    var currentX = room.controller.pos.x+x;
                    var currentY = room.controller.pos.y+y;
                    if(currentX > 3 && currentX < 47 && currentY > 3 && currentY < 47){
                        if(room.controller.pos.getRangeTo(currentX,currentY)==2){
                            if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX, currentY).length==0) {
                                if (room.lookForAt(LOOK_STRUCTURES, currentX, currentY).length == 0) {
                                    if (room.lookForAt(LOOK_SOURCES, currentX, currentY).length == 0) {
                                        if (room.lookForAt('terrain', currentX, currentY) != "wall") {

                                            var sides=4;
                                            //check X+1
                                            if(room.lookForAt(LOOK_STRUCTURES, currentX+1, currentY).length!=0){
                                                sides--;
                                            }
                                            if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX+1, currentY).length!=0){
                                                sides--;
                                            }
                                            if(room.lookForAt('terrain', currentX+1, currentY)=="wall"){
                                                sides--;
                                            }
                                            //checkX-1
                                            if(room.lookForAt(LOOK_STRUCTURES, currentX-1, currentY).length!=0){
                                                sides--;
                                            }
                                            if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX-1, currentY).length!=0){
                                                sides--;
                                            }
                                            if(room.lookForAt('terrain', currentX-1, currentY)=="wall"){
                                                sides--;
                                            }
                                            //checkY+1
                                            if(room.lookForAt(LOOK_STRUCTURES, currentX, currentY+1).length!=0){
                                                sides--;
                                            }
                                            if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX, currentY+1).length!=0){
                                                sides--;
                                            }
                                            if(room.lookForAt('terrain', currentX, currentY+1)=="wall"){
                                                sides--;
                                            }
                                            //checkY-1
                                            if(room.lookForAt(LOOK_STRUCTURES, currentX, currentY-1).length!=0){
                                                sides--;
                                            }
                                            if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX, currentY-1).length!=0){
                                                sides--;
                                            }
                                            if(room.lookForAt('terrain', currentX, currentY-1)=="wall"){
                                                sides--;
                                            }

                                            if(sides==4){
                                                room.createConstructionSite(currentX,currentY,STRUCTURE_CONTAINER)
                                                needContainer=false;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
                if( dx > 0 ){//Dir right
                    if(x > x_limit){
                        dx = 0;
                        dy = 1;
                    }
                }
                else if( dy > 0 ){ //Dir up
                    if(y > y_limit){
                        dx = -1;
                        dy = 0;
                    }
                }
                else if(dx < 0){ //Dir left
                    if(x < (-1 * x_limit)){
                        dx = 0;
                        dy = -1;
                    }
                }
                else if(dy < 0) { //Dir down
                    if(y < (-1 * y_limit)){
                        dx = 1;
                        dy = 0;
                        x_limit += 1;
                        y_limit += 1;
                    }
                }
                counter += 1;
                //alert (counter);
                x += dx;
                y += dy;
            }
        }

        //create extensions
        width = 50;
        height = 50;
        x = -(width - height)/2;
        y = 0;
        dx = 1;
        dy = 0;
        x_limit = (width - height)/2;
        y_limit = 0;
        counter = 0;

        var maxExtensions = 10000;

        if(roomLevel<2) {
            maxExtensions = 0;
        }
        else if(roomLevel==2){
            maxExtensions = 5;
        }else if(roomLevel==3){
            maxExtensions = 10;
        }else if(roomLevel==4){
            maxExtensions = 20;
        }else if(roomLevel==5){
            maxExtensions = 30;
        }else if(roomLevel==6){
            maxExtensions = 40;
        }else if(roomLevel==7){
            maxExtensions = 50;
        }else if(roomLevel==8){
            maxExtensions = 60;
        }

        var extensionSites = room.find(FIND_CONSTRUCTION_SITES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });

        while(extensionSites.length + extensions.length < maxExtensions){
            if ((-width/2 < x && x <= width/2)  && (-height/2 < y && y <= height/2)) {
                var currentX = roomSpawn.pos.x+x;
                var currentY = roomSpawn.pos.y+y;
                if(currentX > 3 && currentX < 47 && currentY > 3 && currentY < 47){
                    if(room.controller.pos.getRangeTo(currentX,currentY)>3){
                        if(roomSpawn.pos.getRangeTo(currentX,currentY)>1){
                            var sourceNear=false;
                            var sources = room.find(FIND_SOURCES)
                            for(var i in sources) {
                                var currentSource = sources[i];

                                if(currentSource.pos.getRangeTo(currentX,currentY)<=2){
                                    sourceNear=true;
                                }

                            }
                            if(!sourceNear){
                                if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX, currentY).length==0){
                                    if(room.lookForAt(LOOK_STRUCTURES, currentX, currentY).length==0){
                                        if(room.lookForAt(LOOK_SOURCES, currentX, currentY).length==0){
                                            if(room.lookForAt('terrain', currentX, currentY)!="wall"){

                                                var sides=4;
                                                //check X+1
                                                if(room.lookForAt(LOOK_STRUCTURES, currentX+1, currentY).length!=0){
                                                    sides--;
                                                }
                                                if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX+1, currentY).length!=0){
                                                    sides--;
                                                }
                                                if(room.lookForAt('terrain', currentX+1, currentY)=="wall"){
                                                    sides--;
                                                }
                                                //checkX-1
                                                if(room.lookForAt(LOOK_STRUCTURES, currentX-1, currentY).length!=0){
                                                    sides--;
                                                }
                                                if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX-1, currentY).length!=0){
                                                    sides--;
                                                }
                                                if(room.lookForAt('terrain', currentX-1, currentY)=="wall"){
                                                    sides--;
                                                }
                                                //checkY+1
                                                if(room.lookForAt(LOOK_STRUCTURES, currentX, currentY+1).length!=0){
                                                    sides--;
                                                }
                                                if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX, currentY+1).length!=0){
                                                    sides--;
                                                }
                                                if(room.lookForAt('terrain', currentX, currentY+1)=="wall"){
                                                    sides--;
                                                }
                                                //checkY-1
                                                if(room.lookForAt(LOOK_STRUCTURES, currentX, currentY-1).length!=0){
                                                    sides--;
                                                }
                                                if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX, currentY-1).length!=0){
                                                    sides--;
                                                }
                                                if(room.lookForAt('terrain', currentX, currentY-1)=="wall"){
                                                    sides--;
                                                }

                                                if(sides==4){
                                                    room.createConstructionSite(currentX,currentY,STRUCTURE_EXTENSION);
                                                    break;
                                                }

                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
            if( dx > 0 ){//Dir right
                if(x > x_limit){
                    dx = 0;
                    dy = 1;
                }
            }
            else if( dy > 0 ){ //Dir up
                if(y > y_limit){
                    dx = -1;
                    dy = 0;
                }
            }
            else if(dx < 0){ //Dir left
                if(x < (-1 * x_limit)){
                    dx = 0;
                    dy = -1;
                }
            }
            else if(dy < 0) { //Dir down
                if(y < (-1 * y_limit)){
                    dx = 1;
                    dy = 0;
                    x_limit += 1;
                    y_limit += 1;
                }
            }
            counter += 1;
            //alert (counter);
            x += dx;
            y += dy;
        }

        //Create Towers
        if(roomLevel<3){
            var tMax = 0;
        }else if(roomLevel <= 4){
            var tMax = 1;
        }else if(roomLevel <=6){
            var tMax = 2;
        }else if(roomLevel ==7){
            var tMax = 3
        }else if(roomLevel == 8){
            var tMax = 6;
        }
        if(towers.length + towerSites.length < tMax){
            while(towerSites < tMax){
                if ((-width/2 < x && x <= width/2)  && (-height/2 < y && y <= height/2)) {
                    var currentX = roomSpawn.pos.x+x;
                    var currentY = roomSpawn.pos.y+y;
                    if(currentX > 3 && currentX < 47 && currentY > 3 && currentY < 47){
                        if(room.controller.pos.getRangeTo(currentX,currentY)>3){
                            if(roomSpawn.pos.getRangeTo(currentX,currentY)>1){
                                var sourceNear=false;
                                var sources = room.find(FIND_SOURCES)
                                for(var i in sources) {
                                    var currentSource = sources[i];

                                    if(currentSource.pos.getRangeTo(currentX,currentY)<=2){
                                        sourceNear=true;
                                    }

                                }
                                if(!sourceNear){
                                    if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX, currentY).length==0){
                                        if(room.lookForAt(LOOK_STRUCTURES, currentX, currentY).length==0){
                                            if(room.lookForAt(LOOK_SOURCES, currentX, currentY).length==0){
                                                if(room.lookForAt('terrain', currentX, currentY)!="wall"){

                                                    var sides=4;
                                                    //check X+1
                                                    if(room.lookForAt(LOOK_STRUCTURES, currentX+1, currentY).length!=0){
                                                        sides--;
                                                    }
                                                    if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX+1, currentY).length!=0){
                                                        sides--;
                                                    }
                                                    if(room.lookForAt('terrain', currentX+1, currentY)=="wall"){
                                                        sides--;
                                                    }
                                                    //checkX-1
                                                    if(room.lookForAt(LOOK_STRUCTURES, currentX-1, currentY).length!=0){
                                                        sides--;
                                                    }
                                                    if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX-1, currentY).length!=0){
                                                        sides--;
                                                    }
                                                    if(room.lookForAt('terrain', currentX-1, currentY)=="wall"){
                                                        sides--;
                                                    }
                                                    //checkY+1
                                                    if(room.lookForAt(LOOK_STRUCTURES, currentX, currentY+1).length!=0){
                                                        sides--;
                                                    }
                                                    if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX, currentY+1).length!=0){
                                                        sides--;
                                                    }
                                                    if(room.lookForAt('terrain', currentX, currentY+1)=="wall"){
                                                        sides--;
                                                    }
                                                    //checkY-1
                                                    if(room.lookForAt(LOOK_STRUCTURES, currentX, currentY-1).length!=0){
                                                        sides--;
                                                    }
                                                    if(room.lookForAt(LOOK_CONSTRUCTION_SITES, currentX, currentY-1).length!=0){
                                                        sides--;
                                                    }
                                                    if(room.lookForAt('terrain', currentX, currentY-1)=="wall"){
                                                        sides--;
                                                    }

                                                    if(sides==4){
                                                        room.createConstructionSite(currentX,currentY,STRUCTURE_TOWER);
                                                        towerSites++
                                                        break;
                                                    }

                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
                if( dx > 0 ){//Dir right
                    if(x > x_limit){
                        dx = 0;
                        dy = 1;
                    }
                }
                else if( dy > 0 ){ //Dir up
                    if(y > y_limit){
                        dx = -1;
                        dy = 0;
                    }
                }
                else if(dx < 0){ //Dir left
                    if(x < (-1 * x_limit)){
                        dx = 0;
                        dy = -1;
                    }
                }
                else if(dy < 0) { //Dir down
                    if(y < (-1 * y_limit)){
                        dx = 1;
                        dy = 0;
                        x_limit += 1;
                        y_limit += 1;
                    }
                }
                counter += 1;
                //alert (counter);
                x += dx;
                y += dy;
            }
        }
    }
}
module.exports = autoConstruct;