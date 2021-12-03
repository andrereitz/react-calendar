export function addEvent(event) {
    return {
        type: 'ADD_EVENT',
        payload: event
    }
}

export function updateEvent(payload) {
    return {
        type: 'UPDATE_EVENT',
        payload
    }
}

export function deleteEvent(id) {
    return {
        type: 'DELETE_EVENT',
        payload: id
    }
}

export function changeView({ show, mode, id }) {
    console.log(show, mode, id)
    return {
        type: 'CHANGE_VIEW',
        payload: { show, mode, id }
    }
}