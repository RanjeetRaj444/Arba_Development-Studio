import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TermConditions from '../components/Term&Conditions'
import Carousel from '../components/Carousel'
import image from "../assets/carousel.jpg"
import "../styles/HomePage.css"
import ProductCard from '../components/ProductCard'
import { Button, Heading, Spinner, useToast } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { fetchAllProducts, fetchCartProduct } from '../redux/actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
const HomePage = () => {
  const [termCon, setTermCon] = useState(false)
  const termsAndCondtion = localStorage.getItem("isAgree")
  const token = localStorage.getItem('ath')
  const data: any = localStorage.getItem("user")
  const product = useSelector((store: any) => store.tasks.tasks)
  const loading = useSelector((store: any) => store.tasks.loading)
  const user = JSON.parse(data)
  const toast = useToast()
  const dispatch: any = useDispatch()
  useEffect(() => {
    if (termsAndCondtion === "true") {
      setTermCon(false)
    } else { setTermCon(true) }
    dispatch(fetchCartProduct(token, toast))
    dispatch(fetchAllProducts(user._id, toast, token))
  }, [])
  return (
    <div>
      <TermConditions termCon={termCon} />
      <div className="carsoule_container">
        <Carousel
          slides={[
            <img src={image} alt="Slide 1" />,
            <img src={image} alt="Slide 2" />,
            <img src={image} alt="Slide 3" />,
          ]}
        />
      </div>
      <div className="product_container">
        <div className='product_heading'>
          <Heading>Products</Heading>
        </div>
        <div className='Product_container'>
          {loading ? <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          /> : <div className='Product_container'>
            {product && product.length > 0 ? <div className='products'>
              {product.map((ele: any, ind: any) => <ProductCard key={ind} slides={ele} Quantity={0} />)}
            </div> : <div>
              <Heading>You don't have products. Go to My Store and create.</Heading>
            </div>}
          </div>}
        </div>
        <div className="btn_container">
          <Link to={"/product"}>
            <Button colorScheme='teal'>ALL PRODUCTS</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage