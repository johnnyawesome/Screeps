
module.exports = {
    // a function to run the logic for this role
    run: function (creep) {

        var hostiles = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        var hostileHealers = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, { filter: (s) => (s.getActiveBodyparts(HEAL) > 0) });
        var hostileAttackers = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, { filter: (s) => ( s.getActiveBodyparts(ATTACK) > 0  || s.getActiveBodyparts(RANGED_ATTACK) > 0) });


        if(hostileHealers) {
            creep.say("AttH");
            if (creep.attack(hostileHealers) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostileHealers, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
            }
        }
        else if(hostileAttackers) {
            creep.say("AttA");
            if (creep.attack(hostileAttackers) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostileAttackers, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
            }
        }
        else if(hostiles) {
            creep.say("AttAny");
            if (creep.attack(hostiles) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostiles, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
            }
        }
    }
};