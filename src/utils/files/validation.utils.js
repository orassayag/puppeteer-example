const validator = require('validator');

class ValidationUtils {

    constructor() {
        // ToDo: Build a file that will contain all regex expressions,
        // and for each it will have a regular expression tester method.
        // ToDo: Move to regex utils.
        this.URLAddressRegex = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i');
        this.MongoConnectionStringRegex = new RegExp('^(mongodb:\/{2})localhost:(\d*)\/?(.*)');
    }

    // This method checks if a given value is a valid number and returns the result.
    isValidNumber(number) {
        number = Number(number);
        return !isNaN(number) && typeof number == 'number';
    }

    isPositiveNumber(number) {
        if (!this.isValidNumber(number)) {
            return false;
        }
        return Number(number) > 0;
    }

    // This method validates if a given variable is a valid boolean and returns the result.
    isValidBoolean(boolean) {
        return typeof boolean == typeof true;
    }

    isValidDate(dateTime) {
        return dateTime instanceof Date;
    }

    isValidURL(URLAddress) {
        // ToDo: Move to regex utils.
        return this.URLAddressRegex.test(URLAddress);
    }

    isValidMongoConnectionString(mongoConnectionString) {
        // ToDo: Move to regex utils.
        return this.MongoConnectionStringRegex.test(mongoConnectionString);
    }

    isExists(list) {
        return list && list.length > 0;
    }

    isValidEmail(emailAddress) {
        let isValid = true;
        try {
            isValid = validator.isEmail(emailAddress);
        } catch (error) {
            isValid = false;
        }
        return isValid;
    }
}

const validationUtils = new ValidationUtils();
module.exports = validationUtils;