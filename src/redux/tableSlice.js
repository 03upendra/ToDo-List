import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 tableData: null
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    //set
    setData: (state,action) => {

        state.tableData=action.payload;
    },
    //update
    addTodo:(state,action)=>{
      state.tableData.push(action.payload);
    },
    //delete
    deleteToDo:(state,action)=>{
      state.tableData.forEach((ele,i) => {
        if(ele.id===action.payload)
        state.tableData.splice(i,1);
      });
    },


    
  },
});

export const{setData, addTodo, deleteToDo}=tableSlice.actions;

export default tableSlice.reducer;
