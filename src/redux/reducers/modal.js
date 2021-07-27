const initialState = {
    isOpen: false,
    text: '',
    image: '',
    header: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'MODAL:TOGGLE':
            return {
                ...state,
                ...payload
            };
        default:
            return state
    }
}