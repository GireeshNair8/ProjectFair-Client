import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../contexts/ContextShare';
function Header({dashboard}) {
  const {isAuthToken, setIsAuthToken}= useContext(isAuthTokenContext)
  const navigate= useNavigate()
  const handleLogout =()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthToken(false)
    //navigate to home page
    navigate('/')

  }
  return (
    <Navbar style={{backgroundColor:'orange'}}>
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:'none', color:'black'}}>
                <i class="fa-brands fa-stack-overflow fa-3x ms-3"></i>{''}Project Fair
            </Link>
          </Navbar.Brand>
          {
            dashboard &&
            <button onClick={handleLogout} className='btn btn-danger'>Logout <i class="fa-solid fa-power-off"></i></button>
          }
        </Container>
      </Navbar>
  )
}

export default Header