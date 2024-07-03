export type Payment = {
    id: string;
    amount: number;
    type: 'paid' | 'received';
    for: string;
}

export type User = {
    password(password: string, password1: any): string;
    id: string;
    name: string;
    email: string;
    pass: string;
}

export type ExpenseForm = {
    id: string;
    name: string;
    date: string;
    amount: number;
    type: 'kamai' | 'udhar' | 'bakaya' | 'kharcha';
}

export type BeneficiaryForm = {
    id: string;
    name: string;
}


export type NameField = {
    id: string;
    name: string;
}

export type MonthlyExpense = {
    month: string;
    expenses: number;
}

export type Beneficiary = {
    id: string;
    name: string;
}

export type LatestExpense = {
    id: string;
    name: string;
    amount: number;
    date: string;
}


// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestExpenseRaw = Omit<LatestExpense, 'amount'> & {
    amount: number;
};

export type Expense = {
    id: string;
    name: string;
    amount: number;
    date: string;
    type: string;
}

export type customTooltipTypeBar = {
    payload: any;
    active: boolean | undefined;
    label: any;
};

export type ExpensesTable = {
    id: string;
    name: string;
    date: string;
    amount: number;
    type: 'kharcha' | 'kamai' | 'udhar' | 'bakaya';
};

export type BeneficiariesTableType = {
    id: string;
    name: string;
    total_transactions: number;
    total_kharcha: number;
    total_udhar: number;
    total_bakaya: number;
    total_kamai: number;
}

export type CredentialsType = {
    email: string;
    password: string;
}