import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateNewOrder from "./Pages/Admin/Order/CreateNewOrder";
import OrderLists from "./Pages/Admin/Order/OrderLists";
import UpdateOrderDetails from "./Pages/Admin/Order/UpdateOrderDetails";
import OrderDetails from "./Pages/Admin/Order/OrderDetails";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/orderLists" element={<OrderLists />}></Route>
        <Route path="/createNewOrder" element={<CreateNewOrder />}></Route>
        <Route
          path="/updateOrderDetails/:orderId"
          element={<UpdateOrderDetails />}
        ></Route>

        <Route path="/orderDetails/:orderId" element={<OrderDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
