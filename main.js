// import modules

var garbageCollection = require("garbage.collection");
var runRoles = require("run.roles");
var structureSpawn = require('structure.spawn');
var towerDefense = require("structure.tower");
var lastResort = require("room.failSafe");
var debug = require("debug.code");
var countCreeps = require("count.creeps");

module.exports.loop = function () {
    
    //Debugging High CPU usage
    //var cpuUsed = Game.cpu.getUsed();
    //console.log(" " + cpuUsed);
    
    debug.run("initial load");
    
    garbageCollection.collectGarbage();
    
    debug.run("garbage");
    
    towerDefense.defendMyRoom();
    
    debug.run("tower");
    
    structureSpawn.createCreeps();
    
    debug.run("spawn");
    
    runRoles.run();
    
    debug.run("roles ");
    
    countCreeps.run();
    console.log();
    
    lastResort.saveMyRoom();


};