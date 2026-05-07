import React from "react";
import useUser from "../hooks/useUser";

export default function Profile() {
  const user = useUser();

  if (!user) return <h2>Chargement...</h2>;

  return (
    <div>
      <h2>Profil</h2>
      <p>Nom : {user.name}</p>
      <p>Email : {user.email}</p>
    </div>
  );
}