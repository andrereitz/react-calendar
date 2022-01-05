const INITIAL_STATE = {
    show: false,
    mode: null,
    id: null,
    edittingDate: null
}

export default function eventsUiReducer(state = INITIAL_STATE, action){

    switch(action.type){

        case 'CHANGE_VIEW':
            return {
                ...state, 
                show: action.payload.show, 
                mode: action.payload.mode, 
                id: action.payload.id,
                edittingDate: action.payload.edittingDate
            }

        default:
            return state
    }
};