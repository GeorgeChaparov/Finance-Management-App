export enum PaymentMethods {
    cash = "cash",
    bank = "bank"
}

export enum PaymentType {
    expense = "expense",
    income = "income"
}

class Transaction{
    id: number;
    iconName: any;
    name: string;
    category: string;
    amount: number;
    date: string;
    time: string;
    isSubscription: boolean;
    isExpense: number;
    weekDay?: string

    constructor(_id: number, _iconName: any, _name: string, _category: string, _amount: number, _date: string, _time: string, _isSubscription: boolean, _isExpense: number, _weekDay?: string)
    {
        this.id = _id;
        this.iconName = _iconName;
        this.name = _name;
        this.category = _category;
        this.amount = _amount;
        this.date = _date;
        this.time = _time;
        this.isSubscription = _isSubscription;
        this.isExpense = _isExpense;
        if (_weekDay) this.weekDay = _weekDay;
    }
}

export type { Transaction };