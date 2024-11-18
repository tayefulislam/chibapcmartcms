import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateNewOrder from "./Pages/Admin/Order/CreateNewOrder";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Routes>
        <Route path="/createNewOrder" element={<CreateNewOrder />}></Route>
      </Routes>
    </div>
  );
}

export default App;
