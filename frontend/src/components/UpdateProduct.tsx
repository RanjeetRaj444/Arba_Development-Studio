import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { addProduct, updateProduct } from '../redux/actions/productAction'
function UpdateProduct({ product = {
    title: "",
    description: "",
    price: "",
    category: "",
    productImg: ""
}, text, color = "gray" }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updateData, setData] = useState({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        productImg: product.image
    })
    const dispatch: any = useDispatch()
    const toast = useToast()
    const data: any = localStorage.getItem("user")
    const token = localStorage.getItem("ath")
    const user = JSON.parse(data)
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (files && files.length > 0)
            setData({ ...updateData, [e.target.name]: files[0] })
        console.log(e.target.files)
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...updateData, [e.target.name]: e.target.value })
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onClose()
        if (text === "Edit")
            dispatch(updateProduct(product._id, updateData, token, toast, user._id))
        else dispatch(addProduct(updateData, token, toast, user._id))
    }
    return (
        <>
            <Button colorScheme={color} onClick={onOpen}>{text}</Button>


            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Product Image</FormLabel>
                                <Input type='file' ref={initialRef} placeholder='Select Profile Picture' onChange={(e) => handleChangeImage(e)} name='productImg' accept="image/*" required />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Title</FormLabel>
                                <Input placeholder='Title' name='title' onChange={(e) => handleChange(e)} required value={updateData.title} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input placeholder='Description' name='description' onChange={(e) => handleChange(e)} required value={updateData.description} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Price</FormLabel>
                                <Input placeholder='Price' name='price' type='number' onChange={(e) => handleChange(e)} required value={updateData.price} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Category</FormLabel>
                                <Input placeholder='Category' name='category' onChange={(e) => handleChange(e)} required value={updateData.category} />
                            </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            <Button type='submit' colorScheme='blue' mr={3}>
                               {text}
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}
export default UpdateProduct