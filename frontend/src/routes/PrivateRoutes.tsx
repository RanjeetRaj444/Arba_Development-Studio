import React from "react";
import { useSelector } from "react-redux";
import LoginSignUp from "../components/LoginSignUp";

const PrivateRoute = ({ children }: any) => {
    const isAuthenticated = useSelector((state: any) => state.auth.loginState);
    let token = localStorage.getItem("ath");
    if (isAuthenticated || token) {
        return children;
    } else {
        setTimeout(() => {

        }, 700);

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <LoginSignUp />
            </div>
        );
    }
};

export default PrivateRoute;
