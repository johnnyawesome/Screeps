var roleSupporter = require('role.supporter');

module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);

        if(hostiles.length > 0){
            roleSupporter.run(creep);
        }
        else{

            // if creep is bringing energy to a structure but has no energy left
            if (creep.memory.working == true && creep.carry.energy == 0) {
                // switch state
                creep.memory.working = false;
                creep.say('Farvesting');
            }
                // if creep is harvesting energy but is full
            else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
                // switch state
                creep.memory.working = true;
                creep.say('Fill Spawn');
            }
    
            //Variables for the flags. When creating the Flags,
            //they have to be named 'Harvest1' or 'Harvest2' etc.
            var flagBoost4 = Game.flags.Boost4;
            var flagHarvest4 = Game.flags.Harvest4;
            
            var homeRoom = creep.memory.homeroom;
    
            //This switches when you leave the room.
            //It's how the creep knows if it's in his homeroom
            var roomSwitch = undefined;
    
    
            if(flagHarvest4 != undefined){
                
                //If we're in the room we want to farm, switch the roomSwitch to TRUE
                if (creep.room == flagHarvest4.room) {
                    roomSwitch = true;
                }
                    //If we're still at home, we have not yet switched rooms, hence FALSE
                else {
                    roomSwitch = false;
                }
        
                //If the creep is NOT in the home room
                //...and he's WORKING (Meaning he's full of evergy)
                //...and we're in another room then go home
                if (creep.room != homeRoom && creep.memory.working == true && roomSwitch == true){
                    creep.moveTo(Game.flags.Boost4, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                } 
                
                //if we're in the home room, go explore!!
                if (creep.room != flagHarvest4.room && creep.memory.working == false && roomSwitch == false) creep.moveTo(flagHarvest4);
        
                // if creep is supposed to transfer energy to a structure
                if (creep.memory.working == true && roomSwitch == false) {
        
                    //Prefer containers over spawn, extension or tower
                    var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_CONTAINER && s.store.energy < s.storeCapacity) });
        
                    // if we found one
                    if (containers) {
        
                        console.log("TRANSFERRING TO CONTAINERS: " + containers);
                        // try to transfer energy, if it is not in range
                        if (creep.transfer(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.moveTo(containers, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                        }
                    }
                    else {
                        // find closest spawn, extension or tower which is not full
                        var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity });
        
                        // if we found one
                        if (structure) {
                            // try to transfer energy, if it is not in range
                            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                // move towards it
                                creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                            }
                        }
                    }
                }
                else {
                    //If there's energy dropped, pick it up!
                    var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
                    if (droppedEnergy) {
                        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                        }
                    }
        
                        // if creep is supposed to harvest energy from source
                    else {
                        if (creep.memory.working == false && roomSwitch == true) {
                            // find closest source
                            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                            // try to harvest energy, if the source is not in range
                            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                // move towards the source
                                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                            }
                        }
                    }
        
                }
            }
        }
    }
};