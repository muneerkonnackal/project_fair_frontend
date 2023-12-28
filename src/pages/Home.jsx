import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../assets/landimg.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'

function Home() {
    //*state to store token 
    const [isLogin ,setIsLogin ] = useState(false)

    const [homeProject,setHomeProjects] = useState([])

    const getHomeProjects = async()=>{
        const result = await homeProjectAPI()
        console.log(result);
        setHomeProjects(result.data)
    }


    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsLogin(sessionStorage.getItem("token"))
        }
        else{
            setIsLogin("")
        }
    
    },[])
// console.log(isLogin);

useEffect(()=>{
    getHomeProjects()
},[])

  return (
   <>
        <div style={{width:"100%", height:"100vh",background:"green"}}>
            <div className='container-fluid rounded'>
                <Row className='align-items-center p-5'>
                    <Col sm={12} md={6}>
                        <h1 className='text-light' style={{fontSize:"80px"}}>Project Fair</h1>
                        <p className='text-dark'>One stop destination for all software development projects</p>
                        {  isLogin?
                    
                            <Link to={'/dashboard'} className='btn btn-success rounded'>Manage projects<i class="fa-solid fa-right-long ms-3"></i></Link> :
                           
                            <Link to={'/login'} className='btn btn-success rounded'>Get started<i class="fa-solid fa-right-long ms-3"></i></Link> }
                    </Col>
                    <Col sm={12} md={6} style={{marginTop:"100px"}}>
                        <img className='w-75' src={titleImage} alt="No-image" />
                    </Col>
                </Row>
                 
            </div>
        </div>

        <div className='all-project mt-5'>
            <div className='text-center'>
                <h1>Explore our projects</h1>


                <marquee scrollAmount={20} className="mt-5"> 
                    <div className='d-flex gap-2'>
                        
    
                        {homeProject?.length>0?
                            homeProject.map((item)=>(
                                <div className='ms-5' style={{width:"500px"}}>
                            <ProjectCard  project={item} /> 
                             </div>
                            ))
                            :null
                            }
    
    
                    </div>
                </marquee>

                <div className='text-center mt-5 mb-5'>
                    <h6><Link to={'/project'} style={{color:"green"}}>See more projects</Link></h6>
                </div>

            </div>

        </div>
    
   </>
    

    
 
  )
}

export default Home