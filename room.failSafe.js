module.exports = {

    saveMyRoom: function (myRoomName) {
        
        
        for (let name in Game.rooms) {
            //currentRoom is now the instance of the roomobject
            var currentRoom = Game.rooms[name];
    
            //From the current instance, we can get the name
            var currentRoomName = currentRoom.name;
    
            var walls = Game.rooms[currentRoomName].find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART });
            for (let wall of walls) {
                if (wall.hits <= 300) {
                    Game.rooms[currentRoomName].controller.activateSafeMode();
                }
            }
            console.log("Protecting Room: " + currentRoomName);
        }

    }
};