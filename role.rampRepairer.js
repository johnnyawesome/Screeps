var roleBuilder = require('role.builder');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        
        // if creep is trying to repair something but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
            creep.say('Harvesting');
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
            creep.say('Rep. Ramp');
        }
        // if creep is supposed to repair something
        if (creep.memory.working == true) {
            // find all walls in the room
            var walls = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_RAMPART});

            var target = undefined;

            // loop with increasing percentages
            for (let percentage = 0.001; percentage <= 1; percentage = percentage + 0.001){
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

            // if we find a wall that has to be repaired
            if (target != undefined) {
                // try to repair it, if not in range
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#005c5c', opacity: .8, lineStyle: 'dashed'}});
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleBuilder.run(creep);
                creep.say("Migr. Builder");
            
                //var flagHome1 = Game.flags.Home1;
                //if (creep.room != flagHome1.room)creep.moveTo(flagHome1);
            
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {filter: (s) => s.energy > 0});
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source, {visualizePathStyle: {stroke: '#005c5c', opacity: .8, lineStyle: 'dashed'}});
            }
        }

    }
};  