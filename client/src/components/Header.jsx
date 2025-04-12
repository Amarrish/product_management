import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './ComponentStyle.css'

const Header = () => {
  return (
    <>
         <Navbar className="Navbar border">
        <Container className='container'>
          <Navbar.Brand>
          <i className="fa-brands fa-product-hunt fa-fade fa-2xl"></i>
           <Link to={'/'} className='logo' style={{textDecoration:'none'}}>roduct Management</Link> 
          </Navbar.Brand>

            
                <div className='leftside'>
                    <p>Contact</p> 
                    <p>Careers</p> 
                    <p>Blog</p>
                </div>
            

        </Container>
      </Navbar>
    
    </>
  )
}

export default Header