import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

let url = `${process.env.REACT_APP_apiLink}/api/v1/orders/getAllOrderDetails`;
console.log(url);

const OrderLists = () => {
  const navigate = useNavigate();

  // GET ALL ORDER DETAILS
  const { isPending, error, data } = useQuery({
    queryKey: ["getAllOrderDetails"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  // handle loading
  if (isPending) return <h1>Loading</h1>;

  // handle error
  if (error) return <h1>{error.message}</h1>;

  return (
    <div>
      <h1 className="text-xl text-center font-semibold mt-1 underline">
        OrderLists
      </h1>

      {data.map((item) => (
        <div
          key={item._id}
          onClick={() => navigate(`/updateOrderDetails/${item._id}`)}
          className="card bg-base-100 w-full shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title">
              {item.customerId.customerName} | ¥ {item.totalAmount}
            </h2>
            <p>{item.itemsDetails}</p>
            <p>Delivery Date: {new Date(item.deliveryDate).toDateString()}</p>
            <p>Time Slot: {item.timeSlot}</p>

            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>

              {item.deliveryStatus === "Pending" ? (
                <div className="badge badge-secondary">Pending</div>
              ) : null}

              {item.deliveryStatus === "Delivered" ? (
                <div className="badge badge-success">Delivered</div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderLists;
