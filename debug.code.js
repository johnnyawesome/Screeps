

module.exports = {
    // a function to run the logic for this role
    run: function (suspect) {
        
        //Debugging High CPU usage
        //var cpuUsed = Game.cpu.getUsed();
        //console.log(" " + cpuUsed);
        
        var cpuUsed = Math.floor(Game.cpu.getUsed());
        console.log(suspect +  " uses " + cpuUsed);

    }
};