
module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        
        //console.log("CONTROLLERRRRRRRRRRRRRRRRRRRRRRRRRRRR  " + creep.room.controller.sign.username);

        var flagTag1 = Game.flags.Tag1;
        
        if (!flagTag1) creep.say("No Flag!");
        
        //if there's no controller in the room, move to the Tag Flag
        if(!creep.room.controller){
            creep.moveTo(flagTag1, {visualizePathStyle: {stroke: '#FF1493', opacity: .8, lineStyle: 'dashed'}});
        }
        
        //If the controller is already signed, also move to the tag flag
        if(creep.room.controller &&  creep.room.controller.sign && creep.room.controller.sign.username == "Optiminx"){

                    creep.moveTo(flagTag1, {visualizePathStyle: {stroke: '#FF1493', opacity: .8, lineStyle: 'dashed'}});

        }
        
        //If the room is NOT signed yet, sign it!
        else{
            if(creep.room.controller) {
                if(creep.signController(creep.room.controller, "┌∩┐(◣_◢)┌∩┐ 🖕🏻 OPTIMINX WAS HERE 🖕🏻 I 💩SHIT💩 IN THIS ROOM!! ┌∩┐(◣_◢)┌∩┐ 💀OPTIMINX💀" ) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#FF1493', opacity: .8, lineStyle: 'dashed'}});
                }
                else{
                    creep.say("Signed!😎️");
                }
            }
        }
        //Randomcurse
        //var curse = ["Dick!🖕🏻", "Cunt!🖕🏻", "Fuck!🖕🏻", "Balls!🖕🏻", "Shit!🖕🏻", "Trololo🖕🏻", "Asshole!🖕🏻", "Moron!!🖕🏻", "LOLZ!🖕🏻", "Fuck!🖕🏻", "💩", "🖕🏻", "💩", "🖕🏻 YOU!", "🖕🏻 YOU!"]; 
        var curse = ["Dick!🖕🏻", "Cunt!🖕🏻", "Fuck!🖕🏻", "Balls!🖕🏻", "Shit!🖕🏻", "Trololo🖕🏻", "Asshole!🖕🏻", "Moron!!🖕🏻", "LOLZ!🖕🏻", "Fuck!🖕🏻", "💩", "🖕🏻", "💩", "🖕🏻 YOU!", "🖕🏻 YOU!", "💋", "💖", "💕", "👄", "💙", "💚", "💛", "🤘", "💜"];
        var randomCurseNumber = Math.floor((Math.random() * 40) + 1);
        if (randomCurseNumber <= 23) creep.say(curse[randomCurseNumber], "TRUE");
    }
};