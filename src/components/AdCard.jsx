import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import apiSlice, { viewAd } from '../slices/apiSlice'
import {Routes,Route,useNavigate} from 'react-router-dom';

export default function AdCard({adIndex}) {
  let goTo = useNavigate()
  let apiState = useSelector(state=>state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  console.log(apiState.ads[adIndex])
   return (
    <div>
       {apiState.ads[adIndex].title}
       <button onClick={()=>
       {
         goTo(`ad/${apiState.ads[adIndex]._id}`)
       }
        } >View Ad</button>

    </div>
  )
}
