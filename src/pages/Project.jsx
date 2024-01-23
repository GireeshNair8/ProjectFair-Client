import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'
function Project() {
  const [allProject, setAllProject]= useState([])
  const[searchKey, setSearchKey]= useState("")
  const[isToken, setIsToken]= useState(false)
  const getAllProject= async()=>{
  
    if(sessionStorage.getItem("token")){
      const token= sessionStorage.getItem("token")
      const reqHeader= {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
  const result= await allProjectAPI(searchKey,reqHeader)
  console.log(result.data);
  if(result.status===200){
    setAllProject(result.data)
  }
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
<div style={{marginTop:'100px'}} className='text-center'>
<h1>All Project</h1>  
<div className="d-flex justify-content-center align-items-center mt-5">
  <div className="d-flex w-25">
    <input type="text" value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} className='form-control' placeholder='Search using Technologies'></input>
    <i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{marginLeft:'-40px' ,color:'lightgrey'}}></i>
  </div>
</div>
</div>
<Row className='mt-5 container-fluid'>
  {allProject?.length>0?
  allProject?.map((item)=>(<Col classname='mb-5' sm={12} md={6} lg={4}>
    <ProjectCard project={item}/>
  </Col>)):
  <div>
    {isToken?<p className='fs-3 text-danger text-center'>Sorry no such project currently available</p>:
    <div className='d-flex justify-content-center align-items-center flex-column'>
      <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" height={'200px'} width={'200px'} alt="login gif" />
      <p className='text-danger fw-3 fs-3 mt-5'>Please <Link style={{textDecoration:"none"}} className='text-info' to={'/login'}>Login</Link> to view more projects</p></div>}
  </div>
}
</Row>
</>
    )
}

export default Project