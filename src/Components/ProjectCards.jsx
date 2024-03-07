import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    MDBCard,
    MDBCardBody,
    
    MDBCardText,
    MDBCardImage,
   
  } from 'mdb-react-ui-kit';
  import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img3 from './images/img3.jpg'
import { baseUrl } from '../services/baseUrl';


function ProjectCards({project}) {
  console.log(project);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
       <MDBCard href='#' onClick={handleShow} className='bg-info p-2'>
      <MDBCardImage src={project?`${baseUrl}/uploads/${project?.projectImage}`:"null"} alt='...' position='top' />
      <MDBCardBody className='bg-info'>
        <MDBCardText className='text-dark'>
         {project?.title}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>

    

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <Row>
                <Col>
                <img className='img-fluid' src={project?`${baseUrl}/uploads/${project?.projectImage}`:"null"} alt="" />
                </Col>
                <Col>
                <p>{project?.overview}</p>
                <p>Language : {project?.language}</p>
                
                </Col>
            </Row>
            
           
             </Modal.Body>
        <Modal.Footer>
          <Button target='_blank' href={`${project?.github}`} variant="secondary" >
          <i class="fa-brands fa-github"></i>
          </Button>
          <Button target='_blank' href={`${project?.link}`} variant="primary" >
          <i class="fa-solid fa-link"></i>
          </Button>
        </Modal.Footer>
      </Modal>





    </div>



  )
}

export default ProjectCards