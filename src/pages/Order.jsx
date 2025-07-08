import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";
import api from "../api/apiConfig";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await api.post(
        "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
        // console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* updating order status in database */
  const updateStatus = async (orderId, event) => {
    try {
      const response = await api.post(
        "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <p className="text-2xl">Orders page</p>
      {orders.map((order, index) => (
        <div
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-400 p-5 md:p-8 my-3 md:my-4 text-sm  text-gray-950"
          key={index}
        >
          <img src={assets.parcel_icon} alt="parcel icon" />
          <div>
            {order.items.map((item, index) => {
              if (index === order.items.lenght - 1) {
                return (
                  <p className="py-0.5 text-[15px]" key={index}>
                    {item.name} X {item.quantity} {item.size}
                  </p>
                );
              } else {
                return (
                  <p className="py-0.5 text-[15px] text-gray-950" key={index}>
                    {item.name} X {item.quantity} {item.size},
                  </p>
                );
              }
            })}
            <p className="mt-3 mb-2 font-medium text-lg">
              {order.address.firstName}{" "}
              {order.address.lastName === "." ? "" : order.address.lastName}
            </p>
            <p>{order.address.street}</p>

            <p>
              {order.address.city}, {order.address.state},{" "}
              {order.address.country}, {order.address.zipcode}
            </p>

            <p>{order.address.phone}</p>
          </div>

          <div>
            <p className="text-sm sm:text-[15px]">
              Items: {order.items.length}
            </p>
            <p className="mt-3">Method: {order.paymentMethod}</p>
            <p>Payment: {order.payment ? "done" : "pending"}</p>
            <p>Date:{new Date(order.date).toLocaleDateString()}</p>
          </div>
          <p className="text-sm sm:text-lg font-medium">
            <span className="font-bold">₹</span>
            {order.amount}
          </p>
          {/* order status */}
          <select
            onChange={(event) => updateStatus(order._id, event)}
            value={order.status}
            className="py-1.5 px-2 border text-lg border-gray-300 font-medium"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Order;
