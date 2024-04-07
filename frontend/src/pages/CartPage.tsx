import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TermConditions from '../components/Term&Conditions'
import { Heading, Spinner, useToast } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, fetchCartProduct } from '../redux/actions/productAction'

const CartPage = () => {
    const [termCon, setTermCon] = useState(false)
    const termsAndCondtion = localStorage.getItem("isAgree")
    const dispatch: any = useDispatch()
    const toast = useToast()
    const data: any = localStorage.getItem("user")
    const user = JSON.parse(data);
    const cartItems = useSelector((store: any) => store.tasks.cart) || { items: [] }
    // const product = useSelector((store: any) => store.tasks.tasks) || []
    const loading = useSelector((store: any) => store.tasks.loading)
    const token = localStorage.getItem("ath")
    console.log(cartItems)
    useEffect(() => {
        if (termsAndCondtion === "true") {
            setTermCon(false)
        } else { setTermCon(true) }
        dispatch(fetchCartProduct(token, toast))
        // dispatch(fetchAllProducts(user._id, toast, token))
    }, [])
    return (
        <div>
            <TermConditions termCon={termCon} />
            <div className="product_container">
                <div className='product_heading'>
                    <Heading>Carts Products</Heading>
                </div>
                <div className='Product_container'>
                    {loading ? <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    /> : <div className='Product_container'>
                        {cartItems.items && cartItems.items.length > 0 ? <div className='products'>
                            {cartItems.items.map((ele: any, ind: any) => <ProductCard key={ind} slides={ele.product} Quantity={ele.quantity} />)}
                        </div> : <div>
                            <Heading>You don't have products in cart. Go to Product page and add items.</Heading>
                        </div>}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default CartPage