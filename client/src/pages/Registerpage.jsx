import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './PageStyle.css'
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../Services/allApi';

const Registerpage = () => {

    const [userData,setUserData] = useState({
        username:"",
        email:"",
        password:""
    })

    const navigate = useNavigate();

    const handleRegister = async(e)=>{
        e.preventDefault()
        console.log(userData);
        
        const {username,email,password} = userData;

        if(!username || !email || !password){
            alert("Please fill the form completely")
        }else{
            // api call
            const res = await registerAPI(userData)
            console.log(res);
            if(res.status===200){
                console.log(res.data);
                alert(`${res.data.username} has successfully registered...`)
               
                setUserData({
                    username:"",email:"",password:""
                })
                navigate('/login')
            }else{
                alert(res.response.data)
            }
        }
    }
  return (
    <div>
        <div className='registerpage container'>
            <h1>Registration</h1>

<Form className='registerform border'>

<Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}/>
      </Form.Group>
      <p>Already a user!  <Link to={'/login'}>Login here</Link></p>
      <Button variant="primary" type="submit" onClick={handleRegister} >
        Register
      </Button>
    </Form>
    </div>
    </div>
  )
}

export default Registerpage