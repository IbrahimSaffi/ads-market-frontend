import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import apiSlice, { viewAd } from '../slices/apiSlice'

export default function AdCard({adIndex}) {
  let apiState = useSelector(state=>state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  
   return (
    <div>
       {apiState.ads[adIndex].title}
       <button onClick={()=>dispatch(viewAd(apiState.ads[adIndex]._id))} >View Ad</button>

    </div>
  )
}
