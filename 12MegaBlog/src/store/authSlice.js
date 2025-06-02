import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status: false,   //user abi authenticate ni ha
    userData:null,
}
const authSlice=createSlice({
    name: "auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload.userData   //user data action.payload se ayega
        },
        logout:(state)=>{                //logout k liye just state
                state.status=false;
                state.userData=null;
        }
    }
})
export default authSlice.reducer
export const {login,logout}=authSlice.actions;       //ik reducer export kro or ik reducers