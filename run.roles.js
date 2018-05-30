var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleRampRepairer = require('role.rampRepairer');
var roleFarvester1 = require('role.farvester1');
var roleFarvester2 = require('role.farvester2');
var roleFarvester3 = require('role.farvester3');
var roleFarvester4 = require('role.farvester4');
var roleHoarder = require('role.hoarder');
var roleMiner = require('role.miner');
var roleSupporter = require('role.supporter');
var roleDefender = require('role.defender');
var roleAttacker = require('role.attacker');
var roleRoomOpener = require('role.roomOpener');
var roleWallBreaker = require('role.wallBreaker');
var roleHealer = require('role.healer');
var roleClaimer = require('role.claimer');
var roleTagger = require('role.tagger');

var debug = require("debug.code");

module.exports = {
    // a function to run the logic for this role
    run: function () {
    
        // for every creep name in Game.creeps
        for (let name in Game.creeps) {
            
            //console.log(debug.run(name));
            
            // get the creep object
            var creep = Game.creeps[name];

            if (creep.memory.role == 'harvester') {
                // if creep is harvester, call harvester script
                roleHarvester.run(creep);
            }
            // if creep is upgrader, call upgrader script
            else if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            // if creep is builder, call builder script
            else if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            // if creep is repairer, call repairer script
            else if (creep.memory.role == 'repairer') {
                 roleRepairer.run(creep);
            }
            // if creep is wallRepairer, call wallRepairer script
            else if (creep.memory.role == 'wallRepairer') {
                roleWallRepairer.run(creep);
            }
            // if creep is rampRepairer, call rampRepairer script
            else if (creep.memory.role == 'rampRepairer') {
                roleRampRepairer.run(creep);
            }
            
            // if creep is farvester1, call farvester1 script
            if (creep.memory.role == 'farvester1') {
                roleFarvester1.run(creep);
            }
            // if creep is farvester2, call farvester2 script
            if (creep.memory.role == 'farvester2') {
                roleFarvester2.run(creep);
            }
            // if creep is farvester3, call farvester3 script
            if (creep.memory.role == 'farvester3') {
                roleFarvester3.run(creep);
            }
            // if creep is farvester4, call farvester4 script
            if (creep.memory.role == 'farvester4') {
                roleFarvester4.run(creep);
            }
            // if creep is hoarder, call hoarder script
            if (creep.memory.role == 'hoarder') {
                roleHoarder.run(creep);
            }
            // if creep is miner, call miner script
            if (creep.memory.role == 'miner') {
                roleMiner.run(creep);
            }
            // if creep is defender, call defender script
            if (creep.memory.role == 'defender') {
                roleDefender.run(creep);
            }
            // if creep is attacker, call attacker script
            if (creep.memory.role == 'attacker') {
                roleAttacker.run(creep);
            }
            // if creep is roomOpener, call roomOpener script
            if (creep.memory.role == 'roomOpener') {
                roleRoomOpener.run(creep);
            }
            // if creep is walLBreaker, call walLBreaker script
            if (creep.memory.role == 'wallBreaker') {
                roleWallBreaker.run(creep);
            }
            // if creep is healer, call healer script
            if (creep.memory.role == 'healer') {
                roleHealer.run(creep);
            }
            // if creep is claimer, call defender script
            if (creep.memory.role == 'claimer') {
                roleClaimer.run(creep);
            }
                            // if creep is defender, call defender script
            if (creep.memory.role == 'defender') {
                roleDefender.run(creep);
            }
            // if creep is attacker, call attacker script
            if (creep.memory.role == 'attacker') {
                roleAttacker.run(creep);
            }
            // if creep is roomOpener, call roomOpener script
            if (creep.memory.role == 'roomOpener') {
                roleRoomOpener.run(creep);
            }
            // if creep is wallBreaker, call wallBreaker script
            if (creep.memory.role == 'wallBreaker') {
                roleWallBreaker.run(creep);
            }
            // if creep is healer, call healer script
            if (creep.memory.role == 'healer') {
                roleHealer.run(creep);
            }
            // if creep is tagger, call tagger script
            if (creep.memory.role == 'tagger') {
                roleTagger.run(creep);
            }
            
            //Randomcurse
            //var curse = ["Dick!", "Cunt!", "Fuck!", "Balls!", "Shit!", "Trololololo!", "Asshole!", "Moron!!", "LOLZ!", "Fuck off!"];  
            //var curse = ["Dick!", "Cunt!", "Fuck!", "Balls!", "Shit!", "Trololololo!", "Asshole!", "Moron!!", "LOLZ!", "Fuck off!", "💩", "🖕"];
            var curse = ["Dick!🖕🏻", "Cunt!🖕🏻", "Fuck!🖕🏻", "Balls!🖕🏻", "Shit!🖕🏻", "Trololo", "Asshole!🖕🏻", "Moron!🖕🏻", "LOLZ!🖕🏻", "Fuck!🖕🏻", "💩", "🖕🏻", "💩", "🖕🏻 YOU!", "🖕🏻 YOU!", "💩", "☠️", "❤️", "😋", "🤠", "🤡", "😈", "👽", "💀", "👾", "🤣", "👻", "💋", "🍒", "🚽💩", "🦇", "🤢", "😝", "🍉", "💚", "💛", "🌼", "🦁", "💤", "😰", "🤪", "🐠", "💦", "💨", "🍌", "🐢", "🦅", "💥", "🍓", "🐷", "🐭"];  
            var randomCurseNumber = Math.floor((Math.random() * 1000) + 1);
            if (randomCurseNumber <= 50) creep.say(curse[randomCurseNumber], "TRUE")
            
        }
    }
};