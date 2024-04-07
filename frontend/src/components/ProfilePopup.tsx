import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Text,
    Portal,
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import imag from "../assets/pngegg.png"
export default function WithPopoverAnchor({ user = { avatar: "" } }: any) {
    function handleLogout() {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <Popover
        >
            {/* <HStack> */}
            <PopoverTrigger>
                <div className='nav_profile_image'>
                    <img src={user.avatar ? user.avatar : imag} alt='img' />
                </div>
            </PopoverTrigger>
            {/* </HStack> */}
            <Portal>
                <PopoverContent style={{ width: "60%", alignItems: "center", display: "flex", justifyContent: "right" }}>
                    <PopoverBody>
                        <Link to={"/myStore"}>
                            <Text>My Store</Text>
                        </Link>
                        <Link to={"/profile"}>
                            <Text>Profile</Text>
                        </Link>
                        <Text onClick={handleLogout}>Logout</Text>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}