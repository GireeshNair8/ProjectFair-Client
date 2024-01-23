import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext } from '../contexts/ContextShare';

function AddProject() {
  //to hold the value of the image url
    const[preview, setPreview]=useState("")
    
    const{addProjectResponse, setAddProjectResponse}= useContext(addProjectResponseContext)

    const [projectDetails, setProjectDetails]= useState({title:"",language:"",github:"",website:"",overview:"",projectImage:""})
        const [show, setShow] = useState(false);
        //state to hold the token
        const [token,setToken]=useState("")
        const handleClose = () => {setShow(false);
        handleClose1()
        }
    const handleShow = () => setShow(true);
    console.log(projectDetails);
    const handleClose1= () =>{
      setProjectDetails({title:"",language:"",github:"",website:"",overview:""})
      setPreview("")
    }
useEffect(()=>{
  if(projectDetails.projectImage)
  {(setPreview(URL.createObjectURL(projectDetails.projectImage)))
}else{
  setPreview("")
}},[projectDetails.projectImage])

useEffect(()=>{
if(sessionStorage.getItem("token")){
  setToken(sessionStorage.getItem("token"))
}
else{
  setToken("")
}},[])

 //add project
 const handleAdd= async(e)=>{
 e.preventDefault()
 const{title,language,github,website,overview,projectImage}=projectDetails
if(!title||!language||!github||!website||!overview||!projectImage){
  toast.warning('Please fill the form completely')
} 
else{
  //reqBody
  //1)create object for formData- since we have uploaded content
  const reqBody= new FormData()
  //2)add data to formData- append()
  reqBody.append("title",title)
  reqBody.append("language",language)
  reqBody.append("github",github)
  reqBody.append("website",website)
  reqBody.append("overview",overview)
  reqBody.append("projectImage",projectImage)

  if(token){
    const reqHeader= {
    "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
  }
  const result= await addProjectAPI(reqBody,reqHeader)
  console.log(result);
  
  if(result.status===200){
    console.log(result.data);
    toast.success('Project added successfully')
    handleClose()
    //context
    setAddProjectResponse(result.data)
  }
  else{
    console.log(result.response.data);
  }

}

}
}
  return (
<>
<Button variant="success" onClick={handleShow}>
Add Project</Button>

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
            <label htmlFor="image" className='text-center'><input id="image" type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                <img width={'100%'} src={preview?preview:"https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="no image"/></label>
            </Col>
            <Col md={6}>
                <div className='d-flex justify-content-center align-items-center flex-column w-100'>
                    <div className='mb-3 w-100'>
                        <input type="text" value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}  className='form-control' placeholder='Project Title' />
    
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}  className='form-control' placeholder='Project Language' />
    
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}  className='form-control' placeholder='Project GitHub link' />
    
                    </div>
                    <div className='mb-3 w-100'>
                        <input type="text" value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}  className='form-control' placeholder='Project Website Link' />
    
                    </div>
                    <div className='mb-3 w-100'>
                        <textarea type="text" value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}  className='form-control' placeholder='Project Overview' />    
                    </div>
                </div>
            </Col>
         </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose1}>Cancel</Button>
          <Button variant="success" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>

</>  
)
}

export default AddProject