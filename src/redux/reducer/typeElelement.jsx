const initialState = {
  type: {},
};

const typeElementReducer = (state = initialState, action) => {
  switch (action.type) {
    case "typeElement":
      return {
        ...state,
        type: action.data,
      };
    default:
      return state;
  }
};
export default typeElementReducer;
