export default (
    state = {
        loadingCategories: false,
        categories: [],
    },
    action
) => {
    switch (action.type) {
        case 'PRO_CATEGORIES_PENDING':
            return {
                loadingCategories: true,
            }
        case 'PRO_CATEGORIES_FULFILLED':
            debugger;
            return {
                loadingCategories: false,
                categories: action.payload
            }
        case 'PRO_CATEGORIES_REJECTED':
            debugger;
            return {
                loadingCategories: false,
                isRejected: true,
                error: action.payload
            }
        default:
            return state;
    };
}
