import { generateRandomId } from 'helpers';

const INITIAL_STATE = {
    data: [
        { id: generateRandomId(), unix: '1640455200000', title: 'Christmas', color: '#f7adad' },
        { id: generateRandomId(), unix: '1639141200000', title: 'Initial state 2', color: '#f7adad' },
        { id: generateRandomId(), unix: '1639141200000', title: 'Initial state 3', color: '#a3a3ff' },
        { id: generateRandomId(), unix: '1639573200000', title: 'Initial state 4', color: '#94f7f5' },
        { id: generateRandomId(), unix: '1639593000000', title: 'Initial state 5', color: '#94f7f5' },
        { id: generateRandomId(), unix: '1639072800000', title: 'Initial state 6', color: '#f7ff8e' },
    ],
}

export default function eventsReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'ADD_EVENT':
            return {
                ...state, 
                data: [...state.data, action.payload]
            }

        case 'UPDATE_EVENT':
            return {...state, data: state.data.map( event => {
                if(event.id === action.payload.id) {
                    return action.payload;
                }

                return event;
            } )}

        case 'DELETE_EVENT':
            return {...state, data: state.data.filter(data => data.id !== action.payload)};
        
        default:
            return state;
    }
}