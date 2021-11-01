import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootreducer = combineReducers({
	authReducer,
});

export default rootreducer;
