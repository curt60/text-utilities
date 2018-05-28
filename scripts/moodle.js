function moodleTransform() {
    //test time alert functionality
    
    // var myWindow = function() {
    //     var myWindow = window.open("", "", "width=200, height=100");   // Opens a new window
    //     myWindow.document.write("<p>A new window!</p>");         // Some text in the new window
    //     myWindow.focus();  
    // }
    
    // setTimeout(myWindow, 3000);
        
    //store inputs
    var noDims = parseInt(document.getElementById("no-dims").value);
    var delim = document.getElementById("delimitter").value || 'xxxxxx'; //default to unlikely delimitter value if one not entered
    var header = document.getElementById("headings").value;
    var copyText = document.getElementById("text-input").value;

    //split headings into columns
    header = header.toLowerCase().split('\t'); 
    header[noDims] = header[noDims].split(delim);

    //split lines
    var textLines = copyText.toLowerCase().split('\n');
    
    //split first row into columns
    textLines[0] = textLines[0].split('\t');
    
    //further split assignment columns into categories
    for (let i = noDims; i < textLines[0].length; i++) {
        textLines[0][i] = textLines[0][i].split(delim);
    }
    //split rest of rows into columns
    for (let i = 1; i < textLines.length; i++) {
        textLines[i] = textLines[i].split('\t');
    }
    
    //trim whitepace from first row
    for (let i = 0; i < textLines[0].length; i++) {
        if (i < noDims) {
            textLines[0][i] = textLines[0][i].trim();
        }
        else {
            for (let j = 0; j < textLines[0][i].length; j++) {
                textLines[0][i][j] = textLines[0][i][j].trim();
            }    
        }
    }

    //trim whitepace from remaining rows
    for (let i = 1; i < textLines.length; i++) {
        for (let j = 0; j < textLines[i].length; j++) {
            textLines[i][j] = textLines[i][j].trim();
        }
    }


    //replace '-' with '' in grade section
    for (let i = 1; i < textLines.length; i++) {
        for (let j = noDims; j < textLines[i].length; j++) {
            textLines[i][j] = textLines[i][j].replace(/-/g, '');
        }
    }

    //start output
    var outputText = "";
    
    //push header row to output
    for (let i = 0; i < header.length; i++) {
        if (i === noDims) {
            for (let j = 0; j < header[i].length; j++) {
                outputText += header[i][j] + '\t';
            }
        }
        else {
            outputText += header[i];
            if (i < header.length - 1) outputText += '\t';
        }
    }

    //push data to output
    for (let row = 1; row < textLines.length; row++) {
        //loop for each row in output
        //skip incomplete rows
        if (textLines[row].length < textLines[0].length) break;
        for (let col = noDims; col < textLines[0].length; col++) {
            outputText += '\n';
            //write all dimensions
            for (let dim = 0; dim < noDims; dim++) {
                outputText += textLines[row][dim] + '\t';
            }
            //write all assignment categories
            for (let cat = 0; cat < header[noDims].length; cat++) {
                outputText += textLines[0][col][cat] || '';
                outputText += '\t';
            }
            outputText += textLines[row][col];
        }
        
    }
    document.getElementById("text-output").value = outputText;
}

function reset() {
    document.getElementById("text-input").value = "";
    document.getElementById("text-output").value = "";
}