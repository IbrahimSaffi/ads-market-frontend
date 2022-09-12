import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
export const getAds = createAsyncThunk(
    "ads / list",
    async (token) => {
        console.log(token)
        let res = await fetch("https://marketbazar-backend.herokuapp.com/ads",{
            method:"GET",
            headers:{
                Authorization:"Bearer " + token

            }
        })
        if(res.status!==200){
            let e = await res.text()
            throw new Error(e)
        }
        else{
            return res.json()
        }
    }
)
export const viewAd = createAsyncThunk(
    "ads / view",
    async (id, { getState }) => {
        const state = getState(); 

        console.log(id)
        const res = await fetch(`https://marketbazar-backend.herokuapp.com/ads/${id}`,{
            method:"GET",
            headers:{
                Authorization:"Bearer " +  state.apiSlice.accessToken

            }
        })
        if(res.status!==200){
            let e = await res.text()
            throw new Error(e)
        }
        else{
            return res.json()
        }
    }
    
)
export const postAd = createAsyncThunk(
    "ads / post",
    async (data,{getState}) => {
        const state = getState(); 
        console.log(data)
        let res = await fetch(`https://marketbazar-backend.herokuapp.com/ads/add`, {
            method: 'POST',
            headers:{
                Authorization:"Bearer " + state.apiSlice.accessToken,
            },
            body: data,
        })
       if(res.status!==200){
        let e = await res.text()
        throw new Error(e)
       }
    }
)
export const createAccount = createAsyncThunk(
    "account / create",
    async (data) => {
        console.log(data)
       let res= await fetch("https://marketbazar-backend.herokuapp.com/auth/signUp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (res.status!==200){
            let e = await res.text()
            throw new Error(e)
       }
       else{
         let resdata = await res.text()
         return resdata
       }
    }
)
export const login = createAsyncThunk(
    "account / login",
    async (data) => {
        console.log(data)
        let res = await fetch("https://marketbazar-backend.herokuapp.com/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
      if (res.status!==200){
           let e = await res.text()
           throw new Error(e)
      }
      else{
        let resdata = await res.text()
        return resdata
      }
    }
)
export const getCategories = createAsyncThunk(
    "account / categories",
    async ( data, { getState }) => {
        const state = getState(); 
        const res = await fetch(`https://marketbazar-backend.herokuapp.com/category/`,{
            method:"GET",
            headers:{
                Authorization:"Bearer " +  state.apiSlice.accessToken
            }
        })
        if(res.status!==200){
            let e = await res.text()
            throw new Error(e)
        }
        else{

            return res.json()
        }
    },
)

let mainSlice = createSlice({
    name: "apiSlice",
    initialState: {
        accessToken: localStorage.getItem("ACCESS_TOKEN"),
        ads: [],
        currAd: [],
        profile:JSON.parse(localStorage.getItem("PROFILE")),
        categories:[],
        adAdded:false,
        loading:false,
        error:null
    },
    reducers: {
       setProfileAds(state,action){
          state.ads = state.profile.ads
       },
       reset(state,action){
        state.loading=false
        state.error=null
     }
    },
    extraReducers: (builder) => {
        //Getting all Ads
        builder.addCase(getAds.pending, (state, action) => {
            //Loading screen

        })
        builder.addCase(getAds.rejected, (state, action) => {
            //handle error
           console.log(action.error.message)
           state.error = action.error.message
        })
        //View Ad
        builder.addCase(getAds.fulfilled, (state, action) => {
            console.log(action.payload)
            state.ads = action.payload
           
        })
        builder.addCase(viewAd.pending, (state, action) => {
            //Loading screen

        })
        builder.addCase(viewAd.rejected, (state, action) => {
            //handle error
            console.log(action.error.message)
            state.error = action.error.message
            

        })
        builder.addCase(viewAd.fulfilled, (state, action) => {

            state.currAd = action.payload
            state.currPage = `ad/${state.currAd._id}`
        })
        //Post Ad
        builder.addCase(postAd.pending, (state, action) => {
            state.loading=true
        })
        builder.addCase(postAd.rejected, (state, action) => {
          console.log(action.error.message)
          state.error = action.error.message
          state.loading=false

        })
        builder.addCase(postAd.fulfilled, (state, action) => {
            state.adAdded = true
            state.loading=false
        })
        // Signup
        builder.addCase(createAccount.pending, (state, action) => {
            //Loading screen

        })
        builder.addCase(createAccount.rejected, (state, action) => {
            console.log(action.error.message)
            state.error = action.error.message
            

        })
        builder.addCase(createAccount.fulfilled, (state, action) => {
            
        })
        //Login
        builder.addCase(login.pending, (state, action) => {
            //Loading screen

        })
        builder.addCase(login.rejected, (state, action) => {
            console.log(action.error.message)
            state.error = action.error.message
            


        })
        builder.addCase(login.fulfilled, (state, action) => {
        
          let payloadObj = JSON.parse(action.payload)
          state.profile = payloadObj.profile
          state.accessToken = payloadObj.accessToken
          localStorage.setItem("ACCESS_TOKEN",payloadObj.accessToken);
          localStorage.setItem("REFRESH_TOKEN",payloadObj.refreshToken);
          localStorage.setItem("PROFILE",JSON.stringify( payloadObj.profile));
        })   
         //View profile
        builder.addCase(getCategories.pending, (state, action) => {
            //Loading screen

        })
        builder.addCase(getCategories.rejected, (state, action) => {
            console.log(action.error.message)
            state.error = action.error.message
            

        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }
})
export const { setProfileAds,reset} = mainSlice.actions
export default mainSlice.reducer