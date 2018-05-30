
module.exports = {
    // a function to run the logic for this role
    run: function (creep) {


        var flagAttack1 = Game.flags.Attack1;
        //var woundedCreeps = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        
        if(flagAttack1 != undefined){

            //If we're in the room we want to farm, switch the roomSwitch to TRUE
            if (creep.room == flagAttack1.room) {
                roomSwitch = true;
            }
            //If we're still at home, we have not yet switched rooms, hence FALSE
            else {
                roomSwitch = false;
            }
            
            if (creep.room != flagAttack1.room && roomSwitch == false){
                creep.moveTo(flagAttack1, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
            }
            else{
                healCreeps();
            }
        }
        else{
            healCreeps();
        }

        function healCreeps(){
    
            var woundedCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {filter: function(object) {return object.hits < object.hitsMax;}});
            if(woundedCreep) {
                creep.say("Healing");
                creep.moveTo(woundedCreep, {visualizePathStyle: {stroke: '#ffaa00', opacity: .6, lineStyle: 'dashed'}});
                if(creep.pos.isNearTo(woundedCreep)) {
                    creep.heal(woundedCreep);
                }
                else {
                    creep.rangedHeal(woundedCreep);
                }
            }
        }
    }
};