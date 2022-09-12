import React, { useEffect } from 'react'
import './App.css';
import Header from './components/Header';
import {Routes,Route,useNavigate} from 'react-router-dom';
import AdPage from './components/AdPage';
import LoginPage from './components/LoginPage';
import AuthPage from './components/AuthPage';
import SignUpPage from './components/SignUpPage';
import Profile from './components/Profile';
import PostAd from './components/PostAd';
import AdsPage from './components/AdsPage';
import { useDispatch,useSelector } from 'react-redux';
import apiSlice, { getAds } from './slices/apiSlice';

export default function App() {
  let apiState = useSelector(state=>state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  let goTo = useNavigate()

  useEffect(()=>{
    if(apiState.profile===null){
      goTo("auth/login")
    }
    else{
        goTo("/")
      }
  },[])
  return (
    
    <div>
      <Header/>
      <Routes>
         <Route path='/' element={<AdsPage/>}/>
         <Route path='/auth' element={<AuthPage/>}>
         <Route path='/auth/login' element={<LoginPage/>} />
         <Route path='/auth/signup' element={<SignUpPage/>} />
         </Route>
        <Route path='post-ad' element={<PostAd/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='ad/:id' element={<AdPage/>}/>
        </Routes>
    </div>
  )
}
