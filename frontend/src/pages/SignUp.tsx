import { Button, Heading, Input, useToast } from '@chakra-ui/react'
import React, { Dispatch, useState } from 'react'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "../styles/LoginSignUp.css"
import { register } from '../redux/actions/authAction';
import { CHANGE_LOGIN_STATUS } from '../redux/actionTypes';

const SignUp = () => {
    const [view, setView] = useState(false)
    const [view2, setView2] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [data, setData] = useState({ userName: "", password: "", fullName: "", email: "" })
    const loginStatus = useSelector((state: any) => state.tasks.loginStatus);
    const handleSignUp = () => {
        dispatch({ type: CHANGE_LOGIN_STATUS, payload: false })
    }
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate()
    const toast = useToast()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleChangeConfirmPass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }
    const handleView = () => {
        if (view)
            setView(false)
        else setView(true)
    }
    const handleView2 = () => {
        if (view2)
            setView2(false)
        else setView2(true)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(data)
        if (confirmPassword === data.password)
            dispatch(register(data, navigate, toast))
        else toast({
            title: "Confirm Password should match .",
            description: "Invalid Credentials.",
            status: "error",
            duration: 9000,
            isClosable: true,
        });
    }
    return (
        <div className='login' style={{ display: !loginStatus ? "none" : "" }}>
            <div id='login_container' className='login_container'>
                <div className='left_container' style={{ height: "99vh", backgroundColor: "#00AAC3" }}>
                    <div className='left_top'><div></div></div>
                    <div className='left_bottom'><div></div></div>
                </div>
                <div id='form-container' className='form-container'>
                    <div id='heading_container' className='heading_container'>
                        <div id='avtar'></div>
                        <Heading id='signup_head'>Sign up</Heading>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className='form' action="">
                        <div>
                            <Input variant='unstyled' type='text' name="userName" onChange={(e) => handleChange(e)} placeholder={"Username"} required />
                        </div>
                        <div>
                            <Input variant='unstyled' type='text' name="fullName" onChange={(e) => handleChange(e)} placeholder={"Fullname"} required />
                        </div>
                        <div>
                            <Input variant='unstyled' type='email' name="email" onChange={(e) => handleChange(e)} placeholder={"Email"} required />
                        </div>
                        <div className='password_container'>
                            <Input variant='unstyled' type={view ? "text" : "password"} name="password" onChange={(e) => handleChange(e)} placeholder={"Password"} required />
                            {view ? <FaEye onClick={handleView} /> : <FaEyeSlash onClick={handleView} />}
                        </div>
                        <div className='password_container'>
                            <Input variant='unstyled' type={view2 ? "text" : "password"} name="" onChange={(e) => handleChangeConfirmPass(e)} placeholder={"Confirm password"} required />
                            {view2 ? <FaEye onClick={handleView2} /> : <FaEyeSlash onClick={handleView2} />}
                        </div>
                        <div id='btn_container'><Button type='submit' backgroundColor={"#00AAC3"} >Register</Button></div>
                    </form>
                    <div id='bottom_container' className="bottom_container" >
                        <p>Already have an account?</p> <Button colorScheme='teal' onClick={handleSignUp}>Login</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp