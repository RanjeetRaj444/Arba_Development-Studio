import {
	ADDED_CART_TASKS,
	CHANGE_LOGIN_STATUS,
	GET_CART_TASKS,
	GET_CATEGORY_TASKS,
	GET_TASKS,
	LOADING,
} from "../actionTypes";

const initialState = {
	tasks: null,
	category: [],
	cart: null,
	loading: false,
	loginStatus: false,
};

const taskReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case LOADING:
			return { ...state, loading: true };
		case GET_TASKS:
			return { ...state, tasks: action.payload, loading: false };
		case GET_CATEGORY_TASKS:
			return { ...state, category: action.payload, loading: false };
		case GET_CART_TASKS:
			return { ...state, cart: action.payload, loading: false };
		case ADDED_CART_TASKS:
			return { ...state, loading: false };
		case CHANGE_LOGIN_STATUS:
			return { ...state, loginStatus: action.payload };
		default:
			return state;
	}
};

export default taskReducer;
