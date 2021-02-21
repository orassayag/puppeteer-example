const url = require('url');
const validationUtils = require('../files/validation.utils');

class TextUtils {

    constructor() {
        // ToDo: Move to regex utils.
        this.englishLettersRegex = /^[a-zA-Z\\-]+$/;
        this.URLAddressRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        this.emailAddressesRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
        this.numberCommasRegex = /\B(?=(\d{3})+(?!\d))/g;
        this.bytes = 1024;
        this.sizesList = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    }

    // This method fetch for all email addresses within given text data.
    getEmailAddresses(data) {
        if (!validationUtils.isExists(data)) {
            return [];
        }
        // ToDo: Move to regex utils.
        return data.toString().match(this.emailAddressesRegex);
    }

    getURLAddresses(data) {
        if (!validationUtils.isExists(data)) {
            return [];
        }
        // ToDo: Move to regex utils.
        return data.toString().match(this.URLAddressRegex);
    }

    // This method convert a given number to display comma number.
    getNumberWithCommas(number) {
        if (!validationUtils.isValidNumber(number)) {
            return '';
        }
        // ToDo: Move to regex utils.
        return number.toString().replace(this.numberCommasRegex, ',');
    }

    // This method convert bytes number to megabyte display number.
    getFileSizeDisplay(bytes) {
        if (!validationUtils.isValidNumber(bytes)) {
            return null;
        }

        if (bytes === 0) {
            return '0 Bytes';
        }
        const i = Math.floor(Math.log(bytes) / Math.log(this.bytes));
        const result = `${parseFloat((bytes / Math.pow(this.bytes, i)).toFixed(2))}${this.sizesList[i]}`;
        return `${result} (${this.getNumberWithCommas(bytes)} Bytes)`;
    }

    // This method creates a file name.
    createFileName(data) {
        const { fileName, fileKeyName, fileTXTName, isMBOX } = data;
        if (!fileName) {
            return '';
        }
        return `${fileName}${fileKeyName ? `_${fileKeyName}` : ''}${fileTXTName !== null ? `_${fileTXTName}` : ''}${isMBOX ? '' : '.txt'}`;
    }

    removeLastCharacters(data) {
        const { value, charactersCount } = data;
        if (!value || !validationUtils.isValidNumber(charactersCount)) {
            return '';
        }
        return value.substring(0, value.length - charactersCount);
    }

    // This method add leading 0 if needed.
    addLeadingZero(number) {
        if (!validationUtils.isValidNumber(number)) {
            return '';
        }
        return number < 10 ? `0${number}` : number;
    }

    verifyCharactersLength(data) {
        const { value, maximumCharactersLength } = data;
        if (!value || !validationUtils.isValidNumber(maximumCharactersLength)) {
            return '';
        }
        return value.length > maximumCharactersLength ? value.substring(0, maximumCharactersLength) : value;
    }

    setLogStatus(status) {
        if (!status) {
            return '';
        }
        return `===${status}===`;
    }

    countDuplicateStrings(list) {
        if (!validationUtils.isExists(list)) {
            return 0;
        }
        return list.filter((item, index) => list.indexOf(item) != index).length;
    }

    calculateParentageDisplay(data) {
        const { partialValue, totalValue } = data;
        if (!validationUtils.isValidNumber(partialValue) || !validationUtils.isValidNumber(totalValue)) {
            return '';
        }
        return `${this.addLeadingZero(((100 * partialValue) / totalValue).toFixed(2))}%`;
    }

