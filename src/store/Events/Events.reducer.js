const INITIAL_STATE = [
    {
        id: 1,
        date: '25 12 2021',
        unix: '1640455200000',
        title: 'Christmas',
        color: 'Red'
    },
    { id: 2, date: '10 12 2021', unix: '1639141200000', title: 'test 2', color: 'orange' },

    { id: 2.5, date: '10 12 2021', unix: '1639141200000', title: 'test 2.5', color: 'purple' },

    { id: 3, date: '15 12 2021', unix: '1639573200000', title: 'test 3', color: 'blue' },

    { id: 4, date: '15 12 2021', unix: '1639593000000', title: 'test 4', color: 'blue' },

    { id: 5, date: '15 3 2016', unix: '1460293200000', title: 'test 5', color: 'gray' },

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