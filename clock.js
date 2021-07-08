let binary_series = [32, 16, 8, 4, 2, 1];

let binaryClock = function(date = new Date(), canvas = document.getElementById('binary-clock'), options = {showDateTimeLabel: true, autoUpdate: true}) {
    if (options.autoUpdate)
    {
        setInterval(() => prepareData(new Date(), canvas, options), 1000);
    }
    else
        prepareData(date, canvas, options);
}

let prepareData = function(date, canvas, options) {
    let hoursData = getBinaryFormat(date.getHours());
    let minuteData = getBinaryFormat(date.getMinutes());
    let secondsData = getBinaryFormat(date.getSeconds());
    canvas.setAttribute('height', options.showDateTimeLabel ? 110 : 80);
    canvas.setAttribute('width', 160);
    displayData([hoursData, minuteData, secondsData], canvas);
    if (options.showDateTimeLabel) {
        showDateTimeLabel(date, canvas);
    }
}

let getBinaryFormat = function(num) {
    let binary_format = [0, 0, 0, 0, 0, 0];
    let selectedIndices = [];
    let selectedTotal = 0;
    for (let digit of binary_series) {
        if (digit <= num) {
            selectedTotal += digit;
            if (selectedTotal <= num) {
                selectedIndices.push(binary_series.indexOf(digit))
            } else {
                selectedTotal -= digit;
            }
        }
    }
    for (let ind of selectedIndices) {
        binary_format[ind] = 1;
    }
    return binary_format;
}

let displayData = function(timeDataBinaryFormat, canvas) {
    if (!canvas.getContext) {
        throw new Error('Canvas not supported in this browser');
    }
    let ctx = canvas.getContext('2d');
    addToScreen(ctx, timeDataBinaryFormat);
}

let addToScreen = function(ctx, bin_rows) {
    for (let [rowInd, bin_nums] of bin_rows.entries()) {
        for (let [numInd, digit] of bin_nums.entries()) {
            ctx.beginPath();
            ctx.moveTo(numInd * 25 + 15, rowInd * 25 + 15);
            ctx.arc(numInd * 25 + 15, rowInd * 25 + 15, 8, 0, Math.PI * 2, true);
            ctx.closePath();
            digit == 0 ? ctx.stroke() : ctx.fill();
        }
    }
}

let showDateTimeLabel = function(date, canvas) {
    let ctx = canvas.getContext('2d');
    ctx.font = '15px serif';
    ctx.fillText(padWithZero(date.getHours()) + ':' + padWithZero(date.getMinutes()) + ':' + padWithZero(date.getSeconds()), 43, 93);
    ctx.closePath();
}

let padWithZero = function(num) {
    return num > 9 ? num.toString() : '0' + num;
}

