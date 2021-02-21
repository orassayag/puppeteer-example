const { table } = require('table');
const colorUtils = require('../files/color.utils');
const textUtils = require('../files/text.utils');
const validationUtils = require('../files/validation.utils');

class LogUtils {

    constructor() { }

    log(message) {
        console.log(message);
    }

    logStatus(status, object) {
        if (!status) {
            return;
        }
        this.log(textUtils.setLogStatus(status));
        if (object) {
            this.log(object);
        }
    }

    logColorStatus(data) {
        const { status, color } = data;
        if (!status || !color) {
            return '';
        }
        this.log(colorUtils.createColorMessage({
            message: textUtils.setLogStatus(status),
            color: color
        }));
    }

    logTableData(data) {
        const { titles, tableData } = data;
        if (!validationUtils.isExists(titles) || !validationUtils.isExists(tableData)) {
            return '';
        }
        const resultsData = [titles];
        for (let i = 0, length = tableData.length; i < length; i++) {
            resultsData.push([...tableData[i]]);
        }
        this.log(table(resultsData));
    }

    logProgress(data) {
        const { progressData, percentage } = data;
        const keys = Object.keys(progressData);
        let result = percentage ? `${percentage} | ` : '';
        for (let i = 0, length = keys.length; i < length; i++) {
            const value = progressData[keys[i]];
            const displayValue = validationUtils.isValidNumber(value) ? textUtils.getNumberWithCommas(value) : value;
            result += `${keys[i]}: ${displayValue} | `;
        }
        result = textUtils.removeLastCharacters({
            value: result,
            charactersCount: 3
        });
        process.stdout.clearLine();
        process.stdout.write(`${textUtils.setLogStatus(result)}\r`);
    }

    logSpace() {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    }

    logNewLine() {
        process.stdout.write('\n\r');
    }

    logSummaryFile(fileSummaryData) {
        let fileData = '';
        const maximumCharacters = Math.max(...(fileSummaryData.map(e => e[0].length))) + 5;
        for (let i = 0, length = fileSummaryData.length; i < length; i++) {
            const itemData = fileSummaryData[i];
            fileData += `${itemData[0]}:${new Array(maximumCharacters - itemData[0].length).join(' ')}${itemData[1]} (${itemData[2]})\n`;
        }
        fileData = textUtils.removeLastCharacters({
            value: fileData,
            charactersCount: 1
        });
        return fileData;
    }
}

const logUtils = new LogUtils();
module.exports = logUtils;