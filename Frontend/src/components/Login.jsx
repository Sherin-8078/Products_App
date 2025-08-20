import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axiosInstance from '../axiosintercepter';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const[form,setForm]=useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  function capValue(e){
    e.preventDefault()
    axiosInstance.post('http://localhost:5000/user/login',form)
    .then((res)=>{
            alert(res.data.message)
            if(res.data.userToken){
              localStorage.setItem("token",res.data.userToken)
                navigate('/')
            }
        })
        .catch((err)=>{
            console.error(err)
            alert("Invalid credentials or server error")
            navigate('/login')
        })


  }

  
  return (
    <>
      <div style={{textAlign:'center',marginTop:'200px',}}>
        <h1>Login</h1>
        <TextField 
        id="outlined-basic" 
        label="E-mail" 
        variant="outlined"
        value={form.email}
              onChange={(e)=>
            {setForm({...form,email:e.target.value})
        }
          } /><br /><br />
      <TextField 
      id="outlined-basic" 
      label="Password" 
      variant="outlined"
      value={form.password}
              onChange={(e)=>
            {setForm({...form,password:e.target.value})
        }
          } /><br /><br />
      <Button variant="contained" onClick={capValue}>Login</Button>
      </div>
    </>
  )
}

export default Login