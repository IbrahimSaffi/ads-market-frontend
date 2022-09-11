
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import apiSlice, { getAds, viewAd } from '../slices/apiSlice'
import AdCard from '../components/AdCard'
import {Routes,Route,useNavigate} from 'react-router-dom';

export default function AdsPage() {
  let goTo = useNavigate()
  let state = useSelector(state=>state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  useEffect(()=>{
     dispatch(getAds(state.accessToken))
  },[])
  return (
    <div>
       <button onClick={()=>{
        if(state.user===null){
          goTo("auth/login")
        }
        else{
          goTo("/post-ad")
        }
       }} >Post new ad</button>
       {state.ads.map((ele,i)=><AdCard adIndex={i} key={i} />)}
    </div>
  )
}
