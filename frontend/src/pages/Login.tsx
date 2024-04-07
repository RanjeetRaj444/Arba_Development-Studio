import { Button, Heading, Input, useToast } from '@chakra-ui/react'
import React, { Dispatch, useState } from 'react'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "../styles/LoginSignUp.css"
import { login } from '../redux/actions/authAction';
import { CHANGE_LOGIN_STATUS } from '../redux/actionTypes';

const Login = () => {
  const [view, setView] = useState<Boolean>(false)
  const [data, setData] = useState<Object>({ username: "", password: "" })

  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const loginStatus = useSelector((state: any) => state.tasks.loginStatus);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }
  const handleSignUp = () => {
    dispatch({ type: CHANGE_LOGIN_STATUS, payload: true })
  }
  const handleView = () => {
    if (view)
      setView(false)
    else setView(true)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(data)
    dispatch(login(data, navigate, toast))

  }
  return (
    <div className='login' style={{ display: loginStatus ? "none" : "" }}>
      <div id='login_container' className='login_container'>
        <div className='left_container' style={{ height: "99vh", backgroundColor: "#00AAC3" }}>
          <div className='left_top'><div></div></div>
          <div className='left_bottom'><div></div></div>
        </div>
        <div id='form-container' className='form-container'>
          <div id='heading_container' className='heading_container'>
            <div id='avtar'></div>
            <Heading>Login</Heading>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className='form' action="">
            <div>
              <Input variant='unstyled' type='' name="username" onChange={(e) => handleChange(e)} placeholder={"Username"} required />
            </div>
            <div className='password_container'>
              <Input variant='unstyled' type={view ? "text" : "password"} name="password" onChange={(e) => handleChange(e)} placeholder={"Password"} required />
              {view ? <FaEye onClick={handleView} /> : <FaEyeSlash onClick={handleView} />}
            </div>
            <div id='btn_container'><Button type='submit' backgroundColor={"#00AAC3"} >Login</Button></div>
          </form>
          <div id='bottom_container' className="bottom_container">
            <p>Don't have an account?</p> <Button colorScheme='teal' onClick={handleSignUp}>Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login