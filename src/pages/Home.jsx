import React, { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import titleImage from '../Assets/computer.jpg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'
function Home() {
  const[homeProject,setHomeProject]=useState([])
  const [isLogin, setIsLogin]= useState(false)
  const gethomeProject= async()=>{
    const result= await homeProjectAPI()
    console.log(result.data);
    setHomeProject(result.data)
  }
  
  useEffect(()=>{
if(sessionStorage.getItem("token")){
  setIsLogin(true)
}else{
  setIsLogin(false)
}
  },[])

  useEffect(()=>{
  gethomeProject()
  },[])
  console.log(isLogin);
  return (
    <>
    <div style={{width:'100%', height:'100vh', backgroundColor:'orange'}}>
    <div className='container-fluid rounded'>
      <Row className='align-items-center p-5'>
        <Col sm={12} md={6}>
          <h1 style={{fontSize:'100px', color:'white'}}>Project Fair</h1>
          <p>One stop destination for all software development projects</p>
          {isLogin?<Link to={'/dashboard'} className='btn btn-success rounded'>Manage Projects<i class='fa-solid fa-arrow-right ms-3'></i></Link>
          :<Link to={'/login'} className='btn btn-success rounded'>Get Started <i class='fa-solid fa-arrow-right ms-3'></i></Link>}
        </Col>
        <Col sm={12} md={6}>
          <img src={titleImage} alt="no-image" className='w-75' style={{marginTop:'100px'}}/>
          </Col>
      </Row>
        
    </div>
    </div>
    <div className='all-project mt-5'>
      <h1 className='text-center mt-5'>Explore Our Projects</h1>
      <marquee scrollamount={20} className="mt-5">
        <div className='d-flex'>
          {homeProject?.length>0?
        homeProject.map((item)=>(<div className='ms-5' style={{width:'500px'}}>
          <ProjectCard project={item} />
          </div>))
          :null}
          </div>
      </marquee>
      <div className='text-center mt-5'>
        <Link to={'/project'}>See More Projects</Link>
      </div>
      </div>
</>
  
  )
}

export default Home