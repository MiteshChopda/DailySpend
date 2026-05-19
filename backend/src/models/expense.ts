import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
    amount : { 
        type: Number, 
        required: true, 
    },
    category : {
        type: String,
        required: true,
    },
    date : {
        type: Date,
        default: Date.now,
        required: true,
    },
    description: String,
    lastUpdated: Date,
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense

