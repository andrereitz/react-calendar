import { useEffect, useState, useLayoutEffect } from 'react';
import { groupBy } from 'lodash';

import { MONTHS as MONTHS_NAMES, WEEK_DAYS } from 'constants/calendar';
import { EVENT_VIEW_ACTIONS } from 'constants/eventView';
import { formatFromUnix } from 'helpers/formatters';

import { CalendarStyles, TestDatesStyles, HeaderStyles, WeekdaysStyles, DaysStyles } from './Calendar.styles';

import { Button } from 'components'

import { useDispatch, useSelector } from 'react-redux';
import { changeView } from 'store/Events/Events.actions';
import { selectEvents } from 'store/Events/Events.selectors';

export function Calendar({ date }) {
    const [currentDate, setCurrentDate] = useState(date ? new Date(date) : new Date());
    const [calendarData, setCalendarData] = useState(null);
    const [groupedEvents, setGroupedEvents] = useState(null);
    const dispatch = useDispatch();
    const events = useSelector(selectEvents);

    useEffect(() => {
        const sorted = events.sort((prevT, currT) => prevT.unix - currT.unix);
        setGroupedEvents( groupBy(sorted, 'unix'));
    }, [events])

    function getBoardControl(weekday, days) {
        if(weekday === 5 && days === 31) return 42
        if(weekday === 6) return 42;

        return 35;
    }

    function handleViewToggle(show, mode, event) {
        dispatch(changeView({ show, mode, id: event }));
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
    }, [date, events])

    return(
        <CalendarStyles>
            {calendarData && (
                <>
                    <TestDatesStyles>
                        <h2>Test Dates</h2>
                        <Button click={() => setCurrentDate(new Date()) }>Today</Button>
                        <Button click={() => setCurrentDate(new Date('Feb 25 2022 15:30')) } ml={10}>Change to Feb 2022</Button>
                        <Button click={() => setCurrentDate(new Date('Mar 1 2020')) } ml={10}>Change to Mar 2020</Button>
                        <Button click={() => setCurrentDate(new Date('Dec 2018')) } ml={10}>Change to Dec 2018</Button>
                        <Button click={() => setCurrentDate(new Date('Apr 2016')) } ml={10}>Change to Apr 2016</Button>
                    </TestDatesStyles>
                    <HeaderStyles>
                        {MONTHS_NAMES[calendarData.month - 1]} {calendarData.year}
                        <Button click={() => handleViewToggle(true, EVENT_VIEW_ACTIONS.new, null)}>New Reminder</Button>
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
                                        if( formatFromUnix(eventUnix, 'd M yyyy') !== `${day} ${calendarData.month} ${calendarData.year}`) return null;

                                        return(
                                            <li key={`${eventUnix}-${index}`}>
                                                {groupedEvents[eventUnix].map( event => {
                                                    return(
                                                        <span 
                                                            onClick={() => handleViewToggle(true, EVENT_VIEW_ACTIONS.view, event.id)} 
                                                            key={event.id} 
                                                            style={{ background: event.color }}
                                                        >
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