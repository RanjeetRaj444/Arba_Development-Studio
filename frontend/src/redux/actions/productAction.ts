// import axios from "axios";
// import { ADD_TASK, DELETE_TASK, GET_TASKS, UPDATE_TASK } from "../actionTypes";

import axios from "axios";
import {
	ADDED_CART_TASKS,
	GET_CART_TASKS,
	GET_CATEGORY_TASKS,
	GET_TASKS,
	LOADING,
	REGISTRATIONFAIELD,
} from "../actionTypes";

//fetch product for particular category
export const fetchCategoryProducts =
	(categoryId: any, userId: any, toast: any, token: any) =>
	(dispatch: React.Dispatch<any>) => {
		dispatch({ type: LOADING });
		fetch(
			`https://arba-development-studio.onrender.com/api/product:categoryId=${categoryId}&userId=${userId}`,
			{
				headers: {
					"Content-Type": "application/json",
					authorization: `${token}`,
				},
			},
		)
			.then((res) => res.json())
			.then((data) => {
				dispatch({
					type: GET_CATEGORY_TASKS,
					payload: data,
				});
				// localStorage.setItem("ath", data.token);
				// localStorage.setItem("user", JSON.stringify(data.user));
			})
			.catch((error) => {
				dispatch({ type: REGISTRATIONFAIELD });
				toast({
					title: "Faild to load, Please reload page.",
					description: error.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error("Register failed:", error);
			});
	};

//fetch all product
export const fetchAllProducts =
	(userId: any, toast: any, token: any) => (dispatch: React.Dispatch<any>) => {
		dispatch({ type: LOADING });
		fetch(
			`https://arba-development-studio.onrender.com/api/product?userId=${userId}`,
			{
				method: "GET",
				headers: {
					authorization: `${token}`,
				},
			},
		)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				dispatch({
					type: GET_TASKS,
					payload: data,
				});
				// localStorage.setItem("ath", data.token);
				// localStorage.setItem("user", JSON.stringify(data.user));
			})
			.catch((error) => {
				dispatch({ type: REGISTRATIONFAIELD });
				toast({
					title: "Faild to load, Please reload page.",
					description: error.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error("Register failed:", error);
			});
	};

export const addProduct =
	(formData: any, token: any, toast: any, userId: any) =>
	(dispatch: React.Dispatch<any>) => {
		dispatch({ type: LOADING });
		axios
			.post(
				`https://arba-development-studio.onrender.com/api/product/create`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						authorization: `${token}`,
					},
				},
			)
			.then((data: any) => {
				dispatch({ type: ADDED_CART_TASKS });
				dispatch(fetchAllProducts(userId, toast, token));
				toast({
					title: "Product adding success.",
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
				console.error("Product adding failed:", error);
			});
	};
export const updateProduct =
	(id: any, formData: any, token: any, toast: any, userId: any) =>
	(dispatch: React.Dispatch<any>) => {
		console.log(id);

		dispatch({ type: LOADING });
		axios
			.patch(
				`https://arba-development-studio.onrender.com/api/product/update/${id}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						authorization: `${token}`,
					},
				},
			)
			.then((data: any) => {
				dispatch({ type: ADDED_CART_TASKS });
				dispatch(fetchAllProducts(userId, toast, token));
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
export const deleteProduct =
	(id: any, token: any, toast: any, userId: any) =>
	(dispatch: React.Dispatch<any>) => {
		console.log(id);

		dispatch({ type: LOADING });
		fetch(
			`https://arba-development-studio.onrender.com/api/product/delete/${id}`,
			{
				method: "DELETE",
				headers: {
					authorization: `${token}`,
				},
			},
		)
			.then((res) => res.json())
			.then((data) => {
				dispatch({ type: ADDED_CART_TASKS });
				dispatch(fetchAllProducts(userId, toast, token));
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

export const fetchCartProduct =
	(token: any, toast: any) => (dispatch: React.Dispatch<any>) => {
		dispatch({ type: LOADING });
		fetch("https://arba-development-studio.onrender.com/api/cart/view", {
			headers: {
				authorization: `${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				if (data.items)
					dispatch({
						type: GET_CART_TASKS,
						payload: data,
					});
				else {
					dispatch({ type: ADDED_CART_TASKS });
					console.log(data);
					
				}
			})
			.catch((error) => {
				toast({
					title: "Faild to load, Please reload page.",
					description: error.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error("Loading failed:", error);
			});
	};

export const addToCarts =
	(formData: any, token: any, toast: any) =>
	(dispatch: React.Dispatch<any>) => {
		dispatch({ type: LOADING });
		fetch("https://arba-development-studio.onrender.com/api/cart/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `${token}`,
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch({ type: ADDED_CART_TASKS });
				dispatch(fetchCartProduct(token, toast));
				toast({
					title: "Product added to cart.",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			})
			.catch((error) => {
				dispatch({ type: ADDED_CART_TASKS });
				toast({
					title: "Faild to add, Please reload page and try again.",
					description: error.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error("Loading failed:", error);
			});
	};

export const removeCartItems =
	(id: any, token: any, toast: any) => (dispatch: React.Dispatch<any>) => {
		fetch(
			`https://arba-development-studio.onrender.com/api/cart/remove/${id}`,
			{
				method: "DELETE",
				headers: {
					authorization: `${token}`,
				},
			},
		)
			.then((res) => res.json())
			.then((data) => {
				dispatch(fetchCartProduct(token, toast));
				toast({
					title: "Deleted success.",
					description: data.msg,
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			})
			.catch((error) => {
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
