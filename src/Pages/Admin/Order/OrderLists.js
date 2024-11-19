import React from "react";

import { useQuery } from "@tanstack/react-query";

const OrderLists = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["getAllOrderDetails"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/orders/getAllOrderDetails").then(
        (res) => res.json()
      ),
  });

  if (isPending) return <h1>Loading</h1>;

  if (error) return <h1>{error.message}</h1>;

  console.log(data);

  // const date = new Date(data)

  return (
    <div>
      <h1 className="text-xl text-center font-semibold mt-1 underline">
        OrderLists
      </h1>

      {data.map((item) => (
        <div className="card bg-base-100 w-full shadow-xl">
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
              <div className="badge badge-secondary">Delivered</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderLists;
