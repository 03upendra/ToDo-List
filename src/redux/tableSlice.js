import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 tableData: null
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData: (state,action) => {
      state.tableData=action.payload;
    },

    addTodo:(state,action)=>{
      state.tableData.push(action.payload);
    }
    
  },
});

export const{setData, addTodo}=tableSlice.actions;

export default tableSlice.reducer;
