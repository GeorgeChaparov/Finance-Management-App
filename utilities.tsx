import logo from "@/public/lidl.png"

class Transaction{
    id: number;
    logo: string;
    name: string;
    category: string;
    amount: number;
    date: string;
    time: string;
    isSubscription: boolean;

    constructor(_id: number, _logo: string, _name: string, _category: string, _amount: number, _date: string, _time: string, _isSubscription: boolean)
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

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
enum Months {Jan = 1, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec};
const transactionsArray = [new Transaction(0, logo, "Food", "Gifts", -200, "20.01.2024", "13:12", false),
    new Transaction(1, logo, "dsf", "Transport", -20, "22.01.2024", "16:31", false),
    new Transaction(2, logo, "Work", "Transport", -60, "20.01.2024", "12:23", false),
    new Transaction(3, logo, "Food", "Food", -250, "20.01.2024", "23:51", false),
    new Transaction(4, logo, "dsf", "Food", -63, "22.01.2024", "15:23", false),
    new Transaction(5, logo, "Foghod", "Shopping", -109, "22.01.2024", "22:45", false),
    new Transaction(6, logo, "Food", "Food", -300, "25.01.2024", "14:05", false),
    new Transaction(7, logo, "dsf", "Shopping", -400, "25.01.2024", "11:12", false),
    new Transaction(8, logo, "Foghod", "Income", 2500, "08.01.2024", "00:45", false),
    new Transaction(9, logo, "dsf", "Electronics", -400, "25.01.2024", "11:12", false),
    new Transaction(10, logo, "Foghod", "Car", -400, "08.01.2024", "00:45", false)
];

const toggleElementScroll = (element: HTMLElement) =>{
    element.classList.toggle("disableScroll");
}

const backgroundAnimation = {duration: 0.4, delay: 0.35}

export {
    weekDays,
    Months,
    transactionsArray,
    toggleElementScroll,
    backgroundAnimation
};

export type { Transaction };
