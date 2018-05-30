module.exports = {

    //TOWER CODE
    defendMyRoom: function () {
 
        for (let name in Game.rooms) {

            //currentRoom is now the instance of the roomobject
            var currentRoom = Game.rooms[name];
    
            //From the current instance, we can get the name
            var currentRoomName = currentRoom.name;
            
            roomDefender(currentRoomName);

        }
        
        function roomDefender(myCurrentRoomName){

            var hostiles = Game.rooms[myCurrentRoomName].find(FIND_HOSTILE_CREEPS);
            var hostileHealers = Game.rooms[myCurrentRoomName].find(FIND_HOSTILE_CREEPS, { filter: (s) => (s.getActiveBodyparts(HEAL) > 0) });
            var hostileAttackers = Game.rooms[myCurrentRoomName].find(FIND_HOSTILE_CREEPS, { filter: (s) => ( s.getActiveBodyparts(ATTACK) > 0  || s.getActiveBodyparts(RANGED_ATTACK) > 0) });
            var hostiles = Game.rooms[myCurrentRoomName].find(FIND_HOSTILE_CREEPS);
            var towers = Game.rooms[myCurrentRoomName].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            var healerHit = false;
            
            //console.log("Room " + myCurrentRoomName + " has the towers: " + towers);
            
            //Alternative to finding towers:
            //var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    
            //if there are hostileAttackers - attack them    
            if (hostileAttackers.length > 0) {
                towers.forEach(tower => tower.attack(hostileAttackers[0]));
                healerHit = false;
                console.log("ALERT!!! ROOM " + myCurrentRoomName + " IS UNDER ATTACK!");
            }
    
            //if there are hostileHealers - attack them    
            else if (hostileHealers.length > 0 && healerHit == false) {
                towers.forEach(tower => tower.attack(hostileHealers[0]));
                healerHit = true;
                console.log("ALERT!!! ROOM " + myCurrentRoomName + " IS UNDER ATTACK!");
            }

            //if there are ANY Hostiles - attack them    
            else if (hostiles.length > 0) {
                towers.forEach(tower => tower.attack(hostiles[0]));
                healerHit = false;
                console.log("ALERT!!! ROOM " + myCurrentRoomName + " IS UNDER ATTACK!");
            }
    
            //if there are no hostiles....
            if (hostiles.length == 0) {
    
                //....first heal any damaged creeps
                for (let name in Game.creeps) {
                    // get the creep object
                    var creep = Game.creeps[name];
                    
                    if (creep.hits < creep.hitsMax) {
                        towers.forEach(tower => tower.heal(creep));
                        console.log("Tower is healing Creep " + creep + " in room " + myCurrentRoomName);
                    }
                }
    
                for (var i in towers) {
                    //...repair Buildings! :) But ONLY until HALF the energy of the tower is gone.
                    //Because we don't want to be exposed if something shows up at our door :)
                    if (towers[i].energy > ((towers[i].energyCapacity / 10) * 8)) {
    
                        //Find the closest damaged Structure
                        var closestDamagedStructure = towers[i].pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.hits < (s.hitsMax / 2)   && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART });
                        if (closestDamagedStructure) {
                            towers[i].repair(closestDamagedStructure);
                            console.log("The tower in room " + myCurrentRoomName + " is repairing buildings.");
                        }
                    }
                }
            }
        }
    }
};