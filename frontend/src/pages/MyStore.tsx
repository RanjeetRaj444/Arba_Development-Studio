import React, { useEffect, useState } from 'react'
import TermConditions from '../components/Term&Conditions'
import { Button, Select, Spinner, Table, Tbody, Td, Thead, Tr, useToast, } from '@chakra-ui/react'
import "../styles/Store.css"
import { deleteCategory, fetchCategory } from '../redux/actions/categoryAction'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, fetchAllProducts } from '../redux/actions/productAction'
import UpdateProduct from '../components/UpdateProduct'
import UpdateCategory from '../components/UpdateCategory'

const MyStore = () => {
  const [termCon, setTermCon] = useState(false)
  const [status, setStatus] = useState(false)
  const toast = useToast()
  const termsAndCondtion = localStorage.getItem("isAgree")
  const loading = useSelector((store: any) => store.tasks.loading)
  const category = useSelector((store: any) => store.tasks.category) || []
  const product = useSelector((store: any) => store.tasks.tasks) || []
  const token = localStorage.getItem("ath")
  const dispatch: any = useDispatch()
  const data = localStorage.getItem("user")
  const user = JSON.parse(data!) || []
  const handleCategory = () => {
    setStatus(false)
  }
  const handleProduct = () => {
    setStatus(true)
  }
  function handleReload() {
    dispatch(fetchCategory(token))
    dispatch(fetchAllProducts(user._id, toast, token))
  }
  function handleDelete(id: any) {
    dispatch(deleteProduct(id, token, toast, user._id))
    // window.location.reload()
  }
  if (category.length > 0) {
    console.log(category[0].image.split('uploads\\')[1])
  }
  useEffect(() => {
    if (termsAndCondtion === "true") {
      setTermCon(false)
    } else {
      setTermCon(true)

    }
    dispatch(fetchCategory(token))
    dispatch(fetchAllProducts(user._id, toast, token))
  }, [])
  return (
    <div>
      <TermConditions termCon={termCon} />
      <div className='store'>
        <div className='section_contaoner'>
          <div className={!status ? "categories_section light" : "categories_section dark"} onClick={handleCategory}>Category</div>
          <div className={status ? "product_section light" : "product_section dark"} onClick={handleProduct}>Products</div>
        </div>
        <div className='filter_container'>
          <div>
            <Button colorScheme='teal' onClick={handleReload}>REFRESH</Button>
          </div>
          <div>
            <Select backgroundColor={"teal"}>
              <option value="">Price asc</option>
              <option value="">Price desc</option>
              <option value="">Name or Title asc</option>
              <option value="">Name or Title desc</option>
            </Select>
          </div>
          <div>
            {!status ? <UpdateCategory text="ADD" color="teal" /> : <UpdateProduct text="ADD" color="teal" />}

          </div>
        </div>
        <div className='product_category'>
          {loading ? <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          /> :
            <div className='table_section'>
              <Table style={{ display: !status ? "" : "none" }}>
                <Thead>
                  <Tr>
                    <Td>Image</Td>
                    <Td>Name</Td>
                    <Td>Slug</Td>
                    <Td>Action</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {category.length > 0 && category.map((ele: any, ind: any) => <Tr key={ind}>
                    <Td><img src={ele.image} alt="" /></Td>
                    <Td>{ele.name}</Td>
                    <Td>{ele.slug}</Td>
                    <Td className='action_btn'>
                      <UpdateCategory product={ele} text="Edit" />
                      <Button onClick={() => dispatch(deleteCategory(ele._id, token, toast))}>Delete</Button>
                    </Td>
                  </Tr>)}
                </Tbody>
              </Table>
              <Table style={{ display: status ? "" : "none" }}>
                <Thead>
                  <Tr>
                    <Td>Image</Td>
                    <Td>Name</Td>
                    <Td>description</Td>
                    <Td>Action</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {product.length > 0 && product.map((ele: any, ind: any) => <Tr key={ind}>
                    <Td><img src={ele.image} alt="" /></Td>
                    <Td>{ele.title}</Td>
                    <Td>{ele.description}</Td>
                    <Td className='action_btn'>
                      <UpdateProduct product={ele} text={"Edit"} />
                      <Button onClick={() => handleDelete(ele._id)}>Delete</Button>
                    </Td>
                  </Tr>)}
                </Tbody>
              </Table>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default MyStore