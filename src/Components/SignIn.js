import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
const SignIn = () => {
    const navigate = useNavigate();
useEffect(()=>{
    if(localStorage.getItem('token'))
    {
        navigate('/dashboard');
    }
},[])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
        
        const response = await axios.post("http://localhost:5000/login/", {
            "email":email,
            "password":password
        });
        
        // Save JWT token to localStorage or context
      const token = response.data.token;
      localStorage.setItem("token", token);
      setSuccess("SignIn successful!");
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "SignIn failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
        gap: 2,
      }}
    >
      <Typography variant="h4">SignIn</Typography>

      {/* Error/Success Messages */}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {/* SignIn Form */}
      <Box
        component="form"
        onSubmit={handleSignIn}
        sx={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email ID"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          SignIn
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
