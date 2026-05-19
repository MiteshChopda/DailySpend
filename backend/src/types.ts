export type expenseReqType = {
    amount: number;
    date: Date;
    category:'Food'| 'Transport'| 'Shopping'| 'Travel'| 'Entertainment'| 'Utils'| 'Other' ; 
    description?: string;
    lastUpdated?: Date;
}

export type Expense = {
    amount: number;
    date: Date;
    category:'Food'| 'Transport'| 'Shopping'| 'Travel'| 'Entertainment'| 'Utils'| 'Other';
    description?: string;
    lastUpdated?: Date;
}
