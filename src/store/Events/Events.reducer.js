const INITIAL_STATE = [
    {
        id: 1,
        date: '25 11 2021',
        title: 'Christmas',
        color: 'Red'
    }
]

export default function eventsReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'ADD_EVENT':
            console.log('the payload', action.payload)
            return [
                ...state, 
                action.payload
            ]

        case 'UPDATE_EVENT':
            return {...state};

        case 'DELETE_EVENT':
            return {...state};
        
        default:
            return state;
    }
}