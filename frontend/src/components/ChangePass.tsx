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
import { changePassword } from '../redux/actions/authAction'

export default function UpdatePass() {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [confirmPassword, setConfirmPassword] = useState("")
    const token = localStorage.getItem("ath")
    const [updatePass, setUpdatePass] = useState({
        token: token, oldPassword: "", newPassword: ""
    })

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatePass({ ...updatePass, [e.target.name]: e.target.value })
    }
    const handleChangeConfirmPass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }
    const handleChangePass = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (confirmPassword === updatePass.newPassword) {
            changePassword(updatePass, toast, token)
            onClose()
        } else toast({
            title: "Confirm Password should match .",
            description: "Invalid Credentials.",
            status: "error",
            duration: 9000,
            isClosable: true,
        })
    }
    return (
        <>
            <Button colorScheme='teal' onClick={onOpen}>Change Password</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update your Password</ModalHeader>
                    <ModalCloseButton />
                    <form action="" onSubmit={(e) => handleChangePass(e)}>

                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>OldPassword</FormLabel>
                                <Input ref={initialRef} placeholder='OldPassword' onChange={(e) => handleChange(e)} name='oldPassword' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>NewPassword</FormLabel>
                                <Input ref={initialRef} placeholder='NewPassword' onChange={(e) => handleChange(e)} name='newPassword' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input ref={initialRef} placeholder='Confirm Password' onChange={(e) => handleChangeConfirmPass(e)} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type='submit' colorScheme='blue' mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}