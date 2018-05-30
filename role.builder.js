var roleUpgrader = require('role.upgrader');
var roleSupporter = require('role.supporter');

module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        
        if(hostiles.length > 0){
            roleSupporter.run(creep);
        }
        else{

            //Relevant flags for the builder
            var flagBuild1 = Game.flags.Build1;
            var roomSwitch = false;
    
    
            if (flagBuild1 != undefined) {
    
                //In case the creep needs to build in another room
                if (creep.room != flagBuild1.room) {
                    creep.moveTo(flagBuild1, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                }
                if (creep.room == flagBuild1.room) {
                    building();
                }
            }
            if (flagBuild1 == undefined) {
                building();
            }
    
            function building() {
    
                // if creep is trying to complete a constructionSite but has no energy left
                if (creep.memory.working == true && creep.carry.energy == 0) {
                    // switch state
                    creep.memory.working = false;
                    creep.say('Harvesting');
                }
                    // if creep is harvesting energy but is full
                else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
                    // switch state
                    creep.memory.working = true;
                    creep.say('Building');
                }
    
                // if creep is supposed to complete a constructionSite
                if (creep.memory.working == true) {
                    // find closest constructionSite
                    var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    // if one is found
                    if (constructionSite != undefined) {
                        // try to build, if the constructionSite is not in range
                        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            // move towards the constructionSite
                            creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffff33', opacity: .6, lineStyle: 'dashed'}});
                        }
                    }
                        // if no constructionSite is found
                    else {
                        // go upgrading the controller
                        creep.say('Migr. Upgrader');
                        roleUpgrader.run(creep);
                    }
                }
                    // if creep is supposed to harvest energy from source
                else {
                    //If there's energy dropped, pick it up!
                    var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
                    if (droppedEnergy) {
                        if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(droppedEnergy, {visualizePathStyle: {stroke: '#ffff33', opacity: .6, lineStyle: 'dashed'}});
                        }
                    }
                    else {
                        // if creep is supposed to harvest energy from source
                        // find closest source
                        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                        // try to harvest energy, if the source is not in range
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            // move towards the source
                            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff33', opacity: .6, lineStyle: 'dashed'}});
                        }
                    }
                }
            }
        }
    }

};

