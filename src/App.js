import Table from "./components/Table";
import { Route, Routes } from "react-router-dom";
import AddTodo from "./components/AddTodo";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App w-full min-h-screen bg-black text-white">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Table />} />
        <Route exact path="/addTodo" element={<AddTodo />} />
      </Routes>
    </div>
  );
}
export default App;
