import {
	createStore,
	combineReducers,
	applyMiddleware,
	Middleware,
} from "redux";
import { thunk, ThunkMiddleware } from "redux-thunk";
import authReducer from "./reducers/authReducer";
import taskReducer from "./reducers/taskReducer";

export interface RootState {
	auth: any;
	tasks: any;
}

const rootReducer = combineReducers<RootState>({
	auth: authReducer,
	tasks: taskReducer,
});

const thunkMiddleware: ThunkMiddleware = thunk;

const middleware: Middleware[] = [thunkMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
