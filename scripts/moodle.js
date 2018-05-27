function moodleTransform() {
    var copyText = document.getElementById("text-input");

    //clean up text before processing
    copyText = copyText.value.replace(/-/g, '').toLowerCase();

    //split lines
    var textLines = copyText.split('\n');
    
    //split columns
    for (let i = 0; i < textLines.length; i++) {
        textLines[i] = textLines[i].split('\t');
    }
    
    //print header row
    outputText = "First Name\tLast Name\tAssignment\tGrade";
    
    //print data
    for (let studentCount = 1; studentCount < textLines.length; studentCount++) {
        for (let assignmentCount = 2; assignmentCount < textLines[studentCount].length; assignmentCount++) {
            outputText = outputText + '\n' + textLines[studentCount][0] + '\t' + textLines[studentCount][1] + '\t' + textLines[0][assignmentCount] + '\t' + textLines[studentCount][assignmentCount];
        }
        
    }
    document.getElementById("text-output").value = outputText;
}

function reset() {
    document.getElementById("text-input").value = "";
    document.getElementById("text-output").value = "";
}