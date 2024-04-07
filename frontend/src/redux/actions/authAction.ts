import axios from "axios";
import {
	LOADING,
	REGISTRATION,
	REGISTRATIONFAIELD,
	USERLOGIN,
	USERLOGINFAIELD,
} from "../actionTypes";

export const register =
	(formData: Object, navigate: any, toast: any) =>
	(dispatch: React.Dispatch<any>) => {
		dispatch({ type: LOADING });
		fetch("https://arba-development-studio.onrender.com/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.user);

				if (data.token) {
					dispatch({
						type: REGISTRATION,
						payload: { user: data.user, token: data.token },
					});

					localStorage.setItem("ath", data.token);
					localStorage.setItem("user", JSON.stringify(data.user));

					toast({
						title: "Register successful.",
						description: "You've register successful.",
						status: "success",
						duration: 9000,
						isClosable: true,
					});
				} else {
					toast({
						title: "Register faild.",
						description: "Invalid Credentials.",
						status: "error",
						duration: 9000,
						isClosable: true,
					});
				}
			})
			.catch((error) => {
				dispatch({ type: REGISTRATIONFAIELD });
				toast({
					title: "Register faild.",
					description: error.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error("Register failed:", error);
			});
	};

export const login =
	(formData: Object, navigate: any, toast: any) =>
	(dispatch: React.Dispatch<any>) => {
		dispatch({ type: LOADING });
		fetch("https://arba-development-studio.onrender.com/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				if (data.token) {
					dispatch({
						type: USERLOGIN,
						payload: { user: data.user, token: data.token },
					});
					localStorage.setItem("ath", data.token);
					localStorage.setItem("user", JSON.stringify(data.user));
					toast({
						title: "Login successfully.",
						description: "You've logged successful.",
						status: "success",
						duration: 9000,
						isClosable: true,
					});
					navigate("/");
				} else {
					dispatch({ type: USERLOGINFAIELD });
					toast({
						title: "Login faild.",
						description: "Username or Password is wrong try again.",
						status: "error",
						duration: 9000,
						isClosable: true,
					});
				}
			})
			.catch((error) => {
				toast({
					title: "Login faild.",
					description: error.message,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
				console.error("Login failed:", error);
			});
	};
export const updateProfile = (formData: any, toast: any, token: any) => {
	axios
		.patch("https://arba-development-studio.onrender.com/api/auth/update-profile", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `${token}`,
			},
		})
		.then((data) => {
			if (data.data.user) {
				localStorage.setItem("user", JSON.stringify(data.data.user));
				toast({
					title: "Updated successfully.",
					description: "You've updated profile successful.",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			} else {
				toast({
					title: "Updating faild.",
					description: "Something went wrong try again later.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}
		})
		.catch((err) => {
			toast({
				title: "Failed to Update the Profile.",
				description: `${err.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		});
};

export const changePassword = (formData: any, toast: any, token: any) => {
	fetch("https://arba-development-studio.onrender.com/api/auth/reset-password", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			authorization: `${token}`,
		},
		body: JSON.stringify(formData),
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.message) {
				toast({
					title: "Password changed.",
					description: "You've changed your password successful.",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
			} else {
				toast({
					title: "Failed to Update the Profile.",
					description: `${data.msg}`,
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}
		})
		.catch((err) => {
			toast({
				title: "Failed to Update the Profile.",
				description: `${err.message}`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		});
};
