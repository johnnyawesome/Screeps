module.exports = {

    //TOWER CODE
    collectGarbage: function () {
        
        /*
        // Alternate Garbage Collection
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
        */

        // check for memory entries of died creeps by iterating over Memory.creeps
        for (let name in Memory.creeps) {
            // and checking if the creep is still alive
            if (Game.creeps[name] == undefined) {
                // if not, delete the memory entry
                //console.log("A Creep has died")
                delete Memory.creeps[name];
            }
        }
    }
};