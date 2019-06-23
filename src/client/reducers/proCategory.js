export default (
    state = {
      categoryName: undefined,
      categoryId: undefined
    },
    action
  ) => {
    switch (action.type) {
      case 'UPDATE_PRO_CATEGORY':
        return {
          categoryId: action.categoryId,
          categoryName: action.categoryName,
        }
      default:
        return state;
    };
  }
