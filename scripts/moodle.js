function moodleTransform() {
    //store inputs
    var header = document.getElementById("headings").value;
    var noDims = 2; //add input field
    var delim = document.getElementById("delimitter").value;
    var copyText = document.getElementById("text-input").value;

    //split headings into columns
    var headerCols = header.split('\t'); 
        for (i = 0; i < headerCols.length; i++) {
            headerCols[i] = headerCols[i].split(delim);
        }

    //determine column structure headings input
     var noCols = []
     for (let i = 0; i < headerCols.length; i++) {
         noCols[i] = headerCols[i].length;
     }
  
    //clean up text before processing
    copyText = copyText.replace(/\t-/g, '\t').toLowerCase();

    //split lines
    var textLines = copyText.split('\n');
    
     //split columns
    for (let i = 0; i < textLines.length; i++) {
        textLines[i] = textLines[i].split('\t');
        for (j = 0; j < textLines[i].length; j++) {
            textLines[i][j] = textLines[i][j].split(delim);
        }
    }
 
    //trim whitepace
    for (let i = 0; i < textLines.length; i++) {
        for (let j = 0; j < textLines[i].length; j++) {
            for (let k = 0; k < textLines[i][j].length; k++) {
                textLines[i][j][k] = textLines[i][j][k].trim();
            }
        }
    }

    //start output
    var outputText = "";
    
    //push header row to output
    for (let i = 0; i < noCols.length; i++) {
        for (let j = 0; j < noCols[i]; j++) {
            outputText += headerCols[i][j] + '\t';
        } 
    }
    
    //push data to output
    for (let row = 1; row < textLines.length; row++) {
        //loop for each row in output
        for (let col = noCols.length - noDims; col < noCols.length; col++) {
            outputText += '\n';
            //write all dimensions
            for (let dim = 0; dim < noDims; dim++) {
                outputText += textLines[row][dim][0] + '\t';
            }
            //write all assignment categories
            for (let cat = 0; cat < noCols[col]; cat++) {
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