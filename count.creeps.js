module.exports = {
    // a function to run the logic for this role
    run: function () {
        
        var totalCreeps = 0;
    
        // for every creep name in Game.creeps
        for (let name in Game.creeps) {
            
            totalCreeps++;
            
            // get the creep object
            //var creep = Game.creeps[name];
 
        }
        console.log("Total Creeps: " + totalCreeps);
        
        
        //FIND HOARDERS!!!!
        // for every creep name in Game.creeps
        for (let name in Game.creeps) {
            
            //console.log(debug.run(name));
            
            // get the creep object
            var creep = Game.creeps[name];

            if (creep.memory.role == 'hoarder') {
                // if creep is harvester, call harvester script
                console.log("HOARDER in " + creep.memory.homeroom);
            }
        }
    }
};