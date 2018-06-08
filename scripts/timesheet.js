function hourCalc() {
    var copyText = document.getElementById("text-input");
    var dayHours = 0;
    var totalHours = 0;
    var lineHours = 0;
    var textLines = copyText.value.split('\n');
    var output = '';
    var details = [];

    for (let i = 0; i < textLines.length; i++) {
        //first line is date
        if (getDate(textLines[i]) && i === 0) {
            output += getDate(textLines[i]) + '\t';
        }
        //date line (not first)
        else if (getDate(textLines[i])) {
            output += dayHours.toFixed(2) + '\t' + printDetails(details) + '\n';
            dayHours = 0;
            details = [];
            output += getDate(textLines[i]) + '\t';
        }
        //detail line
        else {
            lineHours = getHours(textLines[i]);
            dayHours += lineHours;
            totalHours += lineHours;
            if (getDetails(textLines[i])) {
                details.push(getDetails(textLines[i]));
            }
        }
        //last line
        if (i === textLines.length - 1) {
            output += dayHours.toFixed(2) + '\t' + printDetails(details) + '\n\n';
        }
    }
    output += 'Total\t' + totalHours.toFixed(2);
    document.getElementById("text-output").value = output;
}

function getHours(line) {
    var hours = 0;
    var pattHr = /\(\s*(\d{1,2}|\d{1,2}\.\d{1,2})\s*hrs?\s*\)/i;
    var pattMin = /\(\s*(\d{1,2})\s*mins?\s*\)/i;
    if (pattHr.test(line)) {
        hours = parseFloat(pattHr.exec(line)[1]);
    }
    else if (pattMin.test(line)) {
        hours = parseFloat(pattMin.exec(line)[1]/60);
    }
    return hours;
}

function getDate(line) {
    var pattDate = /\w{3}\s*(\d{1,2}\/\d{1,2})/i;
    if (pattDate.test(line)) {
        return pattDate.exec(line)[1];
    }
}

function getDetails(line) {
    var pattDetails = /\(.*?\)\s*(.*)/i;
    if (pattDetails.test(line) && getHours(line)) {
        var detailObj = {hrs:getHours(line), details:pattDetails.exec(line)[1].trim()};
        return detailObj;
    }
}

function printDetails(arr) {
    arr.sort(function(a, b){return b.hrs - a.hrs});
    var detailOut = '';
    for (let i = 0; i < arr.length; i++) {
        detailOut += '(' + arr[i].hrs.toPrecision(1) +') ' + arr[i].details;
        if (i !== arr.length - 1) detailOut += ', ';
    }
    return detailOut;

}