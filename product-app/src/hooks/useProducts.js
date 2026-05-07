import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

const defaultProducts = [
  {
    id: 1,
    name: "Pizza Margherita",
    price: 8,
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    name: "Pizza Reine",
    price: 10,
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    name: "Pizza 4 Fromages",
    price: 12,
    image: "https://picsum.photos/300/200?random=3",
  },
];

export default function useProducts() {
  const [products, setProducts] = useState(defaultProducts);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setProducts(res.data);
        } else {
          throw new Error("Empty data");
        }
      })
      .catch(() => {
        console.warn("Backend indisponible → utilisation fallback");
        setIsFallback(true);
      });
  }, []);

  return { products, isFallback };
}