function moodleTransform() {
        
    //store inputs
    var noDims = parseInt(document.getElementById("no-dims").value);
    var noCats = parseInt(document.getElementById("no-cats").value);
    var delim = document.getElementById("delimitter").value || 'xxxxxx'; //default to unlikely delimitter value if one not entered
    var copyText = document.getElementById("text-input").value;

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
    
    //create output header - dimensions
    for (let i = 0; i < noDims; i++) {
        outputText += "dim" + (i + 1) + "\t";
    }
    //create output header - categories
    for (let i = 0; i < noCats; i++) {
        outputText += "cat" + (i + 1) + "\t";
    }
    outputText += "grade";

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
            for (let cat = 0; cat < noCats; cat++) {
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