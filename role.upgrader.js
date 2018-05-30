var roleSupporter = require('role.supporter');

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
                creep.say('Upgrading');
            }
    
            // if creep is supposed to transfer energy to the controller
            if (creep.memory.working == true) {
                // instead of upgraderController we could also use:
                // if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    
                // try to upgrade the controller
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    // if not in range, move towards the controller
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4d4dff', opacity: .6, lineStyle: 'dashed'}});
                }
            }
    
            else {
                //If there's energy dropped, pick it up!
                var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
                if (droppedEnergy) {
                    if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#0000e6', opacity: .6, lineStyle: 'dashed'}});
                    }
                }
                else {
                    // if creep is supposed to harvest energy from source
                    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    // try to harvest energy, if the source is not in range
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        // move towards the source
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#0000e6', opacity: .6, lineStyle: 'dashed'}});
                    }
                }
            }
        }
    }
};