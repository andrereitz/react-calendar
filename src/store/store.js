import { createStore, combineReducers } from 'redux';

import eventsReducer from './Events/Events.reducer';
import eventsUiReducer from './EventsUi/EventsUi.reducer';

const rootReducer = combineReducers({
    events: eventsReducer,
    eventsUi: eventsUiReducer
})

const store = createStore(rootReducer);

export default store;