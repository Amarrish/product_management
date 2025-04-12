import React from 'react'
import './ComponentStyle.css'

const Footer = () => {
  return (
    <>
        <div className='footer-container border'>
        <div className='m-3'>
                <h3>Read me</h3>
                <h6>Shops</h6>
                <h6>Links</h6>
            </div>

            <div>
                <h3>Gallery</h3>
                <h6>Collections</h6>
                <h6>Pages</h6>
                <h6>Contacts</h6>
            </div>

            <div className='m-3'>
            <h3>Services</h3>
                <h6>Info</h6>
                <input className='footerinput' style={{borderRight:'none', border:'none',padding:'5px', borderTopLeftRadius:'10px', borderBottomLeftRadius:'10px', outline:'none'}} type="text" placeholder='Your Email...'/>
                <button className='footerinput' style={{borderLeft:'none', border:'none',padding:'5px', backgroundColor:'red', color:'white', borderTopRightRadius:'10px', borderBottomRightRadius:'10px' }}>Subscribe</button>
                <div className='d-flex'>
                <div><i className="fa-brands fa-linkedin-in text-dark m-2"></i></div>
                <div><i className="fa-brands fa-github text-dark m-2"></i></div>
                <div><i className="fa-brands fa-instagram text-dark m-2"></i></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer