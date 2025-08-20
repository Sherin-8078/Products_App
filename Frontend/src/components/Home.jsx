import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosintercepter';

const Home = () => {
    
    const [products,setProducts] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/product',products)
        .then((res)=>{
            setProducts(res.data)

        })
        .catch((err)=>{
            console.error(err)
        })
    },[])

    const deleteProduct=(_id)=>{
      axiosInstance.delete(`http://localhost:5000/product/delete/${_id}`)
      .then(()=>{
        window.location.reload();

      })
      .catch((err)=>{
        console.error(err)
      })
    }
    const navigate = useNavigate()
    const updateProduct=(product)=>{
      navigate('/add',{state:{product}})
    }
    const token = localStorage.getItem("token")
return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {products.map((product) => (
        <Card sx={{ maxWidth: 390, margin: '35px' }} key={product._id}>
          <CardMedia
            sx={{ height: 340 }}
            image={product.image}  
            title={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product.description}
            </Typography>
            <Typography variant="body2" sx={{ color: 'green',fontSize:'20px' }}>
              {product.status}
            </Typography>
          </CardContent>
          <CardActions>
            {
              token && (
                <>
                <Button size="small" onClick={()=>{updateProduct(product)}}>Update</Button>
            <Button size="small" onClick={()=>{deleteProduct(product._id)}}>Delete</Button>
                </>
              )
            }
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
  
}

export default Home