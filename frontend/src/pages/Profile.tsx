import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TermConditions from '../components/Term&Conditions'
import { Button, Heading } from '@chakra-ui/react'
import UpdateProfile from '../components/UpdateProfile'
import UpdatePass from '../components/ChangePass'
const Profile = () => {
  const [termCon, setTermCon] = useState(false)
  const termsAndCondtion = localStorage.getItem("isAgree")
  const data: any = (localStorage.getItem("user"))
  const user = JSON.parse(data);
  // console.log(user)

  useEffect(() => {
    if (termsAndCondtion === "true") {
      setTermCon(false)
    } else
      setTermCon(true)
  }, [])
  return (
    <div>
      <TermConditions termCon={termCon} />
      <div className="profile_container">

        <div className='profile_details_pic'>
          <Heading className='welcome_note'>Welcome <span style={{ color: "green" }}> {user.userName}</span></Heading>
          <div className='profile_pic'>
            <img src={user.avatar} alt="img" />
          </div>
          <div className='profile_details'>
            <div className='name_and_email'>
              <h2 className='user_name'>{user.fullName}</h2>
              <p className='user_email'>{user.email}</p>
              <UpdateProfile user={user} />
            </div>
          </div>
        </div>
      </div>
      <div className='btn_group'>
        <TermConditions status={true} />
        <UpdatePass />
      </div>
    </div>
  )
}

export default Profile