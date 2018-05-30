
module.exports = {
    // a function to run the logic for this role
    run: function (creep) {

/*
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (target) {
            creep.say("Attacking");
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
*/       

        var flagAttack1 = Game.flags.Attack1;
        var hostileCreeps = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, { filter: (s) => (s.getActiveBodyparts(ATTACK) > 0  || s.getActiveBodyparts(RANGED_ATTACK) > 0 || s.getActiveBodyparts(HEAL) > 0 ) } );
        var spawn = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
        var towers = creep.room.find(FIND_HOSTILE_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
        var hostileStructures = creep.room.find(FIND_HOSTILE_STRUCTURES, {filter: (b) => b.structureType != STRUCTURE_CONTROLLER && b.structureType != STRUCTURE_STORAGE && b.structureType != STRUCTURE_CONTAINER && b.structureType != STRUCTURE_WALL});
        var anyStructures = creep.room.find(FIND_STRUCTURES, {filter: (b) => b.structureType != STRUCTURE_CONTROLLER && b.structureType != STRUCTURE_WALL });
        
        if(flagAttack1 != undefined){

            //If we're in the room we want to farm, switch the roomSwitch to TRUE
            if (creep.room == flagAttack1.room) {
                roomSwitch = true;
            }
            //If we're still at home, we have not yet switched rooms, hence FALSE
            else {
                roomSwitch = false;
            }
            
            if (creep.room != flagAttack1.room && roomSwitch == false){
                creep.moveTo(flagAttack1.pos, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
            }
            else{

                if(towers){
                        
                    // try to crush it, if not in range
                    if (creep.attack(towers[0]) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                    }
                }
                if(hostileCreeps) {
                    creep.say("Attacking");
                    console.log("Targets " + hostileCreeps)
                    if (creep.attack(hostileCreeps) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileCreeps, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                    }
                }
                if(spawn){
                    //https://www.reddit.com/r/screeps/comments/53uy8r/how_do_you_get_you_creeps_to_attack_other_spawns/
                    let spawn = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
                    let outcome = creep.attack(spawn);
                    if (outcome === ERR_NOT_IN_RANGE) creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                    
                }
                if(hostileStructures){
                        
                    // try to crush it, if not in range
                    if (creep.attack(hostileStructures[1]) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(hostileStructures[1], {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                    }
                }
                if(anyStructures){
                        
                    // try to crush it, if not in range
                    if (creep.attack(anyStructures[2]) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(anyStructures[2], {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                    }
                }
            }
        }
    }
};