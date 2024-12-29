import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
const Navbar = () => {
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
        {localStorage.getItem('token')?<Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => alert("Signed Out")} // Replace with your logout functionality
        >
          <span onClick={()=>{
            localStorage.removeItem("token");

          }}>
            Sign Out
            </span>
        </Button>:<></>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
