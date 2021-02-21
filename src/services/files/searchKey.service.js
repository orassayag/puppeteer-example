const { textUtils, validationUtils } = require('../../utils');
const { want, profession, city, email } = require('../../core/lists/searchKeys.list');

class KeyService {

    constructor() { }

    generateSearchKey() {
        // Generate the search key.
        const generateKey = () => {
            let searchKey = '';
            [want, profession, city, email].map(l => {
                searchKey += `${textUtils.getRandomKeyFromArray(l)} `;
            });
            searchKey = textUtils.removeLastCharacters({
                value: searchKey,
                charactersCount: 1
            });
            return searchKey;
        };

        let resultSearchKey = generateKey();

        // Generate the search key for display by reverse only the UTF-8 keys.
        const generateDisplaySearchKey = (searchKey) => {
            let displaySearchKey = '';
            const englishKeys = [];
            const hebrewKeys = [];
            searchKey.split(' ').map(key => {
                if (textUtils.isEnglishKey(key)) {
                    englishKeys.push(key);
                } else {
                    hebrewKeys.push(key.split('').reverse().join(''));
                }
            });
            displaySearchKey = `${validationUtils.isExists(englishKeys) ? `${englishKeys.join(' ')}` : ''} ${hebrewKeys.reverse().join(' ')}`.trim();
            return displaySearchKey;
        };

        let resultDisplaySearchKey = generateDisplaySearchKey(resultSearchKey);
        return {
            searchKey: resultSearchKey,
            displaySearchKey: resultDisplaySearchKey
        };
    }
}

const keyService = new KeyService();
module.exports = keyService;