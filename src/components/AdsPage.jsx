import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiSlice, { getAds, viewAd } from '../slices/apiSlice'
import AdCard from '../components/AdCard'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }


const theme = createTheme();

export default function AdsPage() {
  let goTo = useNavigate()
  let state = useSelector(state => state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  React.useEffect(() => {
    dispatch(getAds(state.accessToken))
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Available Ads
            </Typography>
            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography> */}
            {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack> */}
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {state.ads.map((ad, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    // sx={{
                    //   pt: '9%',
                    // }}
                    image={ad.img === "No Image" ? "../../images/NoImage.jpg" : ad.img}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {ad.title}
                    </Typography>
                    <Typography>
                      {ad.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => {
                      goTo(`ad/${state.ads[i]._id}`)
                    }} size="small">View</Button>
                    {/* <Button size="small">Edit</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button sx={{mx:"50%" ,width: '20%'}}  onClick={()=>{
        if(state.user===null){
          goTo("auth/login")
        }
        else{
          goTo("/post-ad")
        }
       }} >Post new ad</Button>
        </Container>
      </main>
      {/* Footer */}
      {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
         <Copyright /> 
      </Box> */}
      {/* End footer */}
    </ThemeProvider>
  );
}
// import React, { useEffect, useState } from 'react'
// import { useDispatch,useSelector } from 'react-redux'
// import apiSlice, { getAds, viewAd } from '../slices/apiSlice'
// import AdCard from '../components/AdCard'
// import {Routes,Route,useNavigate} from 'react-router-dom';

// export default function AdsPage() {
//   let goTo = useNavigate()
//   let state = useSelector(state=>state.apiSlice)
//   let dispatch = useDispatch(apiSlice)
//   useEffect(()=>{
//      dispatch(getAds(state.accessToken))
//   },[])
//   return (
//     <div>
//        <button onClick={()=>{
//         if(state.user===null){
//           goTo("auth/login")
//         }
//         else{
//           goTo("/post-ad")
//         }
//        }} >Post new ad</button>
//        {state.ads.map((ele,i)=><AdCard adIndex={i} key={i} />)}
//     </div>
//   )
// }
