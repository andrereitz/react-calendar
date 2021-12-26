import { getDateInfo, getCalendarPlaceholders, getSquaresNumber } from './date';

describe('utils - Date', () => {
    test('getDateInfo date destructuring is correct', () => {
        var daysArr = new Array(31).fill(0).map((d, i) => i + 1);
        
        expect(getDateInfo('25 Dec 2021')).toEqual({
            year: 2021,
            month: 12,
            daysOnMonth: 31,
            daysOfMonth: daysArr,
            firstWeekday: 3
        })
    })

    test('getCalendarPlaceholders returns the correct placeholders', () => {
        expect(getCalendarPlaceholders('25 Dec 2021')).toEqual({
            placeholderStart: [0, 0, 0],
            placeholderEnd: [0]
        })
    })

    test('getSquaresNumber returns the correct number of calendar squares for big month', () => {
        expect(getSquaresNumber(5, 31)).toBe(42)
    })

    test('getSquaresNumber returns the correct number of calendar squares for small month', () => {
        expect(getSquaresNumber(3, 31)).toBe(35)
    })
})