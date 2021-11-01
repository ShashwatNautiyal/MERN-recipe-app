import { SEARCH_QUERY } from "../actions";

const initialState = {
	searchQuery: "",
};

const searchReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SEARCH_QUERY:
			return {
				...state,
				searchQuery: payload,
			};
		default:
			return state;
	}
};

export default searchReducer;