    sortAlphabetical(list) {
        if (!validationUtils.isExists(list)) {
            return [];
        }

        return list.sort((a, b) => {
            const nameA = a.toLowerCase(),
                nameB = b.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }

    breakLine(message) {
        if (!message) {
            return null;
        }
        return message.join(',\n');
    }

    getPositiveNumber(number) {
        if (!validationUtils.isValidNumber(number)) {
            return -1;
        }
        return Math.abs(number);
    }

    getFloorNumber(number) {
        if (!validationUtils.isValidNumber(number)) {
            return -1;
        }
        return Math.floor(number);
    }

    getFloorPositiveNumber(number) {
        return this.addLeadingZero(this.getFloorNumber(number));
    }

    getSumProperty(data) {
        const { key, list } = data;
        if (!key || !validationUtils.isExists(list)) {
            return 0;
        }
        return list.reduce((a, b) => a + (b[key] || 0), 0);
    }

    getRandomKeyFromArray(list) {
        if (!validationUtils.isExists(list)) {
            return '';
        }
        return list[Math.floor(Math.random() * list.length)];
    }

    isEnglishKey(key) {
        return this.englishLettersRegex.test(key);
    }

    getDomainFromURLAddress(URLAddress) {
        if (!validationUtils.isExists(URLAddress)) {
            return '';
        }

        let domain = '';
        try {
            domain = url.parse(URLAddress.toLowerCase().trim()).hostname;
        } catch (error) { }

        // Remove the 'www' prefix if exists.
        if (domain && domain.startsWith('www')) {
            domain = domain.split('.').slice(1).join('.');
        }
        return domain;
    }

    getNumberOfNumber(data) {
        const { number1, number2 } = data;
        if (!validationUtils.isValidNumber(number1) || !validationUtils.isValidNumber(number2)) {
            return '';
        }
        return `${textUtils.getNumberWithCommas(number1)}/${textUtils.getNumberWithCommas(number2)}`;
    }

    fixURLAddresses(list) {
        if (!validationUtils.isExists(list)) {
            return list;
        }

        return list.map(URLAddress => {
            // Remove the 'www' prefix if exists.
            if (URLAddress && URLAddress.endsWith('/')) {
                return this.removeLastCharacters({
                    value: URLAddress,
                    charactersCount: 1
                });
            }
            return URLAddress;
        });
    }

    fixEmailAddress(emailAddress) {
        let results = {
            isValid: false,
            emailAddress: null
        };

        if (!emailAddress) {
            return results;
        }

        let index1 = emailAddress.indexOf('?email=');
        if (index1 > -1) {
            emailAddress = emailAddress.substring(index1 + 1, emailAddress.length - (index1 + 1));
        }

        emailAddress = emailAddress.replace('/', '');
        emailAddress = emailAddress.replace('\\', '');
        emailAddress = emailAddress.replace('.co', '.co.il');
        emailAddress = emailAddress.replace('!', '');
        emailAddress = emailAddress.replace('\'', '');
        emailAddress = emailAddress.replace('\'', '');
        emailAddress = emailAddress.replace('?', '');
        emailAddress = emailAddress.replace('.coil', '.co.il');
        emailAddress = emailAddress.replace('.ilm', '.il');
        emailAddress = emailAddress.replace('%', '');
        emailAddress = emailAddress.replace('|', '');
        emailAddress = emailAddress.replace('org.i', 'org.il');
        emailAddress = emailAddress.replace('con', 'com');
        emailAddress = emailAddress.replace('.co.ili', '.co.il');
        emailAddress = emailAddress.replace('.njet', '.net');
        emailAddress = emailAddress.replace('.net.i', '.net.il');
        emailAddress = emailAddress.replace('.met', '.net');
        emailAddress = emailAddress.replace('.co.oil', '.co.il');
        emailAddress = emailAddress.replace('.ill', '.il');
        emailAddress = emailAddress.replace('.co.i', '.co.il');
        emailAddress = emailAddress.replace('.walla.c', '.walla.com');
        emailAddress = emailAddress.replace('.com2', '.com');
        emailAddress = emailAddress.replace('@.', '@');
        emailAddress = emailAddress.replace('.co.ill', '.co.il');
        emailAddress = emailAddress.replace('.walla.co', '.walla.co.il');
        emailAddress = emailAddress.replace('gmail.comm', 'gmail.com');
        emailAddress = emailAddress.replace('gmail.com.il', 'gmail.com');
        emailAddress = emailAddress.replace('.org.ill', '.org.il');
        emailAddress = emailAddress.replace('.gov.i', '.gov.il');
        emailAddress = emailAddress.replace('.walla.cil', '.walla.co.il');
        emailAddress = emailAddress.replace('gmail.co', 'gmail.com');
        emailAddress = emailAddress.replace('mailto%20', '');
        emailAddress = emailAddress.replace('mailto:', '');
        emailAddress = emailAddress.replace('mailto', '');
        emailAddress = emailAddress.replace('@ariel.ac.i', '@ariel.ac.il');
        emailAddress = emailAddress.replace('@nana.co.il', '@nana10.co.il');
        emailAddress = emailAddress.replace('%20', '');
        emailAddress = emailAddress.replace('.muni.i', 'muni.il');
        emailAddress = emailAddress.replace('^', '');
        emailAddress = emailAddress.replace('.netl', '.net');
        emailAddress = emailAddress.replace('.co.il1', '.co.il');
        emailAddress = emailAddress.replace('.comcom', '.com');
        emailAddress = emailAddress.replace('.comm', '.com');
        emailAddress = emailAddress.replace('.co.ill', '.co.il');
        emailAddress = emailAddress.replace('.ill', '.il');
        emailAddress = emailAddress.replace('.co.il.il', '.co.il');
        emailAddress = emailAddress.replace('.co.il.l', '.co.il');
        emailAddress = emailAddress.replace('.com.il', '.com');
        emailAddress = emailAddress.replace('.comn', '.com');
        emailAddress = emailAddress.replace('.co.il.i', '.co.il');
        emailAddress = emailAddress.replace('.co.ilcom', '.com');
        emailAddress = emailAddress.replace('.co.ill', '.co.il');
        emailAddress = emailAddress.replace('emailAddress.biu.ac.i', 'emailAddress.biu.ac.il');
        if (emailAddress.indexOf('=') > -1) {
            emailAddress = emailAddress.split('=')[1];
        }
        if (emailAddress.indexOf('..') > -1) {
            emailAddress = emailAddress.replace('..', '.');
        }
        if (emailAddress.indexOf('@.') > -1) {
            emailAddress = emailAddress.replace('@.', '@');
        }

        if (!validationUtils.isValidEmail(emailAddress)) {
            return results;
        }

        return {
            isValid: true,
            emailAddress: emailAddress
        };
    }
}

const textUtils = new TextUtils();
module.exports = textUtils;