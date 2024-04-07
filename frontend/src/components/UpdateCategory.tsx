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
import { addCategory, updateCategory } from '../redux/actions/categoryAction'
function UpdateCategory({ product = {
    name: "",
    slug: "",
    categoryImg: ""
}, text, color = "gray" }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updateData, setData] = useState({
        name: product.name,
        slug: product.slug,
        categoryImg: product.image
    })
    const dispatch: any = useDispatch()
    const toast = useToast()
    const token = localStorage.getItem("ath")
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (files && files.length > 0)
            setData({ ...updateData, [e.target.name]: files[0] })
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...updateData, [e.target.name]: e.target.value })
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onClose()
        if (text === "Edit")
            dispatch(updateCategory(product._id, updateData, token, toast))
        else dispatch(addCategory(updateData, token, toast))
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
                    <ModalHeader>Update category</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Product Image</FormLabel>
                                <Input type='file' ref={initialRef} onChange={(e) => handleChangeImage(e)} name='categoryImg' accept="image/*" required />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Name</FormLabel>
                                <Input placeholder='Name' name='name' onChange={(e) => handleChange(e)} required value={updateData.name} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Slug</FormLabel>
                                <Input placeholder='Slug' name='slug' onChange={(e) => handleChange(e)} required value={updateData.slug} />
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
export default UpdateCategory