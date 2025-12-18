import { useState } from 'react'
import {BACKEND_URL} from './config'
// material UI
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from "@mui/material/Box";

function InputsForm() {
  const [formData, setFormData] = useState({
    title: '',
    amount: 10,
    changeInBalance: "spent",
    created_at: new Date().toISOString()
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(values => ({ ...values, [name]: value }))
  };

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    const url = `${BACKEND_URL}/api/records/create`
    const data = formData

    try {
      const response = await fetch(url, {
        method: 'POST', // Specify the method
        headers: {
          'Content-Type': 'application/json', // Indicate the data type
        },
        body: JSON.stringify(data), // Convert JavaScript object to JSON string
      });
      const res_data = await response.json()
      if (res_data.success == true) {
        console.log("Record Created Successfuly.");
        setIsSubmitting(false);
      }
      setFormData({ title: '', amount: 10, changeInBalance: "spent" })
    }
    catch (err) {
      console.error(err)
      window.alert("Error occurred!", err);
      setFormData({ title: '', amount: 10, changeInBalance: "spent" })
    }
  }

  return (
    <>
      <Container
        sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}
          method="POST"
        >


          {/* Title */}
          <TextField
            sx={{ marginTop: 4 }}
            className='rounded box-shadow'
            variant="outlined"
            id='title'
            name='title'
            type="text"
            label="Title"
            placeholder="Enter title here"
            value={formData.title}
            onChange={handleChange}
            required={true}
            disabled={isSubmitting}
          />

          {/* Amount */}
          <TextField
            sx={{ marginTop: 4 }}
            className='rounded box-shadow'
            variant="outlined"
            id='amount'
            type="number"
            label="Amount"
            name='amount'
            required={true}
            value={formData.amount}
            onChange={handleChange}
            disabled={isSubmitting} />

          {/* Change in balance */}

          <FormControl
            sx={{ display: "flex", marginTop: 2, justifyContent: "center" }}>
            <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {/* Spent */}
              <FormControlLabel
                name="changeInBalance"
                id="spent"
                value="spent"
                control={<Radio />}
                label="Spent"
                checked={formData.changeInBalance === "spent"}
                onChange={handleChange}
                disabled={isSubmitting} />

              {/* Added */}
              <FormControlLabel
                name="changeInBalance"
                id="added"
                value="added"
                control={<Radio />}
                checked={formData.changeInBalance === "added"}
                onChange={handleChange}
                disabled={isSubmitting}
                label="Added" />
            </RadioGroup>
          </FormControl>

          {/* Submit */}
          <Button variant="contained"
            // sx={{ width:"100%" }}
            type="submit"
            value={isSubmitting ? "wait.." : "submit"}
            disabled={isSubmitting}
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default InputsForm
