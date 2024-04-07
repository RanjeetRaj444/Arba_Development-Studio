import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
export default function LoginSignUp() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        onOpen()
    }, [])
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size="full"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <Login />
                    <SignUp />
                </DrawerContent>
            </Drawer>
        </>
    )
}