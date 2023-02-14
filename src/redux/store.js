import {configureStore } from "@reduxjs/toolkit";
import tableSlice from "./tableSlice.js";


const store = configureStore({
    reducer:{
        table: tableSlice
    }
});

export default store;