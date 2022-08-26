import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/uiSlice";
import apiSlice from "./slices/apiSlice";

const store = configureStore({
  reducer: {
      uiSlice:uiSlice,
      apiSlice:apiSlice,
  }
});
export default store