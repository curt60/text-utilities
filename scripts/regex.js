function regValidate() {
    var textInput = document.querySelector("#text-input").value.split("\n");
    var regInput = [];
    var regNodeList = document.querySelectorAll("div#regexInputs > input");
    for (let i = 0; i < regNodeList.length; i++) {
        let regStr = regNodeList[i].value || "(.*)";
        let regObj = new RegExp(regStr, "gi");
        regInput.push(regObj);
    }

    var textOutput = [];
    for (let i = 0; i < textInput.length; i++) {
        let lineOutput = textInput[i];
        for (let j = 0; j < regInput.length; j++) {
            if (textInput[i].match(regInput[j])) {
                lineOutput = regInput[j].exec(textInput[i])[1];
                break;
            }
        }
        textOutput.push(lineOutput);
    }

    var outputStr = "";
    for (let i = 0; i < textOutput.length; i++) {
        outputStr += textOutput[i] + "\n"; 
    }
    document.querySelector("#text-output").value = outputStr;
}
