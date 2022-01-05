import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'

import { EVENT_VIEW_ACTIONS, COLORS } from 'constants/eventView';
import { HOURS } from 'constants/calendar';
import { formatFromUnix, generateRandomId } from 'helpers';

import "react-datepicker/dist/react-datepicker.css";
import { EventViewStyles, ErrorStyles } from './EventView.styles';

import { useDispatch, useSelector } from 'react-redux';
import { updateEvent, addEvent, deleteEvent } from 'store/Events/Events.actions';
import { changeView } from 'store/EventsUi/EventsUi.actions';
import { selectEvent } from 'store/Events/Events.selectors';
import { selectView } from 'store/EventsUi/EventsUi.selectors';


import { getDateInfo } from 'utils';

import { Button } from 'components';

export function EventView() {
    const [localEvent, setLocalEvent] = useState(null)
    const [time, setTime] = useState('01:00');
    const [date, setDate] = useState(null);
    const [errors, setErrors] = useState([]);
    const [width, setWidth] = useState(null);
    const dateRef = useRef(null);
    const containerRef = useRef(null);
    
    const dispatch = useDispatch();
    const view = useSelector(selectView);
    const event = useSelector(state => selectEvent(state, view.id));
    
    function handleEditChange() {
        dispatch(changeView({ show: true, mode: EVENT_VIEW_ACTIONS.edit, id: localEvent.id }));
    }

    function handleUpdate(id) {
        setErrors(null);
        
        if(validate()) {
            dispatch(updateEvent(localEvent));
            dispatch(changeView({ show: true, mode: EVENT_VIEW_ACTIONS.view, id: localEvent.id }));
        }
    }

    function handleAdd() {
        setErrors(null);
        
        if(validate()) {
            dispatch(addEvent(localEvent));
            dispatch(changeView({ show: false, mode: EVENT_VIEW_ACTIONS.view, id: null }));
        }
    }

    function handleDelete() {
        dispatch(deleteEvent(localEvent.id))
        dispatch(changeView({ show: false, mode: EVENT_VIEW_ACTIONS.view, id: null }));
    }

    function validate() {
        const errorArr = [];
        
        if( localEvent.title.length <= 0 || localEvent.title.length > 30) {
            errorArr.push('Title must be more than 0 and less than 30 characteres');
        }

        if (errorArr.length > 0){
            setErrors(errorArr);
            return false;
        }

        return true;
    }

    useLayoutEffect(() => {
        if(containerRef) {
            setWidth(containerRef.current.clientWidth);
        }
    }, [containerRef]);

    useEffect(() => {
        if(event) {
            setLocalEvent(event);
            setTime(formatFromUnix(event.unix, 'kk:mm'))
            setDate(new Date(formatFromUnix(event.unix, 'M/dd/yyyy')))
        }else{
            let unixEditting;
            
            if(view.edittingDate) {
                unixEditting = new Date(view.edittingDate)
            } else {
                unixEditting = Date.now();
            }

            setLocalEvent({
                id: generateRandomId(),
                title: '',
                unix: unixEditting,
                color: COLORS[0]
            });
            
            setTime(formatFromUnix(unixEditting, '01:00'))
            setDate(formatFromUnix(unixEditting, 'M/dd/yyyy'))
        }
    }, [event])

    useEffect(() => {
        const basicDate = format(new Date(date), 'M dd yyyy');
        const unix = (new Date(`${basicDate} ${time}`)).getTime();
        
        setLocalEvent(prev => ({...prev, unix }));
    }, [time, date])

    return (
        <EventViewStyles ref={containerRef} width={width}>
            {localEvent && (
                <>
                    <div className="header">
                        <h1>{EVENT_VIEW_ACTIONS.new ? 'Add New Reminder' : event.title}</h1>
                        <div className="actions">
                            {view.mode === EVENT_VIEW_ACTIONS.view && (
                                <>
                                    <Button click={() => handleDelete()} mr={10}>Delete</Button>
                                    <Button click={() => handleEditChange()} mr={10}>Edit</Button>
                                </>
                            )}
                            {view.mode === EVENT_VIEW_ACTIONS.edit && (
                                <Button className="save" click={() => handleUpdate()} mr={10}>Save</Button>
                            )}
                            {view.mode === EVENT_VIEW_ACTIONS.new && (
                                <Button className="add" click={() => handleAdd()} mr={10}>Add</Button>
                            )}
                            <div className="close" onClick={() => dispatch(changeView(false))}>X</div>
                        </div>
                    </div>
                    <form onSubmit={handleUpdate} style={{ background: localEvent.color }}>
                        {errors && errors.length > 0 && (
                            <ErrorStyles>
                                {errors.map( (err, index) => (
                                    <li key={`val-err-${index}`}>{err}</li>
                                ))}
                            </ErrorStyles>
                        )}
                        {view.mode === EVENT_VIEW_ACTIONS.edit || view.mode === EVENT_VIEW_ACTIONS.new ? (
                            <>
                                <div className="fieldset">
                                    <label>Title</label>
                                    <input type="text" name="title" value={localEvent.title} onChange={(e) => setLocalEvent(prev => ({...prev, title: e.target.value}))} />
                                </div>
                                <div className="fieldset half">
                                    <label>Date</label>
                                    <DatePicker 
                                        selected={date && new Date(date)} 
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
                                                key={h}
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
                                                className={ [localEvent.color === color && 'selected'] }
                                                key={color}
                                            ></li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="fieldset">
                                    <label>Title</label>
                                    <p onClick={() => handleEditChange(event.id)}>
                                        {event && event.title}
                                    </p>
                                </div>
                                <div className="fieldset half">
                                    <label>Date</label>
                                    <p onClick={() => handleEditChange(event.id)}>
                                        {localEvent?.unix ? formatFromUnix(localEvent.unix, 'M/dd/yyyy') : '-'}
                                    </p>
                                </div>
                                <div className="fieldset half right">
                                    <label>Time</label>
                                    <p onClick={() => handleEditChange(event.id)}>
                                        {localEvent?.unix ? formatFromUnix(localEvent.unix, 'kk:mm') : '-'}
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