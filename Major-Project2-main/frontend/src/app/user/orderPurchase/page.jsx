'use client'
import React, { useState, useEffect } from "react";
const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  
  // Simulated fetch function (Replace with API call)
  useEffect(() => {
    setOrders([
      { id: 1, product: "Wireless Headphones", status: "Pending", price: 1999 },
      { id: 2, product: "Smart Watch", status: "Shipped", price: 2999 },
      { id: 3, product: "Gaming Mouse", status: "Delivered", price: 1499 },
    ]);
  }, []);

  // Cancel Order Function
  const cancelOrder = (id) => {
    setOrders(orders.map(order =>
      order.id === id && order.status === "Pending"
        ? { ...order, status: "Cancelled" }
        : order
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Manage Your Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="text-center border-t">
                  <td className="px-4 py-2 border">{order.id}</td>
                  <td className="px-4 py-2 border">{order.product}</td>
                  <td
                    className={`px-4 py-2 border font-semibold ${
                      order.status === "Pending" ? "text-yellow-500" :
                      order.status === "Shipped" ? "text-blue-500" :
                      order.status === "Delivered" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-4 py-2 border">₹{order.price}</td>
                  <td className="px-4 py-2 border">
                    {order.status === "Pending" ? (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-400">Not Available</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
