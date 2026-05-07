import { useState } from "react";
import { createOrder, payOrder } from "../services/orderService";

export default function useOrder() {
  const [status, setStatus] = useState("idle");

  const placeOrder = async (cart, paymentMethod) => {
    try {
      setStatus("creating");

      const orderRes = await createOrder({ items: cart, paymentMethod });

      setStatus("paying");

      await payOrder(orderRes.data.id, paymentMethod);

      setStatus("success");

    } catch (err) {
      setStatus("error");
    }
  };

  return { placeOrder, status };
}