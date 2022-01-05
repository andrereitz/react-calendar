import { useEffect, useState, useLayoutEffect } from 'react';
import { groupBy } from 'lodash';
import { addMonths } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { MONTHS as MONTHS_NAMES, WEEK_DAYS } from 'constants/calendar';
import { EVENT_VIEW_ACTIONS } from 'constants/eventView';
import { formatFromUnix } from 'helpers/formatters';

import { CalendarStyles, TestDatesStyles, HeaderStyles, WeekdaysStyles, DaysStyles } from './Calendar.styles';

import { Button, ActionBar } from 'components'

import { useDispatch, useSelector } from 'react-redux';
import { selectEvents } from 'store/Events/Events.selectors';
import { changeView } from 'store/EventsUi/EventsUi.actions';

import { getDateInfo, getCalendarPlaceholders } from 'utils/date';

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

    function handleViewToggle(e, show, mode, event, edittingDay) {
        e.stopPropagation();

        const payload = {
            show,
            mode,
            id: event
        }
        
        if(edittingDay) {
            const { year, month } = getDateInfo(currentDate)
            const dateString = `${month} ${edittingDay} ${year}`;
            
            payload.edittingDate = dateString;
        }

        dispatch(changeView(payload));
    }

    function navigateMonth(order) {
        let targetDate;
        if(order === 'next') {
            targetDate = addMonths(currentDate, 1);
        } else {
            targetDate = addMonths(currentDate, -1);
        }

        setCurrentDate(new Date(targetDate))
    }

    useLayoutEffect(() => {
        const { year, month, daysOnMonth, daysOfMonth } = getDateInfo(currentDate);
        const { placeholderStart, placeholderEnd } = getCalendarPlaceholders(currentDate);

        setCalendarData({year, month, daysOnMonth, daysOfMonth, placeholderStart, placeholderEnd})
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
                        {/* <Button click={(e) => handleViewToggle(e, true, EVENT_VIEW_ACTIONS.new, null)}>New Reminder</Button> */}
                        <Button click={() => navigateMonth('prev')}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </Button>
                        <span>{MONTHS_NAMES[calendarData.month - 1]} {calendarData.year}</span>
                        <Button click={() => navigateMonth('next')}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Button>
                    </HeaderStyles>
                    <WeekdaysStyles className="weekdays">
                        {WEEK_DAYS.map( day => (
                            <span key={day}>{day}</span>
                        ))}
                    </WeekdaysStyles>
                    <DaysStyles className="days">
                        {calendarData.placeholderStart.map( (_, i) => (
                            <div key={`ph-top-${i}`} className="placeholder"></div>
                        ))}
                        {calendarData.daysOfMonth.map( day => (
                            <div key={`day-${day}`} data-day={day} onClick={(e) => handleViewToggle(e, true, EVENT_VIEW_ACTIONS.new, null, day)}>
                                <ul>
                                    {groupedEvents && Object.keys(groupedEvents).map( (eventUnix, index) => {
                                        if( formatFromUnix(eventUnix, 'M d yyyy') !== `${calendarData.month} ${day} ${calendarData.year}`) return null;

                                        return(
                                            <li key={`${eventUnix}-${index}`}>
                                                {groupedEvents[eventUnix].map( event => {
                                                    return(
                                                        <span 
                                                            onClick={(e) => handleViewToggle(e, true, EVENT_VIEW_ACTIONS.view, event.id)} 
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
                        {calendarData.placeholderEnd.map( (_, i) => (
                            <div key={`ph-bottom-${i}`} className="placeholder"></div>
                        ))}
                    </DaysStyles>
                </>
            )}
            <ActionBar />
        </CalendarStyles>
    )
}