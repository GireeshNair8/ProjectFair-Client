import React from 'react'
import Card from 'react-bootstrap/Card';
import videoPlayerImage from '../Assets/mediaplayer.png'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
function ProjectCard({project}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (

    <>
    <Card className='btn shadow' onClick={handleShow}>
      <Card.Img variant="top" src={project?`${BASE_URL}/uploads/${project.projectImage}`:videoPlayerImage} />
      <Card.Body>
        <Card.Title className='text-center text-info'>{project.title}</Card.Title>
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
          <Modal.Title style={{color:'orange'}}>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row style={{height:'200px'}}>
            <Col md={6}>
                <img src={project?`${BASE_URL}/uploads/${project.projectImage}`:videoPlayerImage} width={'100%'}alt="no image"/>
            </Col>
            <Col md={6}>
              <h4>Description</h4>
            <p>
                {project.overview}
            </p>
            <p><span className='fw-bolder'>Technologies</span>:{project.language}</p>
            </Col>
         </Row>
         <div className='d-flex'>
            <a style={{color:'grey'}} href={project.github} target="blank"><i class="fa-brands fa-github fa-2x ms-5"></i></a>
            <a style={{color:'grey'}} href={project.website} target="blank"><i class="fa-solid fa-link fa-2x ms-5"></i></a>

         </div>
        </Modal.Body>
     </Modal>
    </>
  )
}

export default ProjectCard