import {  createSlice } from "@reduxjs/toolkit";
import type { User } from "../../utils/inrterface/userInterface";



interface AuthState {
  token: string | null;
  user: User[] | null;
}


const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials(state, action) {
      // //console.log(action.payload);
      state.token = action.payload.token;
      // state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
    },
    setProfile(state,action){
      state.user = action.payload

    }
  },
 
});

export const { setCredentials, logout ,setProfile } = userSlice.actions;
export default userSlice.reducer;
