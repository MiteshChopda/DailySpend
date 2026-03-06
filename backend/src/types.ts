export type expenseReqType = {
    amount: number;
    date: Date;
    description?: string;
    category: [
        "Food",
        "Transport",
        "Shopping",
        "Bills/Utils",
        "Travel",
        "Entertainment",
        "Other"
    ];
    lastUpdated?: Date;
}

export type Expense = {
    amount: number;
    date: Date;
    description?: string;
    category: [
        "Food",
        "Transport",
        "Shopping",
        "Bills/Utils",
        "Travel",
        "Entertainment",
        "Other"
    ];
    lastUpdated?: Date;
}