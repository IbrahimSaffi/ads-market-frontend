import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import apiSlice, { getAds, viewAd } from '../slices/apiSlice'
import {Routes,Route,useParams} from 'react-router-dom';
import AdCard from './AdCard';

export default function AdPage() {
  let id = useParams().id
  let apiState = useSelector(state=>state.apiSlice)
  let dispatch = useDispatch(apiSlice)
  useEffect(()=>{
    dispatch(viewAd(id))
  },[])
  return (
    <div className='view-ad' >
      {apiState.ads.map((ele,i)=>{
        if(ele._id===id){
         return <div>
          <img className='img-view' src={ele.img!=="No Image"?ele.img:"../../images/NoImage.jpg"} alt="" srcset="" />
            <h1>{ele.title}</h1>
            <p>{ele.description}</p>
            <p>{ele.category.name}</p>
            <p>{ele.price}</p>
            <p>{ele.seller.name}</p>
            {/* <p>{ele.buyer.name}</p> */}
            {/* {ele.interestedBuyers.map(ele=>{
              <div>{ele}</div>
            })} */}
         </div>
        }
        else{
          return null
        }

      })}

      </div>
  )
}
