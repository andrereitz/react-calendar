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
    return {
        type: 'CHANGE_VIEW',
        payload: { show, mode, id }
    }
}

export function setEdittingDate(payload) {
    return {
        type: 'SET_EDITTING_DATE',
        payload: payload
    }
}