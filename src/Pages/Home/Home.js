import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-2">
        <div
          onClick={() => navigate("/createNewOrder")}
          class="card w-full bg-red-500 shadow-xl text-white"
        >
          {/* <figure class="px-10 pt-10">
            <i class="fa-solid fa-border-all"></i>
          </figure> */}
          <div class="card-body items-center text-center">
            <h2 class="card-title">Create New Order</h2>
          </div>
        </div>

        <div
          onClick={() => navigate("/orderLists")}
          class="card w-full bg-red-500 shadow-xl text-white"
        >
          {/* <figure class="px-10 pt-10">
            <i class="fa-solid fa-users-between-lines"></i>
          </figure> */}
          <div class="card-body items-center text-center">
            <h2 class="card-title">Order Lists</h2>
          </div>
        </div>

        {/* <div
          onClick={() => navigate("/login")}
          class="card w-full bg-red-500 shadow-xl text-white"
        >
          <figure class="px-10 pt-10">
            <i class="fa-solid fa-arrow-right-to-bracket"></i>
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">Donor Login</h2>
          </div>
        </div> */}
      </div>

      {/* <div className="flex justify-center items-center mt-12">
        <div
          onClick={() => navigate("/recentRequests")}
          class="card w-96 bg-red-500 shadow-xl text-white"
        >
          <figure class="px-10 pt-10">
            <i class="fa-solid fa-users-between-lines"></i>
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">Recent Requests</h2>
          </div>
        </div>
          </div> */}
    </div>
  );
};

export default Home;
