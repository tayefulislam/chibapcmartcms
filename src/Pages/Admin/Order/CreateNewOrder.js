import React from "react";
import axios from "axios";

const CreateNewOrder = () => {
  const handleRequest = (e) => {
    e.preventDefault();
    const customerName = e.target?.customerName?.value;
    const itemsDetails = e.target?.itemsDetails?.value;
    const address = e.target?.address?.value;
    const postalCode = e.target?.postalCode?.value;
    const phoneNumber = e.target?.phoneNumber?.value;
    const deliveryDate = e.target?.deliveryDate?.value;
    const timeSlot = e.target?.timeSlot?.value;
    const orderType = e.target?.orderType?.value;
    const totalAmount = e.target?.totalAmount?.value;
    const paymentType = e.target?.paymentType?.value;
    const trackId = e.target?.trackId?.value;

    let customerAndOrderDetails = {
      customerDetails: {
        customerName,
        address,
        postalCode,
        phoneNumber,
      },
      orderDetails: {
        itemsDetails,
        totalAmount,
        deliveryDate,
        timeSlot,
        orderType,
      },
      paymentDetails: {
        paymentType: paymentType,
        paymentStatus: "Pending",
        paymentAmount: totalAmount,
        trackId: trackId,
      },
    };

    console.log(customerAndOrderDetails);

    const url = `http://localhost:5000/api/v1/orders/createOrder`;

    axios
      .post(url, customerAndOrderDetails)
      .then(function (response) {
        console.log(response);

        if (response?.status === 200) {
          alert("Order Created Successfully");

          e.target.reset();
        }

        if (response?.status === 400) {
          alert("Order Created Failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      {" "}
      <h1 className="text-center text-xl font-semibold">Create Order</h1>
      {/* Create Order */}
      <div className="flex justify-center items-center">
        <form onSubmit={handleRequest}>
          <label className="form-control w-96 max-w-xs">
            <div className="label">
              <span className="label-text">Customer Name : </span>
            </div>
            <input
              type="text"
              name="customerName"
              placeholder="Type here"
              className="input input-accent w-full max-w-xs"
            />

            <div className="label">
              <span className="label-text">Items Details : </span>
            </div>
            <textarea
              type="text"
              name="itemsDetails"
              placeholder="Type Items Details "
              className="textarea textarea-accent w-full max-w-xs"
            />

            <div className="label">
              <span className="label-text"> Address : </span>
            </div>
            <textarea
              type="text"
              name="address"
              placeholder="Type Address"
              className="textarea textarea-accent w-full max-w-xs"
            />

            <div className="label">
              <span className="label-text"> Postal Code : </span>
            </div>
            <input
              type="text"
              name="postalCode"
              placeholder="Type Postal Code ( 123-4533 )"
              className="input input-accent w-full max-w-xs"
            />

            <div className="label">
              <span className="label-text"> Phone Number: </span>
            </div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Type Phone Number"
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
                class="input input-bordered input-success w-full max-w-xs"
              />
            </div>

            <div className="label">
              <span className="label-text"> Time Slot : </span>
            </div>
            <select
              name="timeSlot"
              className="select select-accent w-full max-w-xs"
            >
              <option>9-12</option>
              <option>12-14</option>
              <option>14-16</option>
              <option>16-18</option>
              <option>18-20</option>
              <option>19-21</option>
            </select>

            <div className="label">
              <span className="label-text"> Order Type : </span>
            </div>
            <select
              name="orderType"
              className="select select-accent w-full max-w-xs"
            >
              <option selected>Regular</option>
              <option>Pre-Order</option>
            </select>

            <div className="label">
              <span className="label-text"> Payment Type : </span>
            </div>
            <select
              name="paymentType"
              className="select select-accent w-full max-w-xs"
            >
              <option selected>Cash On Delivery</option>
              <option>Bank Transfer</option>
            </select>

            <div className="label">
              <span className="label-text">Track Id : </span>
            </div>
            <input
              type="number"
              name="trackId"
              placeholder="Type Shipping Fee"
              className="input input-accent w-full max-w-xs"
            />

            <div className="label">
              <span className="label-text"> Shipping Fee : </span>
            </div>
            <input
              type="number"
              name="shippingFee"
              placeholder="Type Shipping Fee"
              className="input input-accent w-full max-w-xs"
            />

            <div className="label">
              <span className="label-text"> In Total Amount : </span>
            </div>
            <input
              type="number"
              name="totalAmount"
              placeholder="Type Total Amount"
              className="input input-accent w-full max-w-xs"
            />
          </label>

          <div className="flex justify-center items-center mt-4">
            <button type="submit" className="btn btn-accent">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewOrder;
