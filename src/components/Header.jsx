import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../Contexts/ContextShare';

function Header({dashboard}) {
  const{isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
 const navigate = useNavigate()
  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthToken(false)
    //navigate
    navigate('/')
  }
  return (

    <div className='align-items-center' style={{height:"90px",width:"100%",background:"green"}}>
         <Navbar className=" p-3">
        <Container className=''>
          <Navbar.Brand className='text-light'>
            {' '}
           <Link style={{textDecoration:'none',color:'white'}} to={'/'}> <i class="fa-solid fa-spinner fa-2x me-2"></i><span className='fs-3 ms-1'>Project Fair</span></Link>
          </Navbar.Brand>
          {
            dashboard && 
            <button onClick={handleLogout} className='btn btn-warning rounded'>Logout <i class="fa-solid fa-power-off"></i></button>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header