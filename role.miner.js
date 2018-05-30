module.exports = {
    // a function to run the logic for this role
    run: function (creep) {

        // Find Source by ID saved in the Miner
        var source = Game.getObjectById(creep.memory.mine);
        
        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            // move towards the source
            creep.moveTo(source, {visualizePathStyle: {stroke: '#8B4513', opacity: .8, lineStyle: 'dashed'}});
            creep.say("Mining");
        }
    }
};