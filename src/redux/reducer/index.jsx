import { combineReducers } from "redux";
import updateListByIdReducer from "./formState";
import formLabelToDrawReducer from "./formLabel";
import typeElementReducer from "./typeElelement";
import genericElementConfigReducer from "./componentbar/genericReducer";
import showEditReducer from "./showEdit";
import setIdElementReducer from "./setIdElement";
const allReducers = combineReducers({
  updateListByIdReducer,
  formLabelToDrawReducer,
  typeElementReducer,
  genericElementConfigReducer,
  showEditReducer,
  setIdElementReducer,
});
export default allReducers;
