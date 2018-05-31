//test time alert functionality

var expWindow = function() {
    //var expWindow = window.open("timer-pop.html", "_blank", "width=400, height=200, menubar=no, resizeable=no, scrollbar=no, status=no, title=no, top=200px, left=400px");   // Opens a new window
    //expWindow.focus();
    
    var notificationOptions = {
        body: "Take a break!",
        icon: "./favicon.png",
        badge: "./favicon.png",
        image: "./images/favicon_128x128.png",
        requireInteraction: true
    }
    var expNotification = new Notification("Text Utilities", notificationOptions);  
    
    expNotification.onclick = function(event){
        event.preventDefault();
        this.close();

    }


}

var startTimer = function(mins) {
    if (mins == 30) document.getElementById("countdown").innerHTML = "0 hrs 29 mins";
    else if (mins == 60) document.getElementById("countdown").innerHTML = "0 hrs 59 mins";
    else if (mins == 120) document.getElementById("countdown").innerHTML = "1 hrs 59 mins";
    else document.getElementById("countdown").innerHTML = "Timer Started";
    
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

