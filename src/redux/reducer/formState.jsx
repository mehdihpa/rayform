const initialState = {
  formState: false,
};

const updateListByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case "updateFormList":
      return {
        ...state,
        formState: action.data,
      };
    default:
      return state;
  }
};
export default updateListByIdReducer;
