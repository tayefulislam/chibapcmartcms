import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const UpdateOrderDetails = () => {
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
      </div>

      <div className="font-semibold">
        <div>
          {data.customerId.postalCode ? (
            <div>
              <p>〒 {data.customerId.postalCode}</p>
            </div>
          ) : null}
        </div>

        <div>
          {data.customerId.address ? (
            <div>
              <p>{data.customerId.address}</p>
            </div>
          ) : null}
          {data?.customerId?.phoneNumber ? (
            <div>
              <p>{data?.customerId?.phoneNumber} </p>
            </div>
          ) : null}
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default UpdateOrderDetails;
