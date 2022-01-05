export function changeView({ show, mode, id, edittingDate }) {
    
    return {
        type: 'CHANGE_VIEW',
        payload: { show, mode, id, edittingDate }
    }
}