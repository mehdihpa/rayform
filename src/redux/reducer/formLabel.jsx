const initialState = {
  title: " ",
};

const formLabelToDrawReducer = (state = initialState, action) => {
  switch (action.type) {
    case "formLabelToDraw":
      return {
        ...state,
        title: action.data,
      };
    default:
      return state;
  }
};
export default formLabelToDrawReducer;
