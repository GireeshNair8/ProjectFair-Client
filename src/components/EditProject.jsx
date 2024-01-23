import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { editProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../contexts/ContextShare';

function EditProject({project}) {
    const {editProjectResponse,setEditProjectResponse}= useContext(editProjectResponseContext)
    const [show,setShow]= useState(false);
    const [projectDetails, setProjectDetails]= useState(
        {id:project._id, title:project.title,language:project.language,github:project.github,website:project.website,overview:project.overview,projectImage:""})
   const[preview,setPreview]= useState("")
   
        const handleClose = () => {setShow(false);
            handleClose1()}
    const handleShow = () => setShow(true);
useEffect(()=>{
if(projectDetails.projectImage){
    setPreview(URL.createObjectURL(projectDetails.projectImage))
}
},[projectDetails.projectImage])
const handleClose1 =()=>{
    setProjectDetails({
        id: project._id, 
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage:""
    })

    setPreview("")
}
const handleUpdate= async()=>{ 
    const {id, title, language, github, website, overview, projectImage}= projectDetails
    if(!title ||!language|| !github|| !website|| !overview){
alert('Please fill the form completely')
}
else{
    const reqBody= new FormData()

    reqBody.append("title", title)
   
    reqBody.append("language", language)

    reqBody.append("github", github)

    reqBody.append("website", website)

    reqBody.append("overview", overview)

    preview?reqBody.append("projectImage", projectImage):reqBody.append("projectImage",project.projectImage)


const token= sessionStorage.getItem("token")
if(preview){
    const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
    }
    const result=  await editProjectAPI(id,reqBody,reqHeader)
    console.log(result);
    if(result.status===200){
        alert('update successfully')
        handleClose()
        setEditProjectResponse(result.data)
    }
    else{
        console.log(result.response.data);
    }
}
else{
const reqHeader= { 
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
}
const result=  await editProjectAPI(id, reqBody, reqHeader)
console.log(result);
if(result.status===200){
    alert('updated successfully')
    handleClose()
    setEditProjectResponse(result.data)
}
else{
    console.log(result.response.data);
}

}
}
}
  return (
    <>           
 <button onClick={handleShow} className='btn'><i class="fa-solid fa-pen-to-square text-info"></i></button>
 <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Row>
            <Col md={6}>
            <label htmlFor="image" className='text-center'><input id="image" type="file" style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}   />
                <img width={'100%'} src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="no image"/></label>
            </Col>
            <Col md={6}>
                <div className='d-flex justify-content-center align-items-center flex-column w-100'>
                    <div className='mb-3 w-100'>
                        <input type="text" value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})}  className='form-control' placeholder='Project Title' />
    
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" value={projectDetails.language} onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})} className='form-control' placeholder='Project Language' />
    
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}  className='form-control' placeholder='Project GitHub link' />
    
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})}   className='form-control' placeholder='Project Website Link' />
    
                    </div>
                    <div className='mb-3 w-100'>
                        <textarea type="text" value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} className='form-control' placeholder='Project Overview' />    
                    </div>
                </div>
            </Col>
         </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose1} >Cancel</Button>
          <Button variant="success" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject