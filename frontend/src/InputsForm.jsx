import { useState } from 'react'
import './InputsForm.css'
import Toggle from './Toggle'
import {BACKEND_URL} from './config'


function InputsForm() {
  const [formData, setFormData] = useState({
    title: '',
    amount: 10,
    changeInBalance: "spent",
    created_at: new Date().toISOString()
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(values => ({ ...values, [name]: value }))
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const url = `${BACKEND_URL}/api/records/create`;
    const data = formData;

    try {
      const response = await fetch(url, {
        method: 'POST', // Specify the method
        headers: {
          'Content-Type': 'application/json', // Indicate the data type
        },
        body: JSON.stringify(data), // Convert JavaScript object to JSON string
      });
      const res_data =  await response.json()
      if (res_data.success == true) {
        console.log("Record Created Successfuly.");
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
      <Toggle />

      <form
        id="form"
        onSubmit={handleSubmit}
        method="POST">
        <label className='rounded' htmlFor="title">Title</label>
        <input
          className='rounded box-shadow'
          id='title'
          type="text"
          name='title'
          value={formData.title}
          onChange={handleChange}
          required={true}
          placeholder='Enter title here' />

        <label className='rounded' htmlFor="amount">Amount</label>
        <input
          className='rounded box-shadow'
          id='amount'
          type="number"
          name='amount'
          required={true}
          value={formData.amount}
          onChange={handleChange} />


        <div className="radio rounded">
          <input type="radio"
            name="changeInBalance"
            id="spent"
            value="spent"
            checked={formData.changeInBalance === "spent"}
            onChange={handleChange} />
          spent
          <input
            type="radio"
            name="changeInBalance"
            id="added"
            value="added"
            checked={formData.changeInBalance === "added"}
            onChange={handleChange} />
          added

        </div>
        <input className='rounded box-shadow' type="submit" value={"submit"} />
      </form>
    </>
  )
}

export default InputsForm
