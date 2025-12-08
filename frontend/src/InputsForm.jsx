import { useState } from 'react'
import './InputsForm.css'

function InputsForm() {
  const [formData, setFormData] = useState({
    title: '',
    amount: 10,
    changeInBalance: "spent"
  });
  const handleChange = (e) => {
    console.log(e.target);
    console.log(formData);

    const name = e.target.name;
    const value = e.target.value;
    setFormData(values => ({ ...values, [name]: value }))
  };
  return (
    <>
      <form id="form" action="add.php" method="post">

        <label className='rounded' htmlFor="title">Title</label>
        <input
          className='rounded box-shadow'
          id='title'
          type="text"
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='Enter title here' />

        <label className='rounded' htmlFor="amount">Amount</label>
        <input
          className='rounded box-shadow'
          id='amount'
          type="number"
          name='amount'
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
