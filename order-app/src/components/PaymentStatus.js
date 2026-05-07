export default function PaymentStatus({ status }) {

  if (status === "idle") return null;
  if (status === "creating") return <p>Création commande...</p>;
  if (status === "paying") return <p>Paiement en cours...</p>;
  if (status === "success") return <p>✅ Paiement réussi</p>;
  if (status === "error") return <p>❌ Erreur paiement</p>;

  return null;
}