import React,{useContext} from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import context from '../Context/useContext';
const Navbar = () => {
  const navigate=useNavigate();
  const {login,setLogin}=useContext(context);
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Section (Dashboard and Task List) */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
          >
            <Link to='/' style={{textDecoration:"none",color:"white"}}>
            Home
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
          >
            <Link to='/dashboard' style={{textDecoration:"none",color:"white"}}>
            Dashboard
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
          >
            <Link to='/tasklist' style={{textDecoration:"none",color:"white"}}>
            Task List
            </Link>
            
          </Typography>
        </Box>

        {/* Right Section (Sign Out Button) */}
        {login?<Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={()=>{
            localStorage.removeItem("token");
            setLogin(false);
          }} // Replace with your logout functionality
        >
          <span>
            Sign Out
            </span>
        </Button>:<Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={()=>{
            navigate('/signup')
          }} // Replace with your logout functionality
        >
          <span>
            Sign Up
            </span>
        </Button>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
