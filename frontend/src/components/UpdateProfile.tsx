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
import React, { useState } from 'react'

import { updateProfile } from '../redux/actions/authAction'

export default function UpdateProfile({ user }: any) {
    const toast = useToast()
    const token = localStorage.getItem("ath")
    // console.log(token)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updateData, setData] = useState({
        fullName: user.fullName,
        avatarImg: user.avatar
    })

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...updateData, [e.target.name]: e.target.value })
    }
    function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (files && files.length > 0)
            setData({ ...updateData, [e.target.name]: files[0] })
        console.log(e.target.files)
    }
    const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log(updateData)
        updateProfile(updateData, toast, token)
        onClose()
    }
    return (
        <>
            <Button colorScheme='teal' onClick={onOpen}>Update Profile</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update your account details.</ModalHeader>
                    <ModalCloseButton />
                    <form action="" onSubmit={(e) => handleUpdateProfile(e)}>

                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Avtar</FormLabel>
                                <Input type='file' ref={initialRef} placeholder='Select Profile Picture' onChange={(e) => handleChangeImage(e)} name='avatarImg' accept="image/*" required />
                            </FormControl>
                            <FormControl>
                                <FormLabel>FullName</FormLabel>
                                <Input ref={initialRef} placeholder='FullName' name='fullName' onChange={(e) => handleChange(e)} value={updateData.fullName} required />
                            </FormControl>
                            <FormControl>
                                <FormLabel>User Name</FormLabel>
                                <Input placeholder='UserName' value={user.userName} readOnly color={"gray"} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input placeholder='Email' value={user.email} readOnly color={"gray"} />
                            </FormControl>


                        </ModalBody>
                        <ModalFooter>
                            <Button type='submit' colorScheme='teal' mr={3}>
                                Update
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}