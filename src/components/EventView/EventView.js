import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import DatePicker from 'react-datepicker';
import { format, fromUnixTime } from 'date-fns'

import { EVENT_VIEW_ACTIONS, COLORS } from 'constants/eventView';
import { HOURS } from 'constants/calendar';
import { formatFromUnix } from 'helpers';

import "react-datepicker/dist/react-datepicker.css";
import { EventViewStyles } from './EventView.styles';

import { useDispatch, useSelector } from 'react-redux';
import { changeView, updateEvent } from 'store/Events/Events.actions';
import { selectView, selectEvent } from 'store/Events/Events.selectors';

export function EventView() {
    const [localEvent, setLocalEvent] = useState(null)
    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);
    const [width, setWidth] = useState(null);
    const dateRef = useRef(null);
    const containerRef = useRef(null);
    
    const dispatch = useDispatch();
    const view = useSelector(selectView);
    const event = useSelector(state => selectEvent(state, view.id));

    
    useEffect(() => {
        console.log('### event changed', view, event, localEvent)

    }, [event])

    function handleUpdate(id) {
        dispatch(updateEvent(localEvent));
        dispatch(changeView({ show: true, mode: EVENT_VIEW_ACTIONS.view, id: localEvent.id }));
    }

    function handleEditChange() {
        dispatch(changeView({ show: true, mode: EVENT_VIEW_ACTIONS.edit, id: localEvent.id }));
    }

    function updateDate(date) {
        setLocalEvent( prev => ({...prev, date: format(new Date(date), 'dd M yyyy')}) )
        console.log( format(new Date(date), 'dd M yyyy'))
    }

    useLayoutEffect(() => {
        if(containerRef) {
            setWidth(containerRef.current.clientWidth);
        }
    }, [containerRef]);

    useEffect(() => {
        setLocalEvent(event);
        setTime(formatFromUnix(event.unix, 'hh:mm'))
    }, [event])

    useEffect(() => {
        if(localEvent && time && date) {
            const basicDate = format(new Date(date), 'M dd yyyy');
            const unix = (new Date(`${basicDate} ${time}`)).getTime();
            const calendarDate = format(new Date(date), 'd M yyyy');
            
            setLocalEvent(prev => ({...prev, date: calendarDate, unix }));
        }
    }, [time, date])

    return (
        <EventViewStyles ref={containerRef} width={width}>
            {localEvent && (
                <>
                    <div className="header">
                        <h1>{event && event.title}</h1>
                        <div className="actions">
                            {view.mode === EVENT_VIEW_ACTIONS.view ? (
                                <button className="edit" onClick={() => handleEditChange()}>Edit</button>
                            ) : (
                                <button className="edit" onClick={() => handleUpdate()}>Save</button>
                            )}
                            <div className="close" onClick={() => dispatch(changeView(false))}>X</div>
                        </div>
                    </div>
                    <form onSubmit={handleUpdate} style={{ background: localEvent.color }}>
                        {view.mode === EVENT_VIEW_ACTIONS.edit ? (
                            <>
                                <div className="fieldset">
                                    <label>Title</label>
                                    <input type="text" name="title" value={localEvent.title} onChange={(e) => setLocalEvent(prev => ({...prev, title: e.target.value}))} />
                                </div>
                                <div className="fieldset half">
                                    <label>Date</label>
                                    <DatePicker 
                                        selected={new Date(formatFromUnix(localEvent.unix, 'M/dd/yyyy'))} 
                                        // onChange={ (newDate) => setLocalEvent(prev => ({...prev, date: format(new Date(newDate), 'dd M yyyy')}) ) } 
                                        onChange={(newDate) => setDate(newDate)}
                                        ref={dateRef}
                                    />
                                </div>
                                <div className="fieldset half right">
                                    <label>Time</label>
                                    <select onChange={(e) => setTime(e.target.value)} defaultValue={time}>
                                        {HOURS.map( h => (
                                            <option 
                                                value={h}
                                            >
                                                {h}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="fieldset">
                                    <label>Color</label>
                                    <ul>
                                        {COLORS.map(color => (
                                            <li 
                                                onClick={() => setLocalEvent(prev => ({...prev, color}))}
                                                style={{background: color}} 
                                                className={ [localEvent.color === color && 'selected'] }></li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="fieldset">
                                    <label>Title</label>
                                    <p onClick={() => handleEditChange(event.id)}>
                                        {event.title}
                                    </p>
                                </div>
                                <div className="fieldset half">
                                    <label>Date</label>
                                    <p onClick={() => handleEditChange(event.id)}>
                                        {formatFromUnix(localEvent.unix, 'M/dd/yyyy')}
                                        {format(fromUnixTime(localEvent.unix / 1000), 'M/dd/yyyy')}
                                    </p>
                                </div>
                                <div className="fieldset half right">
                                    <label>Time</label>
                                    <p onClick={() => handleEditChange(event.id)}>
                                        {formatFromUnix(localEvent.unix, 'hh:mm')}
                                    </p>
                                </div>
                            </>
                        )}
                    </form>
                </>
            )}
        </EventViewStyles>
    )
}