
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import apiSlice, { getAds, viewAd } from '../slices/apiSlice'
import AdCard from '../components/AdCard'
import {Routes,Route,useNavigate} from 'react-router-dom';

export default function AdsPage() {
  let goTo = useNavigate()
  let apiState = useSelector(state=>state.apiSlice)
  let state = useSelector(state=>state.apiSlice)
  return (
    <div>
       <button onClick={()=>{
        if(apiState.user===null){
          goTo("auth/login")
        }
        else{
          goTo("auth/post-ad")
        }
       }} >Post new ad</button>
       {apiState.ads.map((ele,i)=><AdCard adIndex={i} key={i} />)}
    </div>
  )
}
