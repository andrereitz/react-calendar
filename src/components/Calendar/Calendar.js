import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { format, fromUnixTime } from 'date-fns';
import {groupBy} from 'lodash';
import { MONTHS as MONTHS_NAMES, WEEK_DAYS } from 'constants/calendar';

import { CalendarStyles, TestDatesStyles, HeaderStyles, WeekdaysStyles, DaysStyles } from './Calendar.styles';

import { useDispatch, useSelector } from 'react-redux';

import { addEvent } from 'store/Events/Events.actions';

import { selectEvents } from 'store/Events/Events.selectors';

export function Calendar({ date }) {
    const [currentDate, setCurrentDate] = useState(date ? new Date(date) : new Date());
    const [calendarData, setCalendarData] = useState(null);
    const [groupedEvents, setGroupedEvents] = useState(null);
    const renderedRef = useRef([]);
    const dispatch = useDispatch();
    const events = useSelector(selectEvents);

    console.log(events);

    useEffect(() => {
        // dispatch(addEvent({ id: 2, date: '10 11 2021', unix: '1638457510957', title: 'test 2', color: 'orange' }))
        // dispatch(addEvent({ id: 2, date: '10 11 2021', unix: '1638457510957', title: 'test 2.5', color: 'purple' }))
        // dispatch(addEvent({ id: 3, date: '15 11 2021', unix: '1638458188824', title: 'test 3', color: 'blue' }))
        // dispatch(addEvent({ id: 4, date: '15 11 2021', unix: '1638457669938', title: 'test 4', color: 'blue' }))
        // dispatch(addEvent({ id: 5, date: '15 3 2016', unix: '1638457682658', title: 'test 5', color: 'gray' }))
    }, [])

    useEffect(() => {
        console.log(events.sort((prevT, currT) => prevT > currT))
        console.log('### grouped', groupBy(events, 'unix'), '### events', events)
        const sorted = events.sort((prevT, currT) => prevT.unix - currT.unix);
        setGroupedEvents( groupBy(sorted, 'unix'));
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

        setCalendarData({year, month: month + 1, numDays, days, placeholderStart, placeholderEnd})
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
                            <div key={`ph-top-${i}`} className="placeholder"></div>
                        ))}
                        {calendarData && calendarData.days.map( day => (
                            <div key={`day-${day}`} data-day={day}>
                                <ul>
                                    {groupedEvents && Object.keys(groupedEvents).map( (eventUnix, index) => {
                                        if( format(fromUnixTime(eventUnix / 1000), 'dd M yyyy') !== `${day} ${calendarData.month} ${calendarData.year}`) return;

                                        return(
                                            <li key={`${eventUnix}-${index}`}>
                                                {groupedEvents[eventUnix].map( event => {
                                                    return(
                                                        <span key={event.id} style={{ background: event.color }}>
                                                            {/* {format(fromUnixTime(event.unix / 1000), 'dd/M/Y hh:mm')} */}
                                                            {event.title} 
                                                        </span>
                                                    )
                                                })}
                                            </li>
                                        )
                                    }
                                    )}
                                </ul>
                            </div>
                        ))}
                        {calendarData && calendarData.placeholderEnd.map( (_, i) => (
                            <div key={`ph-bottom-${i}`} className="placeholder"></div>
                        ))}
                    </DaysStyles>
                </>
            )}
        </CalendarStyles>
    )
}