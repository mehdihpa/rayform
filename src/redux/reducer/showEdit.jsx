const initialState = {
  display: true,
};

const showEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case "showEdit":
      return {
        ...state,
        display: action.data,
      };
    default:
      return state;
  }
};
export default showEditReducer;
