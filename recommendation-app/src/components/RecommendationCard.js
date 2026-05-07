import { Card, CardContent, Button } from "@mui/material";

export default function RecommendationCard({ product }) {

  const addToCart = () => {
    window.dispatchEvent(new CustomEvent("ADD_TO_CART", { detail: product }));
  };

  return (
    <Card style={{ margin: 10 }}>
      <CardContent>
        <h4>{product.name}</h4>
        <p>{product.price} MGA</p>

        <Button variant="contained" onClick={addToCart}>
          Acheter
        </Button>
      </CardContent>
    </Card>
  );
}