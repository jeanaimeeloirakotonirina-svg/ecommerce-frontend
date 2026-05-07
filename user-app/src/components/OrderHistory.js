import React, { useEffect, useState } from "react";
import { getOrders } from "../services/userService";

export default function OrderHistory() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Mes commandes</h2>

      {orders.map(order => (
        <div key={order.id}>
          <p>Commande #{order.id}</p>
          <p>Total: {order.total} MGA</p>
        </div>
      ))}
    </div>
  );
}