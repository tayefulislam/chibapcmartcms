import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Shared/Header/Header";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-2">
      <Header></Header>

      <div className="flex justify-center text-black">
        <div className="stats shadow-lg w-full mx-2 bg-[#f4e8fe] my-2">
          <div className="stat place-items-center">
            <div className="stat-title ">Total Received</div>
            <div className="stat-value ">4234234 ¥</div>
            {/* <div className="stat-desc">From January 1st to February 1st</div> */}
          </div>

          {/* <div className="stat place-items-center">
            <div className="stat-title">Users</div>
            <div className="stat-value text-secondary">4,200</div>
            <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-2">
        <div
          onClick={() => navigate("/orderLists")}
          class="card w-full bg-[#dcfce7] shadow-xl "
        >
          {/* <figure class="px-10 pt-10">
            <i class="fa-solid fa-users-between-lines"></i>
          </figure> */}
          <div class="card-body items-center text-center">
            <div className="stat-title ">Delivered</div>
            <h2 class="card-title">34845</h2>
          </div>
        </div>

        <div
          onClick={() => navigate("/orderLists")}
          class="card w-full bg-[#fff4de] shadow-xl text-black"
        >
          {/* <figure class="px-10 pt-10">
            <i class="fa-solid fa-users-between-lines"></i>
          </figure> */}
          <div class="card-body items-center text-center">
            <div className="stat-title ">Pre-Order</div>
            <h2 class="card-title">524</h2>
          </div>
        </div>

        <div
          onClick={() => navigate("/orderLists")}
          class="card w-full bg-[#a1dff4] shadow-xl"
        >
          {/* <figure class="px-10 pt-10">
            <i class="fa-solid fa-users-between-lines"></i>
          </figure> */}
          <div class="card-body items-center text-center">
            <div className="stat-title ">Return</div>
            <h2 class="card-title">43</h2>
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
