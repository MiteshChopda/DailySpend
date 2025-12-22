import { useState } from "react";
import { BACKEND_URL } from "../config";

import {
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Box,
  Alert,
} from "@mui/material";

export default function InputsForm() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    changeInBalance: "spent",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (Number(formData.amount) <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/records/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(res);


      if (!res.ok) throw new Error("Failed to create record");

      setFormData({ title: "", amount: "", changeInBalance: "spent" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: 300 }}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mt: 2 }}
        />

        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mt: 2 }}
        />

        <RadioGroup row sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <FormControlLabel
            value="spent"
            control={<Radio />}
            label="Spent"
            name="changeInBalance"
            checked={formData.changeInBalance === "spent"}
            onChange={handleChange}
          />
          <FormControlLabel
            value="earned"
            control={<Radio />}
            label="Earned"
            name="changeInBalance"
            checked={formData.changeInBalance === "earned"}
            onChange={handleChange}
          />
        </RadioGroup>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Saving..." : "Submit"}
        </Button>
      </Box>
    </Container>
  );
}
