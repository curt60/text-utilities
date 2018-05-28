    //test time alert functionality
    
    var myWindow = function() {
        var myWindow = window.open("", "", "width=200, height=100");   // Opens a new window
        myWindow.document.write("<p>A new window!</p>");         // Some text in the new window
        myWindow.focus();  
    }
    
    setTimeout(myWindow, 3000);
