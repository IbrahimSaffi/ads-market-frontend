import React from 'react'
import { useSelector } from 'react-redux';

import {  useNavigate } from 'react-router-dom';
import { AppBar, Button, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material';

export default function Header() {
  let state = useSelector(state=>state.apiSlice)
  let goTo = useNavigate()
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar style={{display:"flex",justifyContent:"space-between"}} >
          <Typography variant="h6" color="inherit" noWrap>
            Drag Marketplace
          </Typography>
          {state.profile===null?<div>
            <Button style={{color:"white",outlineColor:"white"}}variant="outlined" onClick={() => goTo("/auth/login")}>Login</Button>
            <Button style={{color:"white",outlineColor:"white"  }} variant="outlined" onClick={() => goTo("/auth/signup")}>Sign-Up</Button>
          </div>:<div>
            <Button style={{color:"white",outlineColor:"white"}}variant="outlined" onClick={() => goTo("/auth/login")}>Logout</Button>
            {/* <Button style={{color:"white",outlineColor:"white"  }} variant="outlined" onClick={() => goTo("/profile")}>View Profile</Button> */}
          </div>}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}
