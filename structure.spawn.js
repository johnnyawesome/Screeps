var structureSpawn = {
    
    createCreeps: function(spawn) {
        
        var mine = 0;

        // iterate over all the spawns
        for (let spawnName in Game.spawns) {
            
            let spawn = Game.spawns[spawnName];
            
            let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
            
            var currentRoomName = spawn.room.name;
            
            var totalEnergyAvailable = (spawn.room.energyCapacityAvailable);
            var name = undefined;
            var body = undefined;
            
            //Count all the Creeps, based on their Roles
            //CREEPS IN ROOM
            var numberOfHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester');
            var numberOfUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');
            var numberOfBuilders = _.sum(creepsInRoom, (c) => c.memory.role == 'builder');
            var numberOfRepairers = _.sum(creepsInRoom, (c) => c.memory.role == 'repairer');
            var numberOfWallRepairers = _.sum(creepsInRoom, (c) => c.memory.role == 'wallRepairer');
            var numberOfRampRepairers = _.sum(creepsInRoom, (c) => c.memory.role == 'rampRepairer');
            var numberOfDefenders = _.sum(creepsInRoom, (c) => c.memory.role == 'defender');
            var numberOfAttackers = _.sum(creepsInRoom, (c) => c.memory.role == 'attacker');
            var numberOfHealers = _.sum(creepsInRoom, (c) => c.memory.role == 'healer');
            var numberOfMiners = _.sum(creepsInRoom, (c) => c.memory.role == 'miner');
            var numberOfHoarders = _.sum(creepsInRoom, (c) => c.memory.role == 'hoarder');
            
            //CREEPS IN _GAME_!!
            var numberOfFarvesters1 = _.sum(Game.creeps, (c) => c.memory.role == 'farvester1');
            var numberOfFarvesters2 = _.sum(Game.creeps, (c) => c.memory.role == 'farvester2');
            var numberOfFarvesters3 = _.sum(Game.creeps, (c) => c.memory.role == 'farvester3');
            var numberOfFarvesters4 = _.sum(Game.creeps, (c) => c.memory.role == 'farvester4');
            
            
            //Default Values for a room
            var minimumNumberOfHarvesters = 2;
            var minimumNumberOfUpgraders = 2;
            var minimumNumberOfBuilders = 1;
            var minimumNumberOfRepairers = 1;
            var minimumNumberOfWallRepairers = 1;
            var minimumNumberOfRampRepairers = 1;
            var minimumNumberOfFarvesters1 = 0;
            var minimumNumberOfFarvesters2 = 0;
            var minimumNumberOfFarvesters3 = 0;
            var minimumNumberOfFarvesters4 = 0;
            var minimumNumberOfHoarders = 0;
            var minimumNumberOfMiners = 0;
            var minimumNumberOfDefenders = 2;
            
            //Seperate values for the different spawns. Ugly hack, but better than Memory-Crap
            if(spawn == Game.spawns.Spawn1){
                
                totalEnergyAvailable = (spawn.room.energyCapacityAvailable - 1200);
                
                minimumNumberOfHarvesters = 2;
                minimumNumberOfUpgraders = 2;
                minimumNumberOfBuilders = 1;
                minimumNumberOfRepairers = 1;
                minimumNumberOfWallRepairers = 2;
                minimumNumberOfRampRepairers = 1;
                minimumNumberOfFarvesters1 = 0;
                minimumNumberOfFarvesters2 = 0;
                minimumNumberOfFarvesters3 = 0;
                minimumNumberOfFarvesters4 = 0;
                minimumNumberOfHoarders = 1;
                minimumNumberOfMiners = 0;
                minimumNumberOfDefenders = 2;
            }
            
            else if(spawn == Game.spawns.Spawn2){
                
                totalEnergyAvailable = (spawn.room.energyCapacityAvailable - 1200);
                
                minimumNumberOfHarvesters = 2;
                minimumNumberOfUpgraders = 2;
                minimumNumberOfBuilders = 1;
                minimumNumberOfRepairers = 1;
                minimumNumberOfWallRepairers = 2;
                minimumNumberOfRampRepairers = 1;
                minimumNumberOfFarvesters1 = 0;
                minimumNumberOfFarvesters2 = 0;
                minimumNumberOfFarvesters3 = 0;
                minimumNumberOfFarvesters4 = 0;
                minimumNumberOfHoarders = 1;
                minimumNumberOfMiners = 0;
                minimumNumberOfDefenders = 2;
                
            }
            
            else if(spawn == Game.spawns.Spawn3){
                
                totalEnergyAvailable = (spawn.room.energyCapacityAvailable - 3200);
                
                minimumNumberOfHarvesters = 2;
                minimumNumberOfUpgraders = 2;
                minimumNumberOfBuilders = 1;
                minimumNumberOfRepairers = 1;
                minimumNumberOfWallRepairers = 2;
                minimumNumberOfRampRepairers = 1;
                minimumNumberOfFarvesters1 = 0;
                minimumNumberOfFarvesters2 = 0;
                minimumNumberOfFarvesters3 = 0;
                minimumNumberOfFarvesters4 = 0;
                minimumNumberOfHoarders = 1;
                minimumNumberOfMiners = 1;
                minimumNumberOfDefenders = 2;
                
                mine = "59f1a28482100e1594f3a0ae";
            }
            
            else if(spawn == Game.spawns.Spawn4){
                
                totalEnergyAvailable = (spawn.room.energyCapacityAvailable - 3200);
                
                minimumNumberOfHarvesters = 2;
                minimumNumberOfUpgraders = 2;
                minimumNumberOfBuilders = 1;
                minimumNumberOfRepairers = 1;
                minimumNumberOfWallRepairers = 2;
                minimumNumberOfRampRepairers = 1;
                minimumNumberOfFarvesters1 = 0;
                minimumNumberOfFarvesters2 = 0;
                minimumNumberOfFarvesters3 = 0;
                minimumNumberOfFarvesters4 = 0;
                minimumNumberOfHoarders = 1;
                minimumNumberOfMiners = 0;
                minimumNumberOfDefenders = 2;
            }
            
            else if(spawn == Game.spawns.Spawn5){
                
                totalEnergyAvailable = (spawn.room.energyCapacityAvailable - 3200);
                
                minimumNumberOfHarvesters = 2;
                minimumNumberOfUpgraders = 2;
                minimumNumberOfBuilders = 1;
                minimumNumberOfRepairers = 1;
                minimumNumberOfWallRepairers = 2;
                minimumNumberOfRampRepairers = 1;
                minimumNumberOfFarvesters1 = 0;
                minimumNumberOfFarvesters2 = 0;
                minimumNumberOfFarvesters3 = 0;
                minimumNumberOfFarvesters4 = 0;
                minimumNumberOfHoarders = 1;
                minimumNumberOfMiners = 1;
                minimumNumberOfDefenders = 2;
                
                mine = "59f1a26282100e1594f39da2";
            }
            
            else if(spawn == Game.spawns.Spawn6){
                
                totalEnergyAvailable = (spawn.room.energyCapacityAvailable  - 3200);
                
                minimumNumberOfHarvesters = 2;
                minimumNumberOfUpgraders = 2;
                minimumNumberOfBuilders = 1;
                minimumNumberOfRepairers = 1;
                minimumNumberOfWallRepairers = 2;
                minimumNumberOfRampRepairers = 1;
                minimumNumberOfFarvesters1 = 0;
                minimumNumberOfFarvesters2 = 0;
                minimumNumberOfFarvesters3 = 0;
                minimumNumberOfFarvesters4 = 0;
                minimumNumberOfHoarders = 1;
                minimumNumberOfMiners = 0;
                minimumNumberOfDefenders = 2;
                
                mine = "59f1a2a182100e1594f3a509";
            }
            
            else if(spawn == Game.spawns.Spawn7){
                
                totalEnergyAvailable = (spawn.room.energyCapacityAvailable);
                
                minimumNumberOfHarvesters = 2;
                minimumNumberOfUpgraders = 3;
                minimumNumberOfBuilders = 2;
                minimumNumberOfRepairers = 1;
                minimumNumberOfWallRepairers = 1;
                minimumNumberOfRampRepairers = 1;
                minimumNumberOfFarvesters1 = 0;
                minimumNumberOfFarvesters2 = 0;
                minimumNumberOfFarvesters3 = 0;
                minimumNumberOfFarvesters4 = 0;
                minimumNumberOfMiners = 0;
                minimumNumberOfDefenders = 2;
            }
            
            else if(spawn == Game.spawns.Spawn8){
                
                totalEnergyAvailable = (spawn.room.energyCapacityAvailable);
                
                minimumNumberOfHarvesters = 2;
                minimumNumberOfUpgraders = 3;
                minimumNumberOfBuilders = 2;
                minimumNumberOfRepairers = 1;
                minimumNumberOfWallRepairers = 1;
                minimumNumberOfRampRepairers = 1;
                minimumNumberOfFarvesters1 = 0;
                minimumNumberOfFarvesters2 = 0;
                minimumNumberOfFarvesters3 = 0;
                minimumNumberOfFarvesters4 = 0;
                minimumNumberOfMiners = 0;
                minimumNumberOfDefenders = 2;
            }
            
            else if(spawn == Game.spawns.Spawn9){
                
                totalEnergyAvailable = (spawn.room.energyCapacityAvailable);
                
                minimumNumberOfHarvesters = 2;
                minimumNumberOfUpgraders = 3;
                minimumNumberOfBuilders = 2;
                minimumNumberOfRepairers = 1;
                minimumNumberOfWallRepairers = 1;
                minimumNumberOfRampRepairers = 1;
                minimumNumberOfFarvesters1 = 0;
                minimumNumberOfFarvesters2 = 0;
                minimumNumberOfFarvesters3 = 0;
                minimumNumberOfFarvesters4 = 0;
                minimumNumberOfMiners = 0;
                minimumNumberOfDefenders = 2;
            }
            
			//Create a Harvester with all available Energy
            if(numberOfHarvesters < minimumNumberOfHarvesters) {
                
                var newName = 'harvester' + Game.time;
                body = createWorkerBody(totalEnergyAvailable);
                //Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
                spawn.spawnCreep(body, newName, {memory: {role: 'harvester', working: false, homeroom: currentRoomName}});
                
                //If there's not enough energy available, create a Harvester with what is here.
                if(numberOfHarvesters == 0) {
                    var newName = 'harvester' + Game.time;
                    body = createWorkerBody(spawn.room.energyAvailable);
                    spawn.spawnCreep(body, newName, {memory: {role: 'harvester', working: false, homeroom: currentRoomName}});
                }
            }
			
			//Create a Upgrader with all available Energy
            else if(numberOfUpgraders < minimumNumberOfUpgraders) {
                var newName = 'upgrader' + Game.time;
                body = createWorkerBody(totalEnergyAvailable);
                spawn.spawnCreep(body, newName, {memory: {role: 'upgrader', working: false, homeroom: currentRoomName}});
            }
            //Create a Miner with all available Energy
            else if(numberOfMiners < minimumNumberOfMiners) {
                var newName = 'miner' + Game.time;
                //Miners need big bodies, so they are allowed to use ALL available energy
                totalEnergyAvailable = (spawn.room.energyCapacityAvailable -2000);
                body = createMinerBody(totalEnergyAvailable);
                spawn.spawnCreep(body, newName, {memory: {role: 'miner', working: false, homeroom: currentRoomName, mine: mine}});
            }
            //Create a Builder with all available Energy
            else if(numberOfBuilders < minimumNumberOfBuilders) {
                var newName = 'builder' + Game.time;
                body = createWorkerBody(totalEnergyAvailable);
                spawn.spawnCreep(body, newName, {memory: {role: 'builder', working: false, homeroom: currentRoomName}});
            }
            //Create a Repairer with all available Energy
            else if(numberOfRepairers < minimumNumberOfRepairers) {
                var newName = 'repairer' + Game.time;
                body = createWorkerBody(totalEnergyAvailable);
                spawn.spawnCreep(body, newName, {memory: {role: 'repairer', working: false, homeroom: currentRoomName}});
            }
            //Create a WallRepairer with all available Energy
            else if(numberOfWallRepairers < minimumNumberOfWallRepairers) {
                var newName = 'wallRepairer' + Game.time;
                body = createWorkerBody(totalEnergyAvailable);
                spawn.spawnCreep(body, newName, {memory: {role: 'wallRepairer', working: false, homeroom: currentRoomName}});
            }
			//Create a RampRepairer with all available Energy
            else if(numberOfRampRepairers < minimumNumberOfRampRepairers) {
                var newName = 'rampRepairer' + Game.time;
                body = createWorkerBody(totalEnergyAvailable);
                spawn.spawnCreep(body, newName, {memory: {role: 'rampRepairer', working: false, homeroom: currentRoomName}});
            }
            //Create a Farvester1 with all available Energy
            else if(numberOfFarvesters1 < minimumNumberOfFarvesters1) {
                var newName = 'farvester1' + Game.time;
                body = createWorkerBody(totalEnergyAvailable);
                spawn.spawnCreep(body, newName, {memory: {role: 'farvester1', working: false, homeroom: currentRoomName}});
            }
            //Create a Farvester2 with all available Energy
            else if(numberOfFarvesters2 < minimumNumberOfFarvesters2) {
                var newName = 'farvester2' + Game.time;
                body = createWorkerBody(totalEnergyAvailable);
                spawn.spawnCreep(body, newName, {memory: {role: 'farvester2', working: false, homeroom: currentRoomName}});
            }
            //Create a Farvester3 with all available Energy
            else if(numberOfFarvesters3 < minimumNumberOfFarvesters3) {
                var newName = 'farvester3' + Game.time;
                body = createWorkerBody(totalEnergyAvailable);
                spawn.spawnCreep(body, newName, {memory: {role: 'farvester3', working: false, homeroom: currentRoomName}});
            }
            //Create a Farvester4 with all available Energy
            else if(numberOfFarvesters4 < minimumNumberOfFarvesters4) {
                var newName = 'farvester4' + Game.time;
                body = createWorkerBody(totalEnergyAvailable);
                spawn.spawnCreep(body, newName, {memory: {role: 'farvester4', working: false, homeroom: currentRoomName}});
            }
            //Create a Farvester4 with all available Energy
            else if(numberOfHoarders < minimumNumberOfHoarders) {
                var newName = 'hoarder' + Game.time;
                body = createWorkerBody(totalEnergyAvailable);
                spawn.spawnCreep(body, newName, {memory: {role: 'hoarder', working: false, homeroom: currentRoomName}});
            }
        }
    }

};
module.exports = structureSpawn;

function createWorkerBody(totalEnergyAvailable){

    var numberOfParts = Math.floor(totalEnergyAvailable / 200);
    var body = [];
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE);
    }

    // create creep with the created body and the given role
    return (body);
}

function createMinerBody(totalEnergyAvailable){

    var numberOfParts = Math.floor(totalEnergyAvailable / 550);
    var body = [];
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE);
    }

    // create creep with the created body and the given role
    return (body);
}