import {
	LOADING,
	REGISTRATION,
	REGISTRATIONFAIELD,
	USERLOGIN,
	USERLOGINFAIELD,
} from "../actionTypes";

const initialState = {
	user: null,
	registerState: false,
	loginState: false,
	loading: false,
	token: "",
};

const authReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case LOADING:
			return { ...state, loading: true };
		case REGISTRATION:
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				registerState: true,
				loading: false,
			};
		case USERLOGIN:
			return {
				...state,
				loginState: true,
				registerState: false,
				user: action.payload.user,
				token: action.payload.token,
				loading: false,
			};
		case USERLOGINFAIELD:
			return {
				...state,
				loginState: false,
				loading: false,
			};
		case REGISTRATIONFAIELD:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default authReducer;
