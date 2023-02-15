import TableToDo from "./components/TableToDo";
import { Route, Routes } from "react-router-dom";
import AddTodo from "./components/AddTodo";
import Navbar from "./components/Navbar";
import { setData } from "./redux/tableSlice";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import axios from "axios";

function App() {

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
    <div className="App w-full min-h-screen bg-black text-white">
      <Navbar />
      {/* {tableData && <div>{tableData[0].title}</div>} */}
      <Routes>
        <Route exact path="/" element={ <TableToDo/> } />
        <Route exact path="/addTodo" element={ <AddTodo /> } />
      </Routes>
    </div>
  );
}
export default App;
