import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();

  // api url  to GET ALL ORDER DETAILS
  let url = `${process.env.REACT_APP_apiLink}/api/v1/orders/getSingleOrderWithCustomerPaymentDetails/${orderId}`;
  //   console.log(url);

  // GET ALL ORDER DETAILS
  const { isPending, error, data } = useQuery({
    queryKey: [`getSingleOrderWithCustomerPaymentDetails/${orderId}`],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  // handle loading
  if (isPending) return <h1>Loading</h1>;

  // handle error
  if (error) return <h1>{error.message}</h1>;

  console.log(data);

  return (
    <div className="mx-2">
      <div className="flex justify-between mt-2  text-2xl">
        <p className="font-semibold">{data?.customerId?.customerName}</p>
        <p className="font-extrabold">¥ {data?.totalAmount}</p>
      </div>
      <div className="flex justify-between">
        <p>Order : {data?.orderId}</p>

        {data?.deliveryStatus === "Pending" ? (
          <div className="badge badge-secondary">Pending</div>
        ) : null}

        {data?.deliveryStatus === "Delivered" ? (
          <div className="badge badge-success text-neutral-50">Delivered</div>
        ) : null}

        {data?.deliveryStatus === "Redelivery Done" ? (
          <div className="badge badge-accent text-neutral-50">
            Redelivery Done
          </div>
        ) : null}

        {data?.deliveryStatus === "Returned" ? (
          <div className="badge badge-error text-neutral-50">Returned</div>
        ) : null}

        {data?.deliveryStatus === "Out for delivery" ? (
          <div className="badge badge-warning text-neutral-50">
            Out for delivery
          </div>
        ) : null}

        {data?.deliveryStatus === "Absence" ? (
          <div className="badge badge-error text-neutral-50">Absence</div>
        ) : null}

        {data?.deliveryStatus === "Reached Post Office" ? (
          <div className="badge badge-info text-neutral-50">
            Reached Post Office
          </div>
        ) : null}

        {data?.deliveryStatus === "Reached Post Office" ? (
          <div className="badge badge-info text-neutral-50">
            Reached Post Office
          </div>
        ) : null}

        {data?.deliveryStatus === "En route" ? (
          <div className="badge badge-info text-neutral-50">En route</div>
        ) : null}

        {data?.deliveryStatus === "Posting/Collection" ? (
          <div className="badge badge-info text-neutral-50">
            Posting/Collection
          </div>
        ) : null}

        {data?.deliveryStatus === "Investigation" ? (
          <div className="badge badge-error text-neutral-50">Investigation</div>
        ) : null}
      </div>

      <div className="font-semibold">
        <div>
          {data?.customerId?.postalCode ? (
            <div>
              <p>〒 {data?.customerId?.postalCode}</p>
            </div>
          ) : null}
        </div>

        <div>
          {data?.customerId?.address ? (
            <div>
              <p>{data?.customerId?.address}</p>
            </div>
          ) : null}
          {data?.customerId?.phoneNumber ? (
            <div>
              <p>{data?.customerId?.phoneNumber} </p>
            </div>
          ) : null}
        </div>
        {data?.deliveryDate && data?.timeSlot ? (
          <div>
            <p className="flex">
              Delivery Date :{" "}
              <h1> {new Date(data?.deliveryDate).toDateString()}</h1> |
              {" Time : "}
              {data?.timeSlot}
            </p>
          </div>
        ) : null}
      </div>

      <div className="border-t-4 border-blue-500 my-4"></div>

      <div>
        <p className="text-xl font-semibold">Items : </p>

        {data?.itemsDetails?.map((item, key) => (
          <div className="font-semibold" key={key}>
            {/* <p>
              {key + 1} : {item?.itemName}
                </p> */}

            <p>{item?.itemName}</p>
          </div>
        ))}
      </div>

      <div className="border-t-4 border-blue-500 my-4"></div>

      <div>
        <p className="text-xl font-semibold">Payment Details</p>

        {data?.paymentObjId?.paymentType ? (
          <p>Payment Type : {data?.paymentObjId?.paymentType}</p>
        ) : null}
        {data?.paymentObjId?.courierName ? (
          <p>Courier Name: {data?.paymentObjId?.courierName}</p>
        ) : null}
        {data?.paymentObjId?.trackId ? (
          <p>
            Track Id : {data?.paymentObjId?.trackId}|{" "}
            <Link
              key={data?._id}
              to={`https://trackings.post.japanpost.jp/services/srv/search/direct?reqCodeNo1=${data?.paymentObjId?.trackId}&searchKind=S002&locale=en`}
            >
              WEB
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default OrderDetails;
