

function BinaryClock(date = new Date(), canvas = document.getElementById('binary-clock'), options = {showDateTimeLabel: true, autoUpdate: true}) {
    this.binary_series = [32, 16, 8, 4, 2, 1];
    if (options) {
        if (options.showDateTimeLabel === undefined) options.showDateTimeLabel = true;
        if (options.autoUpdate === undefined) options.autoUpdate = true;
    }
    this.prepareData = function(date, canvas, options) {
        let hoursData = this.getBinaryFormat(date.getHours());
        let minuteData = this.getBinaryFormat(date.getMinutes());
        let secondsData = this.getBinaryFormat(date.getSeconds());
        canvas.setAttribute('height', options.showDateTimeLabel ? 110 : 80);
        canvas.setAttribute('width', 160);
        this.displayData([hoursData, minuteData, secondsData], canvas);
        if (options.showDateTimeLabel) {
            this.showDateTimeLabel(date, canvas);
        }
    }
    
    this.getBinaryFormat = function(num) {
        let binary_format = [0, 0, 0, 0, 0, 0];
        let selectedIndices = [];
        let selectedTotal = 0;
        for (let digit of this.binary_series) {
            if (digit <= num) {
                selectedTotal += digit;
                if (selectedTotal <= num) {
                    selectedIndices.push(this.binary_series.indexOf(digit))
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
    
    this.displayData = function(timeDataBinaryFormat, canvas) {
        if (!canvas.getContext) {
            throw new Error('Canvas not supported in this browser');
        }
        let ctx = canvas.getContext('2d');
        this.addToScreen(ctx, timeDataBinaryFormat);
    }
    
    this.addToScreen = function(ctx, bin_rows) {
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
    
    this.showDateTimeLabel = function(date, canvas) {
        let ctx = canvas.getContext('2d');
        ctx.font = '15px serif';
        ctx.fillText(this.padWithZero(date.getHours()) + ':' + this.padWithZero(date.getMinutes()) + ':' + this.padWithZero(date.getSeconds()), 43, 93);
        ctx.closePath();
    }
    
    this.padWithZero = function(num) {
        return num > 9 ? num.toString() : '0' + num;
    }

    this.prepareData(date, canvas, options);
    if (options.autoUpdate)
    {
        const dis = this;
        setInterval(() => dis.prepareData(new Date(), canvas, options), 1000);
    }
        
}



