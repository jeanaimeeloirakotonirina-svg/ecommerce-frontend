import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { updateProfile } from "../services/userService";

export default function EditProfile() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = async () => {
    await updateProfile({ name, email });
    alert("Profil mis à jour !");
  };

  return (
    <div>
      <h2>Modifier profil</h2>

      <TextField label="Nom" onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />

      <Button onClick={handleSave}>Sauvegarder</Button>
    </div>
  );
}