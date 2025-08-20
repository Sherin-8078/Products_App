import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link,useNavigate } from 'react-router-dom';

const Navbar = () => {
  
const navigate = useNavigate()
const token = localStorage.getItem("token")
 function tokenManage(){
 
    localStorage.removeItem("token")
    navigate('/')
}

  return (
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
           <b> Product App</b>
          </Typography>
          <Link to="/"><Button color="inherit" style={{color:'white'}}>Home</Button></Link>
         {
          token && (
            <>
             <Link to="/add"><Button color="inherit" style={{color:'white'}}>Add Product</Button></Link>
              <Button color="inherit" style={{color:'white'}} onClick={tokenManage}>Logout</Button>
            </>
          )
         }
         {
          !token && (
            <>
             <Link to='/login'><Button color="inherit" style={{color:'white'}} >Login</Button></Link>
            
            </>
          )
         }
          
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar