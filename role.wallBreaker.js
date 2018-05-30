
module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
                
        var flagAttack1 = Game.flags.Attack1;
        
        if(flagAttack1 != undefined){

            //If we're in the room we want to farm, switch the roomSwitch to TRUE
            //if (creep.room == flagAttack1.room) {
            if (creep.pos == flagAttack1.pos) {
                roomSwitch = true;
            }
            //If we're still at home, we have not yet switched rooms, hence FALSE
            else {
                roomSwitch = false;
            }
            
            if (creep.room != flagAttack1.room && roomSwitch == false){
                creep.moveTo(flagAttack1, {visualizePathStyle: {stroke: '#005c5c', opacity: .8, lineStyle: 'dashed'}});
            }
            else{
                
                var towers = creep.room.find(FIND_HOSTILE_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
                var walls = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART});
                        
                if(towers){
                    
                    // try to crush it, if not in range
                    if (creep.rangedAttack(towers[0]) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#005c5c', opacity: .8, lineStyle: 'dashed'}});
                    }
                    
                }
                else{
                    

        
                    var target = undefined;
        
                    // loop with increasing percentages
                    for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                        // find a wall with less than percentage hits
                        for (let wall of walls) {
                            if (wall.hits / wall.hitsMax < percentage) {
                                target = wall;
                                break;
                            }
                        }
        
                        // if there is one
                        if (target != undefined) {
                            // break the loop
                            break;
                        }
                    }
        
                    // if we find a wall that has to be crushed
                    if (target != undefined) {
                        // try to crush it, if not in range
                        if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#005c5c', opacity: .8, lineStyle: 'dashed'}});
                        }
                    }    
                }

            }
        }
    }
};