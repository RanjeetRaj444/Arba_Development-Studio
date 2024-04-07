import React, { useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,

} from '@chakra-ui/react'
const TermConditions = ({ termCon, status = false }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    function handleTermCondition() {
        localStorage.setItem("isAgree", "true")
        onClose()
    }

    useEffect(() => {
        if (termCon) onOpen()
        else onClose()
    }, [termCon])
    return (
        <>
            {status && <Button onClick={onOpen} colorScheme='teal'>See T&C</Button>}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Terms & Conditoins</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum quo provident facere ipsa exercitationem, recusandae culpa, commodi ut nisi unde blanditiis dolores nihil, quasi veritatis iusto fugit sed? Officiis, esse.
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancle
                        </Button>
                        <Button onClick={handleTermCondition} variant='ghost'>Accept</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TermConditions