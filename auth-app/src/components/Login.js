import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Container,
  CircularProgress,
  Link,
  Divider,
  InputAdornment,
  Avatar
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Phone,
  AccountCircle,
  Send,
  Login as LoginIcon,
  PhotoCamera
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login, register, forgotPassword } from "../services/authService";

// Thème personnalisé pour Varotra
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Bleu Varotra
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result);
      setPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
        window.location.href = "/";
      }

      if (mode === "register") {
        await register({ name, firstname, email, password, phone, avatar: profilePhoto });
        setError("Compte créé avec succès !");
        setMode("login");
      }

      if (mode === "forgot") {
        await forgotPassword(email);
        setError("Instructions envoyées par email !");
        setMode("login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              {mode === "login" && <LoginIcon sx={{ mr: 1, fontSize: 32 }} />}
              {mode === "register" && <AccountCircle sx={{ mr: 1, fontSize: 32 }} />}
              {mode === "forgot" && <Email sx={{ mr: 1, fontSize: 32 }} />}
              <Typography component="h1" variant="h4">
                {mode === "login" && "Se connecter"}
                {mode === "register" && "Créer un compte"}
                {mode === "forgot" && "Mot de passe oublié"}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Varotra Azo Antoka
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
              {error && (
                <Alert severity={error.includes("succès") ? "success" : "error"} sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {mode === "register" && (
                <>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, justifyContent: "center" }}>
                    <Avatar
                      src={profilePhoto}
                      sx={{ width: 80, height: 80, bgcolor: profilePhoto ? "transparent" : "primary.main" }}
                    >
                      {!profilePhoto && <AccountCircle sx={{ fontSize: 40 }} />}
                    </Avatar>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<PhotoCamera />}
                      sx={{ textTransform: "none" }}
                    >
                      Ajouter une photo
                      <input hidden accept="image/*" type="file" onChange={handlePhotoChange} />
                    </Button>
                  </Box>
                  {photoName && (
                    <Typography variant="caption" sx={{ display: "block", textAlign: "center", mb: 1 }}>
                      {photoName}
                    </Typography>
                  )}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Votre nom"
                    name="name"
                    autoComplete="family-name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="Vos prénoms"
                    name="firstname"
                    autoComplete="given-name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Contact"
                    name="phone"
                    autoComplete="tel"
                    placeholder="32 12 34 567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                          <Typography sx={{ ml: 0.5 }}>+261</Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse e-mail"
                name="email"
                autoComplete="email"
                autoFocus={mode !== "register"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />

              {mode !== "forgot" && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  helperText={mode === "register" ? "Au moins 6 caractères" : ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : mode === "forgot" ? (
                    <Send />
                  ) : (
                    <LoginIcon />
                  )
                }
              >
                {!loading && (
                  <>
                    {mode === "login" && "Continuer"}
                    {mode === "register" && "Créer votre compte Varotra Azo Antoka"}
                    {mode === "forgot" && "Envoyer les instructions"}
                  </>
                )}
              </Button>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ textAlign: "center" }}>
                {mode === "login" && (
                  <>
                    <Typography variant="body2">
                      Nouveau chez Varotra Azo Antoka ?{" "}
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => setMode("register")}
                      >
                        Créer votre compte
                      </Link>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => setMode("forgot")}
                      >
                        Mot de passe oublié ?
                      </Link>
                    </Typography>
                  </>
                )}

                {(mode === "register" || mode === "forgot") && (
                  <Typography variant="body2">
                    Déjà un compte ?{" "}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => setMode("login")}
                    >
                      Se connecter
                    </Link>
                  </Typography>
                )}
              </Box>

              {mode === "login" && (
                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    <strong>Compte de test :</strong> Les champs email et mot de passe sont pré-remplis avec un compte de test.
                  </Typography>
                </Alert>
              )}

              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>
                En continuant, vous acceptez les{" "}
                <Link href="#" target="_blank">
                  Conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link href="#" target="_blank">
                  Politique de confidentialité
                </Link>{" "}
                de Varotra Azo Antoka.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
