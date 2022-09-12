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
import Loading from './components/Loading';

export default function App() {
  let apiState = useSelector(state=>state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  let goTo = useNavigate()

  useEffect(()=>{
    if(apiState.accessToken===null){
      goTo("auth/login")
    }
    else{
        goTo("/")
      }
  },[])
  useEffect(()=>{
     if(apiState.profile!==null){
      console.log("123")
      goTo("/")
     }
  },[apiState.profile])
  useEffect(()=>{
    if(apiState.adAdded){
     console.log("1235")
     goTo("/")
    }
 },[apiState.adAdded])
 useEffect(()=>{
  if(apiState.loading){
   goTo("/loading")
  }
},[apiState.loading])
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
        <Route path='/loading' element={<Loading/>}/>
        </Routes>
    </div>
  )
}
