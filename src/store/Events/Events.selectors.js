export const selectEvents = (state) => {
    return state.events.data;
}

export const selectEvent = (state, id) => {
    return state.events.data.filter( e => e.id === id)[0];
}

export const selectView = (state) => {
    return state.events.view;
}