import { useState, FormEvent, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import { BACKEND_URL } from "../config.ts";

interface LoginResponse {
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
}

export default function Login() {
  const [params] = useSearchParams();
  const redirectTo = params.get("redirect") || "new";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: LoginResponse = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to login");
      }

      if (!data.token) {
        throw new Error("Login response missing token");
      }

      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // notify navbar and others
      window.dispatchEvent(new Event("authChange"));

      // redirect to requested page
      const target = `/DailySpend/?comp=${encodeURIComponent(redirectTo)}`;
      window.location.href = target;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

