const textUtils = require('../files/text.utils');
const validationUtils = require('../files/validation.utils');

class TimeUtils {

    constructor() { }

    // This method returns the current date without spaces.
    getCurrentDateNoSpaces() {
        const date = new Date();
        return [date.getFullYear(), (textUtils.addLeadingZero(date.getMonth() + 1)), textUtils.addLeadingZero(date.getDate())].join('');
    }

    getDisplayDateTime(dateTime) {
        if (!validationUtils.isValidDate(dateTime)) {
            return '';
        }
        return dateTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }

    getDifferenceTimeBetweenDates(data) {
        const { startDateTime, endDateTime } = data;
        if (!validationUtils.isValidDate(startDateTime) || !validationUtils.isValidDate(endDateTime)) {
            return null;
        }

        // Get the total time.
        const totalTime = textUtils.getPositiveNumber(endDateTime - startDateTime);
        // Get total seconds between the times.
        let delta = totalTime / 1000;
        // Calculate (and subtract) whole days.
        const days = textUtils.getFloorPositiveNumber(delta / 86400);
        delta -= days * 86400;
        // Calculate (and subtract) whole hours.
        const hours = textUtils.getFloorPositiveNumber((delta / 3600) % 24);
        delta -= hours * 3600;
        // Calculate (and subtract) whole minutes.
        const minutes = textUtils.getFloorPositiveNumber((delta / 60) % 60);
        delta -= minutes * 60;
        // What's left is seconds.
        // In theory the modulus is not required.
        const seconds = textUtils.getFloorPositiveNumber(delta % 60);
        return `${days}.${hours}:${minutes}:${seconds}`;
    }
}

const timeUtils = new TimeUtils();
module.exports = timeUtils;