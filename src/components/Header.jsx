import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import apiSlice, { changePage } from '../slices/apiSlice';
import {Routes,Route,useNavigate} from 'react-router-dom';

export default function Header() {
  // let dispatch = useDispatch(apiSlice)   
   let goTo = useNavigate()
  return (
    <div>
    <h1>Drag Marketplace</h1>
    <div>
        <button onClick={()=>goTo("/auth/login")}>Login</button>
        <div></div>
        <button onClick={()=>goTo("/auth/signup")}>Sign-Up</button>
        
        <div className='sandwich' ></div>
    </div>
    </div>
  )
}
