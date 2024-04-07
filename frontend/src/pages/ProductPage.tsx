import React, { useEffect, useState } from 'react'
import "../styles/ProductPage.css"
import image from "../assets/carousel.jpg"
import Navbar from '../components/Navbar'
import TermConditions from '../components/Term&Conditions'
import "../styles/HomePage.css"
import { Heading, Spinner, useToast } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../redux/actions/productAction'
const ProductPage = () => {
  const [termCon, setTermCon] = useState(false)
  const dispatch: any = useDispatch()
  const toast = useToast()
  const product = useSelector((store: any) => store.tasks.tasks)
  const loading = useSelector((store: any) => store.tasks.loading)
  const termsAndCondtion = localStorage.getItem("isAgree")
  const data: any = localStorage.getItem("user")
  const token = localStorage.getItem("ath")
  const user = JSON.parse(data)
  useEffect(() => {
    if (termsAndCondtion === "true") {
      setTermCon(false)
    } else { setTermCon(true) }

    dispatch(fetchAllProducts(user._id, toast, token))
  }, [])
  return (
    <div>
      <TermConditions termCon={termCon} />
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
      </div>
    </div>
  )
}

export default ProductPage