import { ADDED_CART_TASKS, GET_CATEGORY_TASKS, LOADING } from "../actionTypes";
import axios from "axios";
// import axios from "axios";
// import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORYS, UPDATE_CATEGORY } from "../actionTypes";

export const fetchCategory =
	(token: any) => (dispatch: React.Dispatch<any>) => {
		dispatch({ type: LOADING });
		fetch("https://arba-development-studio.onrender.com/api/category", {
			headers: {
				authorization: `${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				dispatch({ type: GET_CATEGORY_TASKS, payload: data });
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

export const updateCategory =
	(id: any, formData: any, token: any, toast: any) =>
	(dispatch: React.Dispatch<any>) => {
		// console.log(formData);
		dispatch({ type: LOADING });
		axios
			.patch(`https://arba-development-studio.onrender.com/api/category/update/${id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					authorization: `${token}`,
				},
			})
			.then((data: any) => {
				dispatch({ type: ADDED_CART_TASKS });
				dispatch(fetchCategory(token));
				toast({
					title: "Updated success.",
					description: data.msg,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			})
			.catch((error) => {
				dispatch({ type: ADDED_CART_TASKS });
				toast({
					title: "Faild to update.",
					description: error.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error("Update failed:", error);
			});
	};

export const addCategory =
	(formData: any, token: any, toast: any) =>
	(dispatch: React.Dispatch<any>) => {
		// console.log(formData);
		dispatch({ type: LOADING });
		axios
			.post(`https://arba-development-studio.onrender.com/api/category/create`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					authorization: `${token}`,
				},
			})
			.then((data: any) => {
				dispatch({ type: ADDED_CART_TASKS });
				dispatch(fetchCategory(token));
				toast({
					title: "Category adding success.",
					description: data.msg,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			})
			.catch((error) => {
				dispatch({ type: ADDED_CART_TASKS });
				toast({
					title: "Faild to add.",
					description: error.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error("Adding failed:", error);
			});
	};
export const deleteCategory =
	(id: any, token: any, toast: any) => (dispatch: React.Dispatch<any>) => {
		// console.log(id);

		dispatch({ type: LOADING });
		fetch(`https://arba-development-studio.onrender.com/api/category/delete/${id}`, {
			method: "DELETE",
			headers: {
				authorization: `${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch({ type: ADDED_CART_TASKS });
				dispatch(fetchCategory(token));
				toast({
					title: "Deleted success.",
					description: data.msg,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			})
			.catch((error) => {
				dispatch({ type: ADDED_CART_TASKS });
				toast({
					title: "Faild to delete.",
					description: error.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error("delete failed:", error);
			});
	};
