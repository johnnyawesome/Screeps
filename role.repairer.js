//var roleBuilder = require('role.builder');
var roleWallRepairer = require('role.wallRepairer');
var roleSupporter = require('role.supporter');

module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);

        if(hostiles.length > 0){
            roleSupporter.run(creep);
        }
        else{    
        
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
                creep.say('Repairing');
            }
    
            // if creep is supposed to repair something
            if (creep.memory.working == true) {
                // find closest structure with less than max hits
                // Exclude walls because they have way too many max hits and would keep
                // our repairers busy forever. We have to find a solution for that later.
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    // the second argument for findClosestByPath is an object which takes
                    // a property called filter which can be a function
                    // we use the arrow operator to define it
                    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
                });
    
                // if we find one
                if (structure != undefined) {
                    // try to repair it, if it is out of range
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(structure, {visualizePathStyle: {stroke: '#8400ff', opacity: .8, lineStyle: 'dashed'}});
                    }
                }
                // if we can't fine one
                else {
                    // look for construction sites
                    //roleBuilder.run(creep);
                    roleWallRepairer.run(creep);
                    creep.say("Migr. WallRep");
                }
            }
            // if creep is supposed to harvest energy from source
            else {
                //If there's energy dropped, pick it up!
                var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
                if (droppedEnergy) {
                    if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#8400ff', opacity: .8, lineStyle: 'dashed'}});
                    }
                }
                else {
                    // if creep is supposed to harvest energy from source
                    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    // try to harvest energy, if the source is not in range
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        // move towards the source
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#8400ff', opacity: .8, lineStyle: 'dashed'}});
                    }
                }
            }
        }
    }
};