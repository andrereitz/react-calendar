import { createStore, combineReducers } from 'redux';

import eventsReducer from './Events/Events.reducer';

const rootReducer = combineReducers({
    events: eventsReducer
})

const store = createStore(rootReducer);

export default store;