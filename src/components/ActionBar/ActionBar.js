import { ActionBarStyles } from "./ActionBar.styles";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faPlus } from '@fortawesome/free-solid-svg-icons'

import { Button } from 'components';
import { EVENT_VIEW_ACTIONS } from 'constants/eventView';

import { useDispatch } from "react-redux";
import { changeView } from 'store/EventsUi/EventsUi.actions';

export function ActionBar({ setDate }) {
    const dispatch = useDispatch();

    return(
        <ActionBarStyles>
            <Button round={true} mr={14} fontSize="1.1rem" size={50} click={(e) => setDate(new Date())}>
                <FontAwesomeIcon icon={faCalendarDay} />
            </Button>
            <Button round fontSize="1.1rem" size={50} click={() => dispatch( changeView({ show: true, mode: EVENT_VIEW_ACTIONS.new, id: null }) )}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
        </ActionBarStyles>
    )
}