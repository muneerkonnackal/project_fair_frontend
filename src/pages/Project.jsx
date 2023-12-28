import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [allProject,setAllProject]=useState([])
  const [searchKey,setSearchKey] = useState("")
  const [isToken,setIsToken] = useState(false)

  const getAllProject = async()=>{

    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
    
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${token}`  //bearer key word user before token only use single space between bearer and token
      }
      const result = await allProjectAPI(searchKey,reqHeader)
    console.log(result.data);
    setAllProject(result.data)
    }

    
  }
  console.log(searchKey);

  useEffect(()=>{
    getAllProject()
  },[searchKey])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsToken(true)
    }
  },[])


  return (
    <>
      <Header/>
      
      
      <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
        <h1>All Project</h1>
        <div className='d-flex mt-5 w-25'>
          <input type="text" value={searchKey} onChange={e=>setSearchKey(e.target.value)} className='form-control' placeholder='Search the projects using technologies' />
          <i style={{marginLeft:"-45px",color:'lightgrey'}} class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
        </div>
      </div>

      <Row className='mt-5 mb-5 container-fluid'>
     
        {allProject?.length>0?
        allProject.map((item)=>(
          <Col sm={12} md={6} lg={4} className='mb-5'>
          <ProjectCard project={item}/>
      </Col>
        )):
       <div>
        {isToken? <p className='text-danger fs-4 text-center'>Sorry no projects currently available</p>:
          <div className='d-flex justify-content-center align-items-center w-100'>
            <div className='text-center' >
              <img src="https://cdn.dribbble.com/users/2234430/screenshots/8587843/media/5a7b6b3be7edd17ae98a25d010277e62.gif" className='rounded-circle' height={'250px'} width={'250px'} alt="no-image" />
              <p className='text-danger fs-5 mt-4'>Please <Link to={'/login'} style={{textDecoration:"none"}}>Login</Link> to view more projects</p>
            </div>
          </div>}
       </div>
         }
      </Row>
      
      
    </>
  )
}

export default Project