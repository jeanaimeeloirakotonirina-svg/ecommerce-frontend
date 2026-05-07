import { Button } from "@mui/material";

export default function CustomButton(props) {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ borderRadius: 2 }}
      {...props}
    />
  );
}