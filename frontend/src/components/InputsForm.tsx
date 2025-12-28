import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { BACKEND_URL } from "../config.ts";

import {
  Container,
  TextField,
  FormControlLabel,
  Button,
  Box,
  Alert,
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface InputsFormData {
  title: string;
  amount: string;
  changeInBalance: "spent" | "added";
  category: "Food" | "Travel" | "Shopping" | "";
  time: Date | string;
}

interface CreateRecordPayload {
  title: string;
  amount: number;
  changeInBalance: "spent" | "added";
  category: string;
  time: Date | string;
}

export default function InputsForm() {
  const [formData, setFormData] = useState<InputsFormData>({
    title: "",
    amount: "",
    changeInBalance: "spent",
    category: "",
    time: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16)
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

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

      setFormData({
        title: "",
        amount: "",
        changeInBalance: "spent",
        category: "",
        time: new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(formData);

  }, [formData])

  return (
    <Container
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: 300 }}
      >
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

        {/* changeInBalance & category */}
        <Box
          sx={{
            display: "flex",
            mt: 2,
            justifyContent: "center",
            alignItems: "center",
            "&> *": { px: 1 }
          }}>
          <ToggleChangeInBalance formData={formData} setFormData={setFormData} />
          <CategorySelect value={formData.category}
            handleChange={handleChange} />
        </Box>
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
    </Container >
  );
}

function ToggleChangeInBalance({ formData, setFormData }: { formData: InputsFormData, setFormData: any }) {
  function handleToggle(e: ChangeEvent<any>) {
    if (e.target.value != null) {
      setFormData({ ...formData, ["changeInBalance"]: e.target.value });
    }
  }
  return (
    <ToggleButtonGroup
      sx={{ display: "flex", justifyContent: "center", width: "100%" }}
      value={formData.changeInBalance}
      exclusive
      onChange={handleToggle}
    >
      <ToggleButton
        fullWidth
        value="added" >
        <AddIcon sx={{ pointerEvents: "none" }} />
      </ToggleButton>
      <ToggleButton
        fullWidth
        value="spent" >
        <RemoveIcon sx={{ pointerEvents: "none" }} />
      </ToggleButton>
    </ToggleButtonGroup >

  );
}


export function CategorySelect({ value, handleChange }: {
  value: string,
  handleChange: any,  //(event: ChangeEvent<HTMLInputElement>) => void,
}) {

  return (
    <Box sx={{ minWidth: 120, width: "100%" }}>
      <FormControl fullWidth required>
        <InputLabel id="category">Category</InputLabel>
        <Select
          name="category"
          labelId="category"
          id="category"
          value={value}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={"Travel"}>Travel</MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem defaultChecked value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
    </Box >
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
        }
      }}
    >
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel shrink htmlFor="time">
          Date & Time
        </InputLabel>
        <OutlinedInput
          sx={{ p: 1 }}
          id="time"
          name="time"
          type="datetime-local"
          value={value}
          onChange={handleChange}
          label="Date & Time"
        />
      </FormControl>
    </Box>
  )
}

