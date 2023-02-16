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

//======================================================================(Initial Data Loading)

  useEffect(() => {
    const loadData = async () => {
      try {
        let res = await axios.get(
          "https://mockend.com/03upendra/ToDo-List/Post"
        );

        //======(formating Date_Time)
        let data=res.data.map(ele => {
           return{...ele,tag:randomTag(),time_stamp:ele.time_stamp.substring(0,10),due_date:ele.due_date.substring(0,10)}
        });

        // console.log(new Date(data[0].time_stamp),data[0].time_stamp)
        dispatch(setData(data));
      } catch (e) {
        console.log(e);
      }
    };

    loadData();
  }, [dispatch]);

  //=====(selecting some random tags)
  const randomTag=()=>{
    let tag=['Education','Health','Sports','Tech'];
    const index1 = Math.floor(Math.random() * tag.length);
    const index2 = Math.floor(Math.random() * tag.length);
    const item =[ tag[index1],index1!==index2?tag[index2]:'SCIENCE'];
    return item;
  }
//=========================================================================


  return (
    <div className="App w-full min-h-screen bg-blue-400 text-white">
      <Navbar />
      <Routes>
        <Route exact path="/" element={ <TableToDo/> } />
        <Route exact path="/addTodo" element={ <AddTodo /> } />
      </Routes>
    </div>
  );
}
export default App;
