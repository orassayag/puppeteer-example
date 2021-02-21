const validationUtils = require('../files/validation.utils');

class SystemUtils {

    constructor() { }

    async sleep(secondsCount) {
        if (!validationUtils.isValidNumber(secondsCount)) {
            return;
        }
        return new Promise(resolve => setTimeout(resolve, secondsCount * 1000));
    }
}

const systemUtils = new SystemUtils();
module.exports = systemUtils;