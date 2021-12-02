import { useEffect, useState, useLayoutEffect } from 'react';
import { MONTHS as MONTHS_NAMES, WEEK_DAYS } from 'constants/calendar';

import { CalendarStyles, TestDatesStyles, HeaderStyles, WeekdaysStyles, DaysStyles } from './Calendar.styles';

import { useDispatch, useSelector } from 'react-redux';

import { addEvent } from 'store/Events/Events.actions';

import { selectEvents } from 'store/Events/Events.selectors';

export function Calendar({ date }) {
    const [currentDate, setCurrentDate] = useState(date ? new Date(date) : new Date());
    const [calendarData, setCalendarData] = useState(null);
    const dispatch = useDispatch();
    const events = useSelector(selectEvents);

    console.log(events);

    useEffect(() => {
        dispatch(addEvent({ id: 2, date: '10 11 2021', title: 'test 1', color: 'orange' }))
        dispatch(addEvent({ id: 3, date: '15 11 2021', title: 'test 2', color: 'blue' }))
        dispatch(addEvent({ id: 4, date: '15 11 2021', title: 'test 2', color: 'blue' }))
        dispatch(addEvent({ id: 5, date: '15 3 2016', title: 'test 3', color: 'gray' }))
    }, [])

    function getBoardControl(weekday, days) {
        if(weekday === 5 && days === 31) return 42
        if(weekday === 6) return 42;

        return 35;
    }

    useLayoutEffect(() => {
        const year = currentDate.getYear() + 1900;
        const month = currentDate.getMonth();
        const numDays = new Date(year, month + 1, 0).getDate();
        const days = new Array(numDays).fill(1).map( (d, i) => i + 1);

        const placeholderNumberStart = new Date(year, month, 1).getDay();
        const boardControl = getBoardControl(placeholderNumberStart, numDays);
        const placeholderNumberEnd = boardControl - (days[days.length - 1] + placeholderNumberStart);

        const placeholderStart = new Array(placeholderNumberStart).fill(0);
        const placeholderEnd = placeholderNumberEnd > 0 ? new Array(placeholderNumberEnd).fill(0) : [];

        setCalendarData({year, month, numDays, days, placeholderStart, placeholderEnd})
    }, [currentDate])

    useLayoutEffect(() => {
        if(date) {
            setCurrentDate(new Date(date));
        }
    }, [date])

    return(
        <CalendarStyles>
            {calendarData && (
                <>
                    <TestDatesStyles>
                        <h2>Test Dates</h2>
                        <button onClick={() => setCurrentDate(new Date()) }>Today</button>
                        <button onClick={() => setCurrentDate(new Date('Feb 25 2022 15:30')) }>Change to Feb 2022</button>
                        <button onClick={() => setCurrentDate(new Date('Mar 1 2020')) }>Change to Mar 2020</button>
                        <button onClick={() => setCurrentDate(new Date('Dec 2018')) }>Change to Dec 2018</button>
                        <button onClick={() => setCurrentDate(new Date('Apr 2016')) }>Change to Apr 2016</button>
                    </TestDatesStyles>
                    <HeaderStyles>
                        {MONTHS_NAMES[calendarData.month]} {calendarData.year}
                    </HeaderStyles>
                    <WeekdaysStyles className="weekdays">
                        {WEEK_DAYS.map( day => (
                            <span key={day}>{day}</span>
                        ))}
                    </WeekdaysStyles>
                    <DaysStyles className="days">
                        {calendarData && calendarData.placeholderStart.map( (_, i) => (
                            <span key={`ph-top-${i}`} className="placeholder"></span>
                        ))}
                        {calendarData && calendarData.days.map( day => (
                            <span key={`day-${day}`} data-day={day}>
                                <ul className="events">
                                    {events.map( event => {
                                        if(event.date === `${day} ${calendarData.month} ${calendarData.year}`) {
                                           return (<li key={`event-${event.id}`} style={{ background: event.color }}>{event.title}</li>);
                                        }
                                    })}
                                </ul>
                            </span>
                        ))}
                        {calendarData && calendarData.placeholderEnd.map( (_, i) => (
                            <span key={`ph-bottom-${i}`} className="placeholder"></span>
                        ))}
                    </DaysStyles>
                </>
            )}
        </CalendarStyles>
    )
}