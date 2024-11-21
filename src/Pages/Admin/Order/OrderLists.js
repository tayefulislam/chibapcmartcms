import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

let url = `${process.env.REACT_APP_apiLink}/api/v1/orders/getAllOrderDetails`;
// console.log(url);

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

  console.log(data);

  return (
    <div className="mx-2">
      <h1 className="text-xl text-center font-semibold mt-1 underline">
        OrderLists
      </h1>

      {data.map((item) => (
        <div
          key={item?._id}
          onClick={() => navigate(`/orderDetails/${item?._id}`)}
          className=" bg-base-100 w-full "
        >
          <div className="border-t-4 border-blue-500 my-4"></div>
          <div className="flex justify-between mt-2  text-2xl">
            <p className="font-semibold">{item?.customerId?.customerName}</p>
            <p className="font-extrabold">¥ {item?.totalAmount}</p>
          </div>
          <div className="flex justify-between">
            <p>Order : {item?.orderId}</p>

            <div className="badge badge-outline font-semibold">
              {item?.orderType === "Regular" ? "Regular" : "Pre-Order"}
            </div>

            {item?.deliveryStatus === "Pending" ? (
              <div className="badge badge-secondary">Pending</div>
            ) : null}

            {item?.deliveryStatus === "Delivered" ? (
              <div className="badge badge-success text-neutral-50">
                Delivered
              </div>
            ) : null}

            {item?.deliveryStatus === "Redelivery Done" ? (
              <div className="badge badge-accent text-neutral-50">
                Redelivery Done
              </div>
            ) : null}

            {item?.deliveryStatus === "Returned" ? (
              <div className="badge badge-error text-neutral-50">Returned</div>
            ) : null}

            {item?.deliveryStatus === "Out for delivery" ? (
              <div className="badge badge-warning text-neutral-50">
                Out for delivery
              </div>
            ) : null}

            {item?.deliveryStatus === "Absence" ? (
              <div className="badge badge-error text-neutral-50">Absence</div>
            ) : null}

            {item?.deliveryStatus === "Reached Post Office" ? (
              <div className="badge badge-info text-neutral-50">
                Reached Post Office
              </div>
            ) : null}

            {item?.deliveryStatus === "Reached Post Office" ? (
              <div className="badge badge-info text-neutral-50">
                Reached Post Office
              </div>
            ) : null}

            {item?.deliveryStatus === "En route" ? (
              <div className="badge badge-info text-neutral-50">En route</div>
            ) : null}

            {item?.deliveryStatus === "Posting/Collection" ? (
              <div className="badge badge-info text-neutral-50">
                Posting/Collection
              </div>
            ) : null}

            {item?.deliveryStatus === "Investigation" ? (
              <div className="badge badge-error text-neutral-50">
                Investigation
              </div>
            ) : null}
          </div>

          <div className="font-semibold">
            <div>
              {item?.customerId?.postalCode ? (
                <div>
                  <p>〒 {item?.customerId?.postalCode}</p>
                </div>
              ) : null}
            </div>

            <div>
              {/* {item?.customerId?.address ? (
                <div>
                  <p>{item?.customerId?.address}</p>
                </div>
              ) : null} */}
              {/* {item?.customerId?.phoneNumber ? (
                <div>
                  <p>{item?.customerId?.phoneNumber} </p>
                </div>
              ) : null} */}
            </div>
            {item?.deliveryDate && item?.timeSlot ? (
              <div>
                <p className="flex">
                  Delivery Date :{" "}
                  <h1> {new Date(item?.deliveryDate).toDateString()}</h1> |
                  {" Time : "}
                  {item?.timeSlot}
                </p>
              </div>
            ) : null}
          </div>
          {/* <div className="card-body">
            <h2 className="card-title">
              {item?.customerId?.customerName} | ¥ {item?.totalAmount}
            </h2>
            {item?.itemsDetails?.map((item, key) => (
              <div className="font-thin" key={key}>
                <p>{item?.itemName}</p>
              </div>
            ))}
            <p>Delivery Date: {new Date(item?.deliveryDate).toDateString()}</p>
            <p>Time Slot: {item?.timeSlot}</p>

            <div className="card-actions justify-end">
              <div className="badge badge-outline font-semibold">
                {item?.orderType === "Regular" ? "Regular" : "Pre-Order"}
              </div>

              {item?.deliveryStatus === "Pending" ? (
                <div className="badge badge-secondary">Pending</div>
              ) : null}

              {item?.deliveryStatus === "Delivered" ? (
                <div className="badge badge-success">Delivered</div>
              ) : null}
            </div>
          </div> */}
        </div>
      ))}
      <div className="border-t-4 border-rose-600 my-4"></div>
    </div>
  );
};

export default OrderLists;
