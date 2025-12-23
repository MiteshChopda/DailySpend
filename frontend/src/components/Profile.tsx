import { useMemo } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import { User } from "../types/api.types.ts";

export default function Profile() {
  const user = useMemo<User | null>(() => {
    try {
      const raw: string | null = localStorage.getItem("user");
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    // send back to landing page
    window.location.href = "/DailySpend/";
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Your account details and session controls.
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography>
            <strong>Name:</strong> {user?.name || "Unknown"}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user?.email || "Unknown"}
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Log out
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

