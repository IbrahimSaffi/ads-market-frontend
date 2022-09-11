import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import apiSlice,{ setProfileAds } from '../slices/apiSlice';
import {Routes,Route,useNavigate} from 'react-router-dom';

import AdCard from './AdCard';
export default function Profile() {
  let goTo = useNavigate()

  let dispatch = useDispatch(apiSlice)
  let apiState = useSelector(state => state.apiSlice)
  useEffect(()=>{
    if(apiState.profile===null){
      goTo("/auth/login")
    }
    else{
      console.log(apiState.profile.ads)
      dispatch(setProfileAds())
    }
  },[])
  return (
    <div>
      <h1>Ads You have posted</h1>
        {apiState.ads.map((ele,i)=>{
          return <AdCard adIndex={i} key={i} />
        })}
      </div>
  )
}
