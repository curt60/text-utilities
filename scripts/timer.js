//test time alert functionality

var expWindow = function() {
    var expWindow = window.open("", "", "width=200, height=100");   // Opens a new window
    expWindow.document.write("<p>Time for a break!</p>");         // Some text in the new window
    expWindow.focus();  
}

var startTimer = function(mins) {
    var expTime = new Date().getTime() + (mins * 60 * 1000);
    
    var breakTimer = setInterval(function() {
        var now = new Date().getTime();
        var timeLeft = expTime - now;
        
        //calculate hours, mins, and seconds
        var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Display remaining time
        document.getElementById("countdown").innerHTML = hours + " hr "
            + minutes + " mins ";

        if (timeLeft < 0) {
            clearInterval(breakTimer);
            document.getElementById("countdown").innerHTML = "Time for a break!";
            expWindow();
        }

    }, 1000);
}

