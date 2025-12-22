import { useState, FormEvent, ChangeEvent } from "react";
import { BACKEND_URL } from "../config.ts";

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
    changeInBalance: "spent" as "spent" | "added",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      changeInBalance: e.target.value as "spent" | "added",
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
        }),
      });
      console.log(res);

      if (!res.ok) throw new Error("Failed to create record");

      setFormData({ title: "", amount: "", changeInBalance: "spent" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
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

        <RadioGroup
          row
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          value={formData.changeInBalance}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="spent"
            control={<Radio />}
            label="Spent"
          />
          <FormControlLabel
            value="added"
            control={<Radio />}
            label="Earned"
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

