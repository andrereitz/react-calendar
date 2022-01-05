export const selectEvents = (state) => {
    return state.events;
}

export const selectEvent = (state, id) => {
    return state.events.filter( e => e.id === id)[0];
}