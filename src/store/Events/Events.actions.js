export function addEvent(event){
    return{
        type: 'ADD_EVENT',
        payload: event
    }
}

export function updateEvent(id, event){
    return{
        type: 'UPDATE_EVENT',
        payload: { id, event }
    }
}

export function deleteEvent(id){
    return{
        type: 'DELETE_EVENT',
        payload: id
    }
}