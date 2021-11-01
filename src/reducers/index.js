import { combineReducers } from "redux";
import authReducer from "./authReducer";
import searchReducer from "./searchReducer";

const rootreducer = combineReducers({
	authReducer,
	searchReducer,
});

export default rootreducer;
