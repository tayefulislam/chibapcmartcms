import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  let updateState = true;

  console.log("1st Update State", updateState);
  let [paymentType, setPaymentType] = React.useState();
  let [paymentStatus, setPaymentStatus] = React.useState();

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

  // setPaymentStatus(data?.paymentObjId?.paymentStatus);
  // setPaymentType(data?.paymentObjId?.paymentType);

  const handlePaymentTypeAndStatus = (type, status) => {
    if (type === "Cash On Delivery") {
      setPaymentType("Cash On Delivery");
      setPaymentStatus("Unpaid");
    }

    if (type === "Bank Transfer") {
      setPaymentType("Bank Transfer");
      setPaymentStatus("Paid");
    }

    if (type === "In Shop") {
      setPaymentType("In Shop");
      // setPaymentStatus("");

      // setPaymentStatus === "" ? setPaymentStatus("Paid") : null;

      if (status) {
        setPaymentStatus(status);
      }
    }
  };

  if (updateState) {
    updateState = false;
  }

  console.log("1st Update State", updateState);

  console.log();

  const handleUpdate = (e) => {
    e.preventDefault();
  };

  console.log("paymentType", paymentType);

  console.log("paymentStatus", paymentStatus);

  return (
    <>
      <div className="mx-2">
        <div>
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
              <div className="badge badge-success text-neutral-50">
                Delivered
              </div>
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
              <div className="badge badge-error text-neutral-50">
                Investigation
              </div>
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
      </div>

      {/* Update Order Details */}

      <div className="flex justify-center mt-2">
        <label
          onClick={() =>
            handlePaymentTypeAndStatus(
              data?.paymentObjId?.paymentType,
              data?.paymentObjId?.paymentStatus
            )
          }
          htmlFor="my_modal_6"
          className="btn items-center"
        >
          Update Details
        </label>
      </div>

      <div>
        {/* The button to open modal */}

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal " role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold">
              {data?.orderId} | {data?.customerId?.customerName}
            </h3>
            <p className="py-4">This modal works with a hidden checkbox!</p>
            <div className="">
              <div className="flex justify-center items-center">
                <div className="card w-full">
                  <h1 className="text-center text-2xl font-bold">
                    Update Profile
                  </h1>

                  <div className="flex justify-center ">
                    {/* <form onSubmit={updateProfile}> */}
                    <form onSubmit={handleUpdate}>
                      <div class="form-control w-full max-w-xs">
                        <label class="label">
                          <span class="label-text"> CustomerName :</span>
                        </label>
                        <input
                          type="text"
                          required
                          defaultValue={data?.customerId?.customerName}
                          disabled
                          placeholder="Customer Name"
                          name="customerName"
                          class="input input-bordered input-error w-full max-w-xs"
                        />
                        <label class="label"></label>
                      </div>

                      {/* <div className="label">
              <span className="label-text">Items Details : </span>
            </div>
            <textarea
              type="text"
              name="itemsDetails"
              placeholder="Type Items Details "
              className="textarea textarea-accent w-full max-w-xs"
            /> */}

                      <div className="label">
                        <span className="label-text"> Address : </span>
                      </div>
                      <textarea
                        type="text"
                        name="address"
                        placeholder="Type Address"
                        defaultValue={data?.customerId?.address}
                        className="textarea textarea-accent w-full max-w-xs"
                      />

                      <div className="label">
                        <span className="label-text"> Postal Code : </span>
                      </div>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Type Postal Code ( 123-4533 )"
                        defaultValue={data?.customerId?.postalCode}
                        className="input input-accent w-full max-w-xs"
                      />

                      <div class="form-control w-full max-w-xs">
                        <label class="label">
                          <span class="label-text">Delivery Date :</span>
                        </label>
                        <input
                          type="date"
                          placeholder="Delivery Date "
                          name="deliveryDate"
                          defaultValue={data?.deliveryDate}
                          class="input input-bordered input-success w-full max-w-xs"
                        />
                      </div>

                      <div class="form-control w-full max-w-xs">
                        <label class="label">
                          <span class="label-text">Phone Number:</span>
                        </label>
                        <input
                          type={"text"}
                          required
                          defaultValue={data?.customerId?.phoneNumber}
                          name="phoneNumber"
                          class="input input-bordered input-error w-full max-w-xs"
                        />
                        <label class="label"></label>
                      </div>

                      <div class="form-control w-full max-w-xs">
                        {/* Time Slot */}
                        <label class="label">
                          <span class="label-text">Time Slot</span>
                        </label>

                        {data?.timeSlot && (
                          <select
                            name="group"
                            required
                            class="select select-error w-full max-w-xs"
                          >
                            {/* <option disabled selected>
                              Select Time Slot
                            </option> */}
                            <option
                              value="9-12"
                              selected={data?.timeSlot === "9-12"}
                            >
                              9-12
                            </option>
                            <option
                              value="12-14"
                              selected={data?.timeSlot === "12-14"}
                            >
                              12-2
                            </option>
                            <option
                              value="14-16"
                              selected={data?.timeSlot === "14-16"}
                            >
                              14-16
                            </option>
                            <option
                              value="16-18"
                              selected={data?.timeSlot === "16-18"}
                            >
                              16-20
                            </option>

                            <option
                              value="6-8"
                              selected={data?.timeSlot === "18-20"}
                            >
                              18-20
                            </option>
                            <option
                              value="19-21"
                              selected={data?.timeSlot === "19-21"}
                            >
                              19-21
                            </option>
                          </select>
                        )}

                        {/* Order Type - Regular Or Pre-Order */}

                        <label class="label">
                          <span class="label-text">Order Type</span>
                        </label>

                        {data?.orderType && (
                          <select
                            name="group"
                            required
                            class="select select-error w-full max-w-xs"
                          >
                            {/* <option disabled selected>
                              Select Time Slot
                            </option> */}
                            <option
                              value="Regular"
                              selected={data?.orderType === "Regular"}
                            >
                              Regular
                            </option>
                            <option
                              value="Pre-Order"
                              selected={data?.orderType === "Pre-Order"}
                            >
                              Pre-Order
                            </option>
                          </select>
                        )}

                        <div className="label">
                          <span className="label-text"> Payment Type : </span>
                        </div>
                        <select
                          required
                          onChange={(e) =>
                            handlePaymentTypeAndStatus(
                              e?.target?.value,
                              data.paymentObjId.paymentStatus
                            )
                          }
                          name="paymentType"
                          className="select select-accent w-full max-w-xs"
                        >
                          <option
                            value="Cash On Delivery"
                            selected={paymentType === "Cash On Delivery"}
                          >
                            Cash On Delivery
                          </option>
                          <option
                            value="Bank Transfer"
                            selected={paymentType === "Bank Transfer"}
                          >
                            Bank Transfer
                          </option>
                          <option
                            value="In Shop"
                            selected={paymentType === "In Shop"}
                          >
                            In Shop
                          </option>
                        </select>

                        {paymentType === "Bank Transfer" && (
                          <>
                            <div>
                              <div className="label">
                                <span className="label-text">
                                  {" "}
                                  Bank Name :{" "}
                                </span>
                              </div>
                              <input
                                type="text"
                                name="bankName"
                                placeholder="Type Bank Name"
                                defaultValue={data?.paymentObjId?.bankName}
                                className="input input-accent w-full max-w-xs"
                              />
                            </div>
                            <div>
                              <div className="label">
                                <span className="label-text">
                                  {" "}
                                  transaction Number :{" "}
                                </span>
                              </div>
                              <input
                                type="text"
                                name="transactionNumber"
                                defaultValue={
                                  data?.paymentObjId?.transactionNumber
                                }
                                placeholder="Type transaction number"
                                className="input input-accent w-full max-w-xs"
                              />
                            </div>
                          </>
                        )}

                        {paymentType === "In Shop" && (
                          <div>
                            <div className="label">
                              <span className="label-text">
                                {" "}
                                Payment Status :{" "}
                              </span>
                            </div>
                            <select
                              required
                              name="paymentStatus"
                              className="select select-accent w-full max-w-xs"
                              defaultValue={paymentStatus}
                              onChange={(e) =>
                                setPaymentStatus(e?.target?.value)
                              }
                            >
                              <option
                                value="Paid"
                                selected={paymentStatus === "Paid"}
                              >
                                Paid
                              </option>
                              <option
                                value="Unpaid"
                                selected={paymentStatus === "Unpaid"}
                              >
                                Unpaid
                              </option>
                            </select>
                          </div>
                        )}

                        {paymentType !== "In Shop" && (
                          <>
                            <div className="label">
                              <span className="label-text">Track Id : </span>
                            </div>
                            <input
                              type="number"
                              name="trackId"
                              placeholder="Type Track Id Code"
                              defaultValue={data?.paymentObjId?.trackId}
                              className="input input-accent w-full max-w-xs"
                            />
                            <div className="label">
                              <span className="label-text">
                                {" "}
                                Shipping Fee :{" "}
                              </span>
                            </div>
                            <input
                              type="number"
                              name="deliveryCost"
                              placeholder="Type Shipping Fee"
                              defaultValue={data?.deliveryCost}
                              className="input input-accent w-full max-w-xs"
                            />{" "}
                            <div className="label">
                              <span className="label-text"> Total : </span>
                            </div>
                            <input
                              type="number"
                              name="deliveryCost"
                              placeholder="Type Shipping Fee"
                              defaultValue={data?.totalAmount}
                              className="input input-accent w-full max-w-xs"
                            />{" "}
                          </>
                        )}

                        {/* {data?.group && (
                          <input
                            type="text"
                            name="group"
                            disabled
                            defaultValue={data?.group}
                            class="input input-bordered input-error w-full max-w-xs"
                          />
                        )}

                        <label class="label"></label> */}
                      </div>

                      {/* <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text"> Last Blood Donation Date :</span>

                            </label>
                            <input type="date" required placeholder="Blood Donation Date " name='date' class="input input-bordered input-error w-full max-w-xs" />
                            <label class="label">

                            </label>
                        </div> */}

                      {/* <div class="form-control w-full max-w-xs">
                        <label class="label">
                          <span class="label-text">District * :</span>
                        </label>

                        <select
                          name="district"
                          required
                          class="select select-error w-full max-w-xs"
                        >
                          <option value="Dhaka">Dhaka</option>
                          <option
                            value="Brahmanbaria"
                            selected={data?.district === "Brahmanbaria"}
                          >
                            Brahmanbaria
                          </option>
                        </select>
                      </div> */}
                      {/* <div class="form-control w-full max-w-xs">
                        <label class="label">
                          <span class="label-text">Area :</span>
                        </label>
                        <textarea
                          type="text"
                          required
                          defaultValue={data?.area}
                          placeholder="Area"
                          name="area"
                          class="input input-bordered input-error w-full max-w-xs"
                        />
                        <label class="label"></label>
                      </div> */}

                      <div className="flex justify-around mt-2">
                        <input className="btn" type="submit" value="Submit" />
                        <label htmlFor="my_modal_6" className="btn">
                          Close!
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
