import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Myprojects from '../components/Myprojects'
import Profile from '../components/Profile'

function Dashboard() {
  const [isUserName,setISUserName] = useState("")
  useEffect(()=>{
    setISUserName(JSON.parse(sessionStorage.getItem('existingUser')).username)
  },[])
  console.log(isUserName);
  return (
    <>
    <Header dashboard/>
    <div>
      <p className='text-black fs-1 ms-3'>Welcome <span className='text-warning'>{isUserName}</span></p>
      <Row className='container-fluid mt-5'>
        <Col sm={12} md={8}>
          <Myprojects/>
        </Col>

        <Col sm={12} md={4}>
          <Profile/>
        </Col>
      </Row>
    </div>
    </>
   
  )
}

export default Dashboard