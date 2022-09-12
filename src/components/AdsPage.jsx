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

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiSlice, { getAds, viewAd } from '../slices/apiSlice'

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'



const theme = createTheme();

export default function AdsPage() {
  let goTo = useNavigate()
  let state = useSelector(state => state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  React.useEffect(() => {
    if(state.accessToken!==null){
      dispatch(getAds(state.accessToken))
    }
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     
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
     
    </ThemeProvider>
  );
}
