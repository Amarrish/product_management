import React from 'react'
import './PageStyle.css'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className='container homepage'>
        <div className="homedesc">
            <p>Product Management is the strategic process of developing, launching, and continuously improving a product to meet customer needs and achieve business goals. It involves: Identifying market opportunities Defining product vision and roadmap Collaborating with cross-functional teams (like design, engineering, and marketing) Prioritizing features and user needs Tracking product performance and feedback A Product Manager acts as the bridge between the business, user, and tech, ensuring the product delivers value at every stage of its lifecycle.</p>
            <Link to={'/login'}><button>Get Started</button></Link>
        </div>

        <div className="homeimage">
            <div className="firstimg">
                <img className='img-fluid' src="https://media.licdn.com/dms/image/v2/D4E12AQHs2av0jpbtYA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1681372887989?e=2147483647&v=beta&t=HsE9vWLUY3O7alR-XxaR4dguBdEbFu3SE-iy5A0EGMM" alt="" />
            </div>

            <div className="product-feature border">
                <h3>Product Management Features</h3>
                <p>1. Product Strategy & Vision</p>
                <p>2. Market & User Research</p>
                <p>3. Product Roadmap</p>
                <p>4. Feature Planning & Prioritization</p>
                <p>5. Cross-functional Collaboration</p>
                <p></p>
            </div>
        </div>
    </div>
  )
}

export default Homepage