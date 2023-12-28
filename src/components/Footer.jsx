import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
   <div style={{background:"yellowgreen"}} className=' p-4'>
        <div className='container text-black' >
            <Row className='d-flex justify-content-between align-items-center' style={{width:"100%"}}>
                <Col>
                    <h3 className='text-black'><i class="fa-solid fa-spinner me-2"></i>Project Fair</h3>
                    <span style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis eos laboriosam nihil, nemo quaerat voluptate voluptatibus ad totam excepturi cum iste, rem magni commodi velit minima in? Autem, expedita nam.</span>
                </Col>
        
                <Col>
                    <ul style={{listStyle:"none"}}>
                        <li>PRODUCTS</li>
                        <li className='mt-2'><Link to={""} style={{color:"black"}}>Angular</Link></li>
                        <li><Link to={""} style={{color:"black"}}>React</Link></li>
                        <li><Link to={""} style={{color:"black"}}>Vue</Link></li>
                        <li><Link to={""} style={{color:"black"}}>Laravel</Link></li>
                        
                    </ul>
        
                </Col>
        
                <Col>
                    <ul style={{listStyle:"none"}}>
                        <li >USEFUL LINKS</li>
                        <li className='mt-2'>Pricing</li>
                        <li>Setting</li>
                        <li>Orders</li>
                        <li>Help</li>
                        
                    </ul>
        
                </Col>
        
                <Col>
                    <ul  style={{listStyle:"none",marginTop:"-15px"}}>
                        <li >CONTACTS</li>
                        <li className='mt-3'><i class="fa-solid fa-house me-3"></i>Newyork ,NV 100013 USA</li>
                        <li><i class="fa-solid fa-envelope me-3"></i>www.companyinco@gmail.com</li>
                        <li><i class="fa-solid fa-phone  me-3"></i>+9721111</li>
                        <li></li>
                        
                    </ul>
        
                </Col>
        
        
                
            </Row>
        </div>
   </div>
  )
}

export default Footer