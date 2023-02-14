import React from "react";
import { setData } from "../redux/tableSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function Table() {
    
  const { tableData } = useSelector((state) => state.table);
  const dispatch = useDispatch();


  //======================================================================

  useEffect(() => {
    const loadData = async () => {
      try {
        let res = await axios.get(
          "https://mockend.com/03upendra/ToDo-List/Post"
        );
        dispatch(setData(res.data));
      } catch (e) {
        console.log(e);
      }
    };

    loadData();
  }, [dispatch]);


  //=======================================================================


  return (
    <div className="App bg-black text-white text-2xl">
      {tableData.map((ele, i) => {
        return <div key={i}>{ele.title}</div>;
      })}
    </div>
  );
}

export default Table;
