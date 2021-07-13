

function BinaryClock(date = new Date(), canvas, options = { showDateTimeLabel: true, autoUpdate: true, type: 'web' }) {
    this.binary_series = [32, 16, 8, 4, 2, 1];
    if (options) {
        if (options.showDateTimeLabel === undefined)
            options.showDateTimeLabel = true;
        if (options.autoUpdate === undefined)
            options.autoUpdate = true;
        if (options.type === undefined)
            if (typeof process === 'undefined') 
                options.type = 'web';
            else
                options.type = 'node';
    }

    if (typeof process === 'undefined') 
        options.type = 'web';
    else
        options.type = 'node';

    if (options.type === 'node') {
        options.readline = require('readline');
    }

    this.prepareData = function (date, canvas, options) {
        let hoursData = this.getBinaryFormat(date.getHours());
        let minuteData = this.getBinaryFormat(date.getMinutes());
        let secondsData = this.getBinaryFormat(date.getSeconds());
        if (options.type === 'web') {
            canvas.setAttribute('height', options.showDateTimeLabel ? 110 : 80);
            canvas.setAttribute('width', 160);
        }
        this.displayData([hoursData, minuteData, secondsData], canvas, options);
        if (options.showDateTimeLabel) {
            this.showDateTimeLabel(date, canvas, options);
        }
    };

    this.getBinaryFormat = function (num) {
        let binary_format = [0, 0, 0, 0, 0, 0];
        let selectedIndices = [];
        let selectedTotal = 0;
        for (let digit of this.binary_series) {
            if (digit <= num) {
                selectedTotal += digit;
                if (selectedTotal <= num) {
                    selectedIndices.push(this.binary_series.indexOf(digit));
                } else {
                    selectedTotal -= digit;
                }
            }
        }
        for (let ind of selectedIndices) {
            binary_format[ind] = 1;
        }
        return binary_format;
    };

    this.displayData = function (timeDataBinaryFormat, canvas, options) {
        if (options.type === 'web') {
            if (!canvas.getContext) 
                throw new Error('Canvas not supported in this browser');
            let ctx = canvas.getContext('2d');
            this.addToScreen(ctx, timeDataBinaryFormat, options);
        } else {
            this.addToConsole(canvas, timeDataBinaryFormat, options);
        }
    };

    this.addToScreen = function (ctx, bin_rows, options) {
        for (let [rowInd, bin_nums] of bin_rows.entries()) {
            for (let [numInd, digit] of bin_nums.entries()) {
                ctx.beginPath();
                ctx.moveTo(numInd * 25 + 15, rowInd * 25 + 15);
                ctx.arc(numInd * 25 + 15, rowInd * 25 + 15, 8, 0, Math.PI * 2, true);
                ctx.closePath();
                digit == 0 ? ctx.stroke() : ctx.fill();
            }
        }
    };

    this.addToConsole = function (canvas, bin_rows, options) {
        process.stdout.write('\n\n\r');
        for (let [rowInd, bin_nums] of bin_rows.entries()) {
            let row = '';
            for (let [numInd, digit] of bin_nums.entries()) {
                row += (digit === 0 ? '  ⚪' : '  ⚫');
            }
            process.stdout.write(row + '\n\n\r');
        }
    }

    this.showDateTimeLabel = function (date, canvas, options) {
        if (options.type === 'web') {
            let ctx = canvas.getContext('2d');
            ctx.font = '15px serif';
            ctx.fillText(this.padWithZero(date.getHours()) + ':' + this.padWithZero(date.getMinutes()) + ':' + this.padWithZero(date.getSeconds()), 43, 93);
            ctx.closePath();
        } else {
            process.stdout.write('         ' + this.padWithZero(date.getHours()) + ':' + this.padWithZero(date.getMinutes()) + ':' + this.padWithZero(date.getSeconds()) + '\n\n\n');
        }
    };

    this.padWithZero = function (num) {
        return num > 9 ? num.toString() : '0' + num;
    };

    this.prepareData(date, canvas, options);
    if (options.autoUpdate) {
        const dis = this;
        setInterval(() => dis.prepareData(new Date(), canvas, options), 1000);
    }
}


if (typeof process !== 'undefined')
    exports.BinaryClock = BinaryClock;
