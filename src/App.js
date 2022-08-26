import React, { useEffect } from 'react'
import './App.css';
import Header from './components/Header';
import {Routes,Route,useNavigate} from 'react-router-dom';
import AdPage from './components/AdPage';
import LoginPage from './components/LoginPage';
import AuthPage from './components/AuthPage';
import SignUpPage from './components/SignUpPage';
import UserPage from './components/UserPage';
import Settings from './components/Settings';
import Profile from './components/Profile';
import PostAd from './components/PostAd';
import AdsPage from './components/AdsPage';
import { useDispatch,useSelector } from 'react-redux';
import apiSlice, { getAds, viewProfile } from './slices/apiSlice';
import axiosClient from './apiConfig';

//Chrome will prevent cross origin request so install cors package
export default function App() {
  let apiState = useSelector(state=>state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  let goTo = useNavigate()
  useEffect(()=>{
    if(apiState.currPage===""){
     async function getData(){
        let res = await axiosClient.get("/ad")
        //  let resData = await res.json()
         console.log(res)
      }
      getData()

      // dispatch(getAds())
    }
    // else{
    //   console.log(apiState.currAd._id,`${apiState.currPage}/${apiState.currAd._id}`)
    //   goTo(`${apiState.currPage}/${apiState.currAd._id}`)
    // }
    // goTo(apiState.currPage)
  },[apiState.currPage])
  useEffect(()=>{
      dispatch(viewProfile())
  },[apiState.user])
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
        <Route path='settings' element={<Settings/>}/>
        <Route path='ad/:id' element={<AdPage/>}/>
        <Route path='user/:id' element={<UserPage/>}/>
        </Routes>
    </div>
  )
}
