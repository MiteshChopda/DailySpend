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

interface InputsFormData {
  title: string;
  amount: string;
  changeInBalance: "spent" | "added";
  time: Date | string;
}

interface CreateRecordPayload {
  title: string;
  amount: number;
  changeInBalance: "spent" | "added";
  time: Date | string;
}

export default function InputsForm() {
  const [formData, setFormData] = useState<InputsFormData>({
    title: "",
    amount: "",
    changeInBalance: "spent",
    time: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16)
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
      const res: Response = await fetch(`${BACKEND_URL}/api/records/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: formData.title,
          amount: Number(formData.amount),
          changeInBalance: formData.changeInBalance,
          time: formData.time,
        } as CreateRecordPayload),
      });
      console.log(res);

      if (!res.ok) throw new Error("Failed to create record");

      setFormData({ title: "", amount: "", changeInBalance: "spent", time: new Date() });
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

        <DatePicker
          value={formData.time}
          handleChange={handleChange}
        />

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

export const DatePicker = ({ value, handleChange }: {
  value: Date | string,
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <Box
      sx={{
        color: "primary",
        display: "flex",
        justifyContent: "center",
        mt: 2,
        "& input": {
          padding: "0.5rem 0.6rem",
          width: "100%",
          borderRadius: "10px",
          border: "1px solid #616263",
          boxSizing: "content-box"

        }
      }}
    >

      {/* value={new Date().toISOString().split(":").slice(0, 2).join((":"))} */}
      <input
        name="time"
        type="datetime-local"
        onChange={handleChange}
        id="dateInput"
        value={value}
      />
    </Box>
  )
}

