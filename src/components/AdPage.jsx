import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import apiSlice, { getAds, viewAd } from '../slices/apiSlice'
import {Routes,Route,useParams} from 'react-router-dom';

export default function AdPage() {
  let id = useParams().id
  let apiState = useSelector(state=>state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  useEffect(()=>{
    dispatch(viewAd(id))
  },[])
  return (
    <div>{apiState.currAd.title}</div>
  )
}
