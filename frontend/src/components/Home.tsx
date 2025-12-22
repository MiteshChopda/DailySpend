import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to DailySpend
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Track expenses, visualise spending and stay on budget — once you sign
          in your data stays private to you.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{ mt: 1 }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            component="a"
            href="/DailySpend/?comp=login"
          >
            Get Started
          </Button>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<PersonAddIcon />}
            component="a"
            href="/DailySpend/?comp=register"
          >
            Register
          </Button>
        </Stack>
      </Box>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper" }}>
        <Typography variant="h6" gutterBottom>
          Why DailySpend?
        </Typography>
        <Stack spacing={1}>
          <Typography>
            - Create an account to store your expenses securely.
          </Typography>
          <Typography>
            - Use a simple form to log expenses and income in seconds.
          </Typography>
          <Typography>
            - Visualise trends on your personal dashboard after logging in.
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Home;

