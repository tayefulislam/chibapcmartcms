import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

let url = `${process.env.REACT_APP_apiLink}/api/v1/orders/getAllOrderDetails`;
// console.log(url);

const OrderLists = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();

  const fetchOrders = async ({ page, limit }) => {
    const res = await fetch(
      `${process.env.REACT_APP_apiLink}/api/v1/orders/getAllOrderDetails?page=${page}&limit=${limit}`
    );
    return res.json();
  };

  let { isPending, error, data } = useQuery({
    queryKey: ["getAllOrderDetails", { page, limit }],
    queryFn: () => fetchOrders({ page, limit }),
    keepPreviousData: true,
  });

  // handle loading
  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex  w-52 flex-col gap-4">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );

  // handle error
  if (error) return <h1>{error.message}</h1>;

  const handlePageChange = (event) => {
    const newPage = parseInt(event.target.value, 10);
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  // All Available Items

  let items = data?.result;

  return (
    <div className="mx-2">
      <h1 className="text-xl text-center font-semibold mt-1 underline">
        OrderLists
      </h1>
      {items.map((item) => (
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

            {item?.deliveryStatus === "Cancelled" ? (
              <div className="badge badge-error text-neutral-50">Cancelled</div>
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

            {item?.deliveryStatus === "Created" ? (
              <div className="badge badge-info text-neutral-50">Created</div>
            ) : null}
            {item?.deliveryStatus === "Sended" ? (
              <div className="badge badge-info text-neutral-50">Sended</div>
            ) : null}

            {item?.deliveryStatus === "Fraud" ? (
              <div className="badge badge-error text-neutral-50">Fraud</div>
            ) : null}

            {item?.deliveryStatus === "On Hold" ? (
              <div className="badge badge-warning text-neutral-50">On Hold</div>
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
            {item?.deliveryDate ? (
              <div>
                <p className="flex">
                  {!item?.timeSlot ? "Purchase Date" : "Delivery Date"} :{" "}
                  <h1> {new Date(item?.deliveryDate).toDateString()}</h1>
                  {item?.timeSlot && ` | Time : ${item?.timeSlot}`}
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
      {/* Pagination Controls */}{" "}
      <div className="flex justify-between mt-4">
        {" "}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          {" "}
          Previous{" "}
        </button>{" "}
        <input
          type="number"
          value={page}
          onChange={handlePageChange}
          className="w-16 text-center"
        />{" "}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, data.totalPages))}
          disabled={page === data.totalPages}
        >
          {" "}
          Next{" "}
        </button>{" "}
      </div>
    </div>
  );
};

export default OrderLists;
