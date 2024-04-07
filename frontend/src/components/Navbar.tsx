import React from 'react'

import "../styles/Navbar.css"
import { Button } from '@chakra-ui/react'
import CartLogo from './CartLogo';
import { Link } from 'react-router-dom';
import WithPopoverAnchor from './ProfilePopup';
import { useSelector } from 'react-redux';
const Navbar = () => {
    const product = useSelector((store: any) => store.tasks.cart) || { items: [] }
    // console.log(product);
    const data: any = localStorage.getItem("user")
    let user = JSON.parse(data)
    return (
        data === null ? <div></div> : <div className='nav_link_container'>
            <div><Link to={"/"}><Button colorScheme='teal'>LOGO</Button></Link></div>
            <div className='nav_cart_profile_section'>
                <div><Link to={"/cart"}><CartLogo count={product.items.length} /></Link></div>
                <div className='nav_profile_image'>
                    <WithPopoverAnchor user={user} />
                </div>
            </div>
        </div>
    )

}

export default Navbar