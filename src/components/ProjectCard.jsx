import React from 'react'
import Card from 'react-bootstrap/Card';
import videoplayerimg from '../assets/media player.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';


function ProjectCard({project}) {
  // console.log(project);
  // console.log(data.title);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(project.projectimage);


  return (
    <>
    <Card className='shadow text-center' onClick={handleShow} style={{width:"400px"}}>
        <Card.Img  height={'250px'} variant='top' src={project?`${BASE_URL}/uploads/${project.projectimage}`:videoplayerimg} />
        <Card.Body>
            <Card.Title className='text-info'>{project.title}</Card.Title>
        </Card.Body>
    
  </Card>

  <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title> {project?.title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img width={'100%'} height={'250px'} src={`${BASE_URL}/uploads/${project.projectimage}`} alt="No-image" />
            
            </Col>
            <Col md={6}>
              <h4>Description</h4>
              <p>{project.overview}</p>
              <p><span className='fw-bolder'>Technologies</span>{project.languages}</p>
            
            </Col>
          </Row>
          <div className='d-flex mt-5 mb-3'>
            <a  href={project.github} style={{color:"black"}} target='_blank'><i class="fa-brands fa-github fa-2x ms-3"></i></a>
            <a  href={project.website} style={{color:"black"}} target='_blank'><i class="fa-solid fa-link fa-2x ms-5"></i></a>

          </div>
        </Modal.Body>
        
      </Modal>


  </>
  )
}

export default ProjectCard