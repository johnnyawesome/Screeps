module.exports = {
    // a function to run the logic for this role
    run: function (creep) {

        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
            creep.say('Harvesting');
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
            creep.say('Supporting');
        }

		// Prefer towers in case of a siege...
		if (creep.memory.working == true) {

			var towers = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => (s.structureType == STRUCTURE_TOWER) && s.energy < (s.energyCapacity / 2)});

			// if we found one
			if (towers) {
				// try to transfer energy, if it is not in range
				if (creep.transfer(towers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					// move towards it
					creep.moveTo(towers, {visualizePathStyle: {stroke: '#ffffff', opacity: .6, lineStyle: 'dashed'}});
					creep.say("FilL Tower");
				}
			}
			if(towers == undefined) {
				//...then fill Spawns & Extensions
				var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION) && s.energy < s.energyCapacity });

				// if we found one
				if (structure) {
					// try to transfer energy, if it is not in range
					if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						// move towards it
						creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff', opacity: .6, lineStyle: 'dashed'}});
						creep.say("Fill Spawn");
					}
				}
			}
		}
		else {
			//Prefer containers over Sources
			var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER && s.store.energy > 0) });
			// if we found one
			if (containers) {
				// try to transfer energy, if it is not in range
				if (creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					// move towards it
					creep.moveTo(containers, {visualizePathStyle: {stroke: '#ffffff', opacity: .6, lineStyle: 'dashed'}});
					creep.say("Withd Cont");
				}
			}
			else {
				// if creep is supposed to harvest energy from source
				// find closest source
				var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
				// try to harvest energy, if the source is not in range
				if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
					// move towards the source
					creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff', opacity: .6, lineStyle: 'dashed'}});
					creep.say("Warvest");
				}
			}
		}
	//Randomcurse
    //var curse = ["Dick!🖕🏻", "Cunt!🖕🏻", "Fuck!🖕🏻", "Balls!🖕🏻", "Shit!🖕🏻", "Trololo🖕🏻", "Asshole!🖕🏻", "Moron!!🖕🏻", "LOLZ!🖕🏻", "Fuck!🖕🏻", "💩", "🖕🏻", "💩", "🖕🏻 YOU!", "🖕🏻 YOU!"]; 
    var curse = ["Dick!🖕🏻", "Cunt!🖕🏻", "Fuck!🖕🏻", "Balls!🖕🏻", "Shit!🖕🏻", "Trololo🖕🏻", "Asshole!🖕🏻", "Moron!!🖕🏻", "LOLZ!🖕🏻", "Fuck!🖕🏻", "💩", "🖕🏻", "💩", "🖕🏻 YOU!", "🖕🏻 YOU!", "💋", "💖", "💕", "👄", "💙", "💚", "💛", "🤘", "💜", "FUCK OFF", "GET LOST"]; 
    var randomCurseNumber = Math.floor((Math.random() * 40) + 1);
    if (randomCurseNumber <= 24) creep.say(curse[randomCurseNumber], "TRUE");
    }
};