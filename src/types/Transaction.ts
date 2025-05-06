class Transaction{
    id: number;
    logo: any;
    name: string;
    category: string;
    amount: number;
    date: string;
    time: string;
    isSubscription: boolean;

    constructor(_id: number, _logo: any, _name: string, _category: string, _amount: number, _date: string, _time: string, _isSubscription: boolean)
    {
        this.id = _id;
        this.logo = _logo;
        this.name = _name;
        this.category = _category;
        this.amount = _amount;
        this.date = _date;
        this.time = _time;
        this.isSubscription = _isSubscription;
        
    }
}

export type { Transaction };