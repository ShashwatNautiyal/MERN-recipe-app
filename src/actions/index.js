export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const SEARCH_QUERY = "SEARCH_QUERY";

export const loginSuccess = (value) => {
	return {
		type: LOGIN_SUCCESS,
		payload: value,
	};
};

export const loginFail = (value) => {
	return {
		type: LOGIN_FAIL,
		payload: value,
	};
};

export const registerSuccess = (value) => {
	return {
		type: REGISTER_SUCCESS,
		payload: value,
	};
};

export const registerFail = (value) => {
	return {
		type: REGISTER_FAIL,
		payload: value,
	};
};

export const logout = (value) => {
	return {
		type: LOGOUT,
		payload: value,
	};
};

export const searchQuery = (value) => {
	return {
		type: SEARCH_QUERY,
		payload: value,
	};
};
