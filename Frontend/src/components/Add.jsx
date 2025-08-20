import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation ,useNavigate} from 'react-router-dom';
import axiosInstance from '../axiosintercepter';

const Add = () => {
    const[product,setProduct]=useState({
      title:"",
      description:"",
      status:"",
      image:""
    })
  const handleChange=(e)=>{
    setProduct({...product,
      [e.target.name]:e.target.value
    })
  }
  const location = useLocation()
  const navigate = useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(location.state!=null){
       axiosInstance.put(`http://localhost:5000/product/update/${location.state.product._id}`,product)
    .then((res)=>{
      setProduct({
        title:"",
        description:"",
        status:"",
        image:""
      })
      navigate('/')
    })
    .catch((err)=>{
      console.error(err)
    })



    }else{
      axiosInstance.post('http://localhost:5000/product/add',product)
    .then((res)=>{
      setProduct({
        title:"",
        description:"",
        status:"",
        image:""
      })
      navigate('/')
    })
    .catch((err)=>{
      console.error(err)
    })
  }
    }
    useEffect(()=>{
    if(location.state!=null){
      setProduct({...product,
        title:location.state.product.title,
        description:location.state.product.description,
        status:location.state.product.status,
        image:location.state.product.image

      })

    }
  },[])
    
  
  return (
    <div style={{textAlign:'center',marginTop:'200px',}}>
        <h1>{location.state?"Update Product" : "Add Product" }</h1>
       <form onSubmit={handleSubmit}>
         <TextField id="outlined-basic" label="Product-name" variant="outlined" name='title' value={product.title} onChange={handleChange} required/><br /><br />
         <TextField id="outlined-basic" label="Product-description" variant="outlined" name='description' value={product.description} onChange={handleChange} required/><br /><br />
         <TextField id="outlined-basic" label="Product-status" variant="outlined" name='status' value={product.status} onChange={handleChange} required/><br /><br />
         <TextField id="outlined-basic" label="Product-image_URL" variant="outlined" name='image' value={product.image} onChange={handleChange}required/><br /><br />

      <Button variant="contained" type='submit'>{location.state?"Update" : "Add" }</Button>
       </form>
      </div>
  )
}

export default Add