const initialState = {
  idElement: 0,
};

const setIdElementReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setIdElement":
      return {
        ...state,
        idElement: action.data,
      };
    default:
      return state;
  }
};
export default setIdElementReducer;
