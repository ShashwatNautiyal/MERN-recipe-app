import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions";

const user = localStorage.getItem("user");

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const auth = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				isLoggedIn: false,
			};
		case REGISTER_FAIL:
			return {
				...state,
				isLoggedIn: false,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				user: payload.user,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		case LOGOUT:
			localStorage.removeItem("user");
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		default:
			return state;
	}
};

export default auth;
