var roleSupporter = require('role.supporter');
var roleHarvester = require('role.harvester');

module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        
        if(hostiles.length > 0){
            roleSupporter.run(creep);
        }
        else{
            
            // if creep is bringing energy to the controller but has no energy left
            if (creep.memory.working == true && creep.carry.energy == 0) {
                // switch state
                creep.memory.working = false;
                creep.say('Harvesting');
            }
                // if creep is harvesting energy but is full
            else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
                // switch state
                creep.memory.working = true;
                creep.say('Hoarding');
            }
    
            // if creep is supposed to transfer energy to the controller
            if (creep.memory.working == true) {
    
                 // Find Containers or Storage
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => ((s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER) && s.store.energy < s.storeCapacity) });
                
                if (structure) {
                    // try to transfer energy, if it is not in range
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(structure, {visualizePathStyle: {stroke: '#FF8C00', opacity: .6, lineStyle: 'dashed'}});
                    }
                }
                else{
                    roleHarvester.run(creep);
                }
            }
    
            else {
                //If there's energy dropped, pick it up!
                var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
                if (droppedEnergy) {
                    if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#FF8C00', opacity: .6, lineStyle: 'dashed'}});
                    }
                }
                else {
                    // if creep is supposed to harvest energy from source
                    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    // try to harvest energy, if the source is not in range
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        // move towards the source
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#FF8C00', opacity: .6, lineStyle: 'dashed'}});
                    }
                }
            }
        }
    }
};