import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Avatar, Box, Typography } from "@mui/material";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    updateUser();
    window.addEventListener("user-storage-updated", updateUser);
    return () => window.removeEventListener("user-storage-updated", updateUser);
  }, []);

  const userInitials = user?.name
    ? user.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : "?";

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Button color="inherit" href="/">Produits</Button>
          <Button color="inherit" href="/cart">Panier</Button>
          <Button color="inherit" href="/orders">Commandes</Button>
        </Box>

        {user ? (
          <Button color="inherit" href="/profile" sx={{ textTransform: "none" }}>
            <Avatar
              src={user.avatar || undefined}
              sx={{ width: 32, height: 32, mr: 1, bgcolor: user.avatar ? "transparent" : "secondary.main" }}
            >
              {!user.avatar && userInitials}
            </Avatar>
            <Typography variant="button" color="inherit" sx={{ textTransform: "none" }}>
              Bonjour, {user.name?.split(" ")[0] || user.email}
            </Typography>
          </Button>
        ) : (
          <Button color="inherit" href="/login">Connexion</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
