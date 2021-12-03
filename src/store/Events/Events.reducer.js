const INITIAL_STATE = {
    data: [
        { id: 1, date: '25 12 2021', unix: '1640455200000', title: 'Christmas', color: '#f7adad' },
        { id: 2, date: '10 12 2021', unix: '1639141200000', title: 'test 2', color: '#f7adad' },
        { id: 2.5, date: '10 12 2021', unix: '1639141200000', title: 'test 2.5', color: '#a3a3ff' },
        { id: 3, date: '15 12 2021', unix: '1639573200000', title: 'test 3', color: '#94f7f5' },
        { id: 4, date: '15 12 2021', unix: '1639593000000', title: 'test 4', color: '#94f7f5' },
        { id: 5, date: '15 3 2016', unix: '1460293200000', title: 'test 5', color: '#9bffa7' },
        { id: 6, date: '9 12 2021', unix: '1639072800000', title: 'test 6', color: '#f7ff8e' },
    ],
    view: { show: false }
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
            return {...state};
        
        case 'CHANGE_VIEW':
            return {...state, view: { ...state.view, show: action.payload.show, mode: action.payload.mode, id: action.payload.id }}
        
        default:
            return state;
    }
}