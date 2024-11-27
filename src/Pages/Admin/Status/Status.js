import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Status = () => {
  const navigate = useNavigate();
  const url = `${process.env.REACT_APP_apiLink}/api/v1/orders/getOrderTotalAmountByStatus`;

  // GET ALL ORDER DETAILS
  const { isPending, error, data, refetch } = useQuery({
    queryKey: [`getOrderTotalAmountByStatus`],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  console.log(data);

  const dataObject = data?.statusOrder?.reduce((acc, status) => {
    acc[status.deliveryStatus] = {
      totalAmount: status.totalAmount,
      documentCount: status.documentCount,
    };
    return acc;
  }, {});

  console.log(dataObject);

  return (
    <div>
      <div className="flex justify-center text-black">
        <div className="stats shadow-lg w-full mx-2 bg-[#f4e8fe] my-2">
          <div className="stat place-items-center">
            <div className="stat-title ">Total Received</div>
            {isPending ? (
              <span className="loading loading-spinner text-error"></span>
            ) : (
              <div className="stat-value ">
                {dataObject?.Delivered?.totalAmount || 0} ¥
              </div>
            )}

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
          onClick={() => navigate("/orderLists?orderStatus=Delivered")}
          class="card w-full bg-[#dcfce7] shadow-xl "
        >
          {/* <figure class="px-10 pt-10">
            <i class="fa-solid fa-users-between-lines"></i>
          </figure> */}
          <div class="card-body items-center text-center">
            <div className="stat-title ">Delivered</div>
            {isPending ? (
              <span className="loading loading-spinner text-error"></span>
            ) : (
              <h2 class="card-title">
                {dataObject?.Delivered?.documentCount || 0}
              </h2>
            )}
          </div>
        </div>

        <div
          onClick={() => navigate("/orderLists?orderType=Pre-Order")}
          class="card w-full bg-[#fff4de] shadow-xl text-black"
        >
          {/* <figure class="px-10 pt-10">
            <i class="fa-solid fa-users-between-lines"></i>
          </figure> */}
          <div class="card-body items-center text-center">
            <div className="stat-title ">Pre-Order</div>
            {isPending ? (
              <span className="loading loading-spinner text-error"></span>
            ) : (
              <h2 class="card-title">{data?.preOrder || 0}</h2>
            )}
          </div>
        </div>

        <div
          onClick={() => navigate("/orderLists?orderStatus=Absence")}
          class="card w-full bg-[#a1dff4] shadow-xl"
        >
          {/* <figure class="px-10 pt-10">
            <i class="fa-solid fa-users-between-lines"></i>
          </figure> */}
          <div class="card-body items-center text-center">
            <div className="stat-title">Absence</div>

            {isPending ? (
              <span className="loading loading-spinner text-error"></span>
            ) : (
              <h2 class="card-title">
                {dataObject?.Absence?.documentCount || 0}
              </h2>
            )}
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

      <div>
        <details className="collapse bg-base-200 mt-6">
          <summary className="collapse-title text-xl font-medium">
            Full Status
          </summary>
          <div className="collapse-content">
            {data?.statusOrder ? (
              data?.statusOrder?.map((status, key) => (
                <div key={key} className="flex justify-between">
                  <p>{status?.deliveryStatus}</p>
                  <p>{status?.documentCount}</p>
                </div>
              ))
            ) : (
              <p>No Data</p>
            )}
          </div>
        </details>
      </div>

      <div className="py-[30px]"></div>
    </div>
  );
};

export default Status;
