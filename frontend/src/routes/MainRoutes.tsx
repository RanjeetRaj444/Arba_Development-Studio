import React from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from '../pages/HomePage'
import ProductPage from '../pages/ProductPage'
import MyStore from '../pages/MyStore'
import Profile from '../pages/Profile'
import LoginSignup from '../pages/Login'
import PrivateRoutes from './PrivateRoutes'
import SignUp from '../pages/SignUp'
import CartPage from '../pages/CartPage'
const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={
                    <PrivateRoutes>
                        <HomePage />
                    </PrivateRoutes>} />
                <Route path='/product' element={
                    <PrivateRoutes>
                        <ProductPage />
                    </PrivateRoutes>} />
                <Route path='/myStore' element={
                    <PrivateRoutes>
                        <MyStore />
                    </PrivateRoutes>} />
                <Route path='/profile' element={
                    <PrivateRoutes>
                        <Profile />
                    </PrivateRoutes>} />
                <Route path='/cart' element={
                    <PrivateRoutes>
                        <CartPage />
                    </PrivateRoutes>} />
                <Route path='/myStore' element={
                    <PrivateRoutes>
                        <MyStore />
                    </PrivateRoutes>} />
                <Route path='/login' element={<LoginSignup />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </div>
    )
}

export default MainRoutes