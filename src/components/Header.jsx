import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import apiSlice, { changePage } from '../slices/apiSlice';

export default function Header() {
  let dispatch = useDispatch(apiSlice)    
  return (
    <div>
    <h1>Drag Marketplace</h1>
    <div>
        <button onClick={()=>dispatch(changePage("login"))}>Login</button>
        <div></div>
        <button onClick={()=>dispatch(changePage("signup"))}>Sign-Up</button>
        
        <div className='sandwich' ></div>
    </div>
    </div>
  )
}
