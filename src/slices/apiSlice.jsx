import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
export const getAds = createAsyncThunk(
    "ads / list",
    async () => {
        const ads = await fetch("http://localhost:8000/ad")
        return ads.json()
    }
)
export const viewAd = createAsyncThunk(
    "ads / view",
    async (id) => {
        console.log(id)
        const ad = await fetch(`http://localhost:8000/ad/${id}`)
        return ad.json()
    }
)
export const postAd = createAsyncThunk(
    "ads / post",
    async (data) => {
        let res = await fetch(`http://localhost:8000/ad/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
       if(res.status!==200){
        throw new Error(res)
       }
    }
)
export const createAccount = createAsyncThunk(
    "account / create",
    async (data) => {
        console.log(data)
        await fetch("http://localhost:8000/auth/signUp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }
)
export const login = createAsyncThunk(
    "account / login",
    async (data) => {
        console.log(data)
        let res = await fetch("http://localhost:8000/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        console.log(res.status)
      if (res.status!==200){
           throw new Error(res)
      }
      else{
        let resdata = await res.text()
        return resdata
      }
    }
)
export const viewProfile = createAsyncThunk(
    "account / view",
    // async (id) => {
    //         const profile = await fetch("http://localhost:8000/ad")
    //         return ads.json()
    // },
)

let mainSlice = createSlice({
    name: "apiSlice",
    initialState: {
        accessToken: localStorage.getItem("ACCESS_TOKEN"),
        ads: [],
        currAd: [],
        currPage: ""
    },
    reducers: {
       changePage: (state,action)=>{
           if(action.payload==="login"){
            state.currPage="/auth/login"
           }
           else if(action.payload==="signup"){
            state.currPage="/auth/signup"
           }
       }
    },
    extraReducers: (builder) => {
        //Getting all Ads
        builder.addCase(getAds.pending, (state, action) => {
            //Loading screen

        })
        builder.addCase(getAds.rejected, (state, action) => {
            //handle error

        })
        //View Ad
        builder.addCase(getAds.fulfilled, (state, action) => {
            state.ads = action.payload
        })
        builder.addCase(viewAd.pending, (state, action) => {
            //Loading screen

        })
        builder.addCase(viewAd.rejected, (state, action) => {
            //handle error
        })
        builder.addCase(viewAd.fulfilled, (state, action) => {
            state.currAd = action.payload
            state.currPage = `ad/${state.currAd._id}`
        })
        //Post Ad
        builder.addCase(postAd.pending, (state, action) => {
            //Loading screen

        })
        builder.addCase(postAd.rejected, (state, action) => {
          console.log(action.error)

        })
        builder.addCase(postAd.fulfilled, (state, action) => {
            //Fulfill Status
        })
        // Signup
        builder.addCase(createAccount.pending, (state, action) => {
            //Loading screen

        })
        builder.addCase(createAccount.rejected, (state, action) => {
            //handle error
        })
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.currPage =""
            
        })
        //Login
        builder.addCase(login.pending, (state, action) => {
            //Loading screen

        })
        builder.addCase(login.rejected, (state, action) => {
            //handle error
            // console.log("rejected")
            console.log("rejected",action.error)

        })
        builder.addCase(login.fulfilled, (state, action) => {
          state.currPage =""
        //   let temp = action.payload.split(" ")
          let payloadObj = JSON.parse(action.payload)
          localStorage.setItem("ACCESS_TOKEN",payloadObj.accessToken);
          localStorage.setItem("REFRESH_TOKEN",payloadObj.refreshToken);
        })   
         //View profile


        builder.addCase(viewProfile.pending, (state, action) => {
            //Loading screen

        })
        builder.addCase(viewProfile.rejected, (state, action) => {
            //handle error
        })
        builder.addCase(viewProfile.fulfilled, (state, action) => {
           
        })
    }
})
export const { changePage} = mainSlice.actions
export default mainSlice.reducer