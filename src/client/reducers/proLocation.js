export default (state = { location: undefined }, action) => {
    switch (action.type) {
        case 'UPDATE_PRO_LOCATION':
            return {
                location: action.location,
            }
        default:
            return state;
    };
}
