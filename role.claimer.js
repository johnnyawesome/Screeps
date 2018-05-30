module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        // if in target room

        var flagClaim1 = Game.flags.Claim1;

        if (flagClaim1) {
            if (creep.room != flagClaim1.room) {
                creep.moveTo(flagClaim1, {visualizePathStyle: {stroke: '#551A8B', opacity: .8, lineStyle: 'dashed'}});
            }
            else {
                // try to claim controller
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    // move towards the controller
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#551A8B', opacity: .8, lineStyle: 'dashed'}});
                }
            }
        }
        else{
            creep.say("NO FLAG!")
        }
    }
};
