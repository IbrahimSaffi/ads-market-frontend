import React from 'react'
import { useDispatch,useSelector } from 'react-redux'

export default function AdPage() {
  let apiState = useSelector(state=>state.apiSlice)

  return (
    <div>{apiState.currAd.title}</div>
  )
}
