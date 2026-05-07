import { Card, CardContent } from "@mui/material";

export default function CustomCard({ children }) {
  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}