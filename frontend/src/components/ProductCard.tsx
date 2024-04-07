import { Button, Heading, Spinner, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCarts, removeCartItems } from '../redux/actions/productAction';
interface CarouselProps {
    slides: React.ReactNode;
    Quantity: Number
}
const ProductCard: React.FC<CarouselProps> = ({ slides, Quantity }: any) => {
    const [quantity, setQuantity] = useState(Quantity + 1)
    const [cartProductId, setCartProductId] = useState("")
    let token = localStorage.getItem("ath")
    const dispatch: any = useDispatch()
    const loading = useSelector((store: any) => store.tasks.loading)
    const products = useSelector((store: any) => store.tasks.tasks) || []
    const cartItems = useSelector((store: any) => store.tasks.cart) || { items: [] }
    const toast = useToast()
    const addToCart = () => {
        dispatch(addToCarts({ productId: slides._id, quantity }, token, toast))
    }
    const removeFromCart = (id: any) => {
        if (quantity - 2 > 0)
            dispatch(addToCarts({ productId: slides._id, quantity: quantity - 2 }, token, toast))
        else {
            dispatch(removeCartItems(id, token, toast))
        }
    }
    function onLoad() {
        // console.log(cartProductId === slides._id)
        if (cartItems.items.length > 0 && products.length > 0) {
            for (let i = 0; i < cartItems.items.length; i++) {
                if (cartItems.items[i].product._id === slides._id) {
                    setQuantity(parseInt(cartItems.items[i].quantity) + 1)
                    // console.log(cartItems.items[i].product);
                    setCartProductId(cartItems.items[i].product._id)
                    break
                }
            }
        }
        else {
            // console.log(cartItems)
        }
    }
    useEffect(() => {
        onLoad()
        // dispatch(fetchCartProduct(token, toast))
    }, [cartItems, products])
    return (
        <div>
            {loading ? <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            /> :
                <div className='product_card'>
                    <div className='image_container'>
                        <img src={slides.image} alt="" />
                    </div>
                    <div className='details_container'>
                        <h2>{slides.title}</h2>
                        <p>{slides.description}</p>
                        <p>Rs. {slides.price}/-</p>
                        <Button style={{ display: quantity > 1 || cartProductId === slides._id ? "none" : "" }} onClick={addToCart} colorScheme='teal'>ADD TO CART</Button>
                        <div style={{ display: quantity > 1 || cartProductId === slides._id ? "flex" : "none", gap: "1rem", backgroundColor: "teal", padding: " .3rem 0rem", alignItems: "center", justifyContent: "center" }}>
                            <Button onClick={() => removeFromCart(slides._id)}>-</Button>
                            <Heading>{quantity - 1}</Heading>
                            <Button onClick={addToCart}>+</Button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ProductCard