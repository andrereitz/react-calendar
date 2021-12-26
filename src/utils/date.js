/**
 * Return destructured data for a date string
 * 
 * @param {String} date Date string 
 * @returns {Object} {year, month, daysOnMonth, daysOfMonth, firstWeekDay}
 */

export function getDateInfo(date) {
    const currentDate = new Date(date);
    const year = currentDate.getYear() + 1900;
    const month = currentDate.getMonth() + 1;
    const daysOnMonth = new Date(year, month, 0).getDate();
    const daysOfMonth = new Array(daysOnMonth).fill(1).map( (d, i) => i + 1);
    const firstWeekday = new Date(year, month - 1, 1).getDay();

    return {
        year,
        month,
        daysOnMonth,
        daysOfMonth,
        firstWeekday
    }
}

/**
 * Get the placeholder arrays to fill days from previous
 * and next month
 * 
 * @param {String} date Date String ex: 25 Dec 2021
 * @returns {Object} placeholderStart, placeholderEnd
 */
export function getCalendarPlaceholders(date) {
    const { daysOnMonth, firstWeekday } = getDateInfo(date);

    const placeholderNumberEnd = getSquaresNumber(firstWeekday, daysOnMonth) - (daysOnMonth + firstWeekday);

    const placeholderStart = new Array(firstWeekday).fill(0);
    const placeholderEnd = placeholderNumberEnd > 0 ? new Array(placeholderNumberEnd).fill(0) : [];

    return {
        placeholderStart,
        placeholderEnd
    }
}

/**
 * Returns how many day squares the calendar should have based on 
 * the first weekday and how many days the month has
 * 
 * @param {Number} weekday The month's first week day
 * @param {Number} days The month's number of days
 * @returns {Number} How many squares the board should have
 */
export function getSquaresNumber(weekday, days) {
    if(weekday === 5 && days === 31) return 42
    if(weekday === 6) return 42;

    return 35;
}