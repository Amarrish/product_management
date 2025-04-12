import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './PageStyle.css'
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../Services/allApi';

const LoginPage = () => {

   const [userData,setUserData] = useState({
          username:"",
          email:"",
          password:""
      })

       const navigate = useNavigate();

  const handlelogin = async(e)=>{
    e.preventDefault()
    const {email,password} = userData
    if( !email || !password){
        alert("Please fill the form completely")
    }else{
        // api call
        const res = await loginAPI({email,password})
        console.log(res);
        if(res.status===200){
        //    save res
        localStorage.setItem("existingUser",JSON.stringify(res.data.existingUser))
        // localStorage.setItem("Role",res.data.role)
        sessionStorage.setItem("token",res.data.token)
            // reset state
            setUserData({
                email:"",password:""
            })
            navigate('/dashboard')
        }else{
            alert(res.response.data)
        }
    }
}
  return (
    <div className='loginpage container'>
      <h1>Sign In</h1>

<Form className='loginform border'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})}/>
      </Form.Group>
      <p>Not a user!  <Link to={'/register'}>Register here</Link></p>
      <Button variant="primary" onClick={handlelogin} type="submit">
        Sign In
      </Button>
    </Form>
    </div>
  )
}

export default LoginPage