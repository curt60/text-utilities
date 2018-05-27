function moodleTransform() {
    //store inputs
    const NO_DIMS = document.getElementById("no-dims").value;
    const DELIM = document.getElementById("delimitter").value || 'xxxxxx'; //default to unlikely delimitter value if one not entered
    var header = document.getElementById("headings").value;
    var copyText = document.getElementById("text-input").value;

    //split headings into columns
    header = header.toLowerCase().split('\t'); 
    header[NO_DIMS] = header[NO_DIMS].split(DELIM);

    //clean up text before processing
    copyText = copyText.toLowerCase();
    copyText = copyText.replace(/\t-\t/g, '\t\t');
    copyText = copyText.replace(/\t-\n/g, '\t\n');

    //split lines
    var textLines = copyText.split('\n');
    
    //split first row into columns
    textLines[0] = textLines[0].split('\t');
    
    //further split assignment columns into categories
    for (let i = NO_DIMS; i < textLines[0].length; i++) {
        textLines[0][i] = textLines[0][i].split(DELIM);
    }
    //split rest of rows into columns
    for (let i = 1; i < textLines.length; i++) {
        textLines[i] = textLines[i].split('\t');
    }
    
    //trim whitepace fom first row
    for (let i = 0; i < textLines[0].length; i++) {
        if (i === NO_DIMS) {
            for (let j = 0; j < textLines[0][i].length; j++) {
                textLines[0][i][j] = textLines[0][i][j].trim();
            }
        }
    }

    //start output
    var outputText = "";
    
    //push header row to output
    for (let i = 0; i < header.length; i++) {
        if (i === NO_DIMS) {
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
        for (let col = NO_DIMS; col < textLines[0].length; col++) {
            outputText += '\n';
            //write all dimensions
            for (let dim = 0; dim < NO_DIMS; dim++) {
                outputText += textLines[row][dim] + '\t';
            }
            //write all assignment categories
            for (let cat = 0; cat < header[NO_DIMS].length; cat++) {
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