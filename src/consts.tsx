import lidlLogo from "@/public/lidl.png"
import { Transaction } from "./types/Transaction";

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
enum Months {Jan = 1, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec};
const transactionsArray: Transaction[] = [{id: 0, logo: lidlLogo, name: "Food", category: "Gifts", amount: -200, date: "20.01.2024", time: "13:12", isSubscription: false},
    {id: 1,logo: lidlLogo,name: "dsf",category: "Transport",amount: -20,date: "22.01.2024",time: "16:31",isSubscription: false},
    {id: 2,logo: lidlLogo,name: "Work",category: "Transport",amount: -60,date: "20.01.2024",time: "12:23",isSubscription: false},
    {id: 3,logo: lidlLogo,name: "Food",category: "Food",amount: -250,date: "20.01.2024",time: "23:51",isSubscription: false},
    {id: 4,logo: lidlLogo,name: "dsf",category: "Food",amount: -63,date: "22.01.2024",time: "15:23",isSubscription: false},
    {id: 5,logo: lidlLogo,name: "Foghod",category: "Shopping",amount: -109,date: "22.01.2024",time: "22:45",isSubscription: false},
    {id: 6,logo: lidlLogo,name: "Food",category: "Food",amount: -300,date: "25.01.2024",time: "14:05",isSubscription: false},
    {id: 7,logo: lidlLogo,name: "dsf",category: "Shopping",amount: -400,date: "25.01.2024",time: "11:12",isSubscription: false},
    {id: 8,logo: lidlLogo,name: "Foghod",category: "Income",amount: 2500,date: "08.01.2024",time: "00:45",isSubscription: false},
    {id: 9,logo: lidlLogo,name: "dsf",category: "Electronics",amount: -400,date: "25.01.2024",time: "11:12",isSubscription: false},
    {id: 10,logo: lidlLogo,name: "Foghod",category: "Car",amount: -400,date: "08.01.2024",time: "00:45",isSubscription: false}
];

const toggleElementScroll = (element: HTMLElement) =>{
    element.classList.toggle("disableScroll");
}

const backgroundAnimation = {duration: 0.4, delay: 0.35}

const publicPagesURL = ["/", "/login", "/signup"];

const categoryIconsPath = "/category_icons/";

export {
    weekDays,
    Months,
    transactionsArray,
    toggleElementScroll,
    backgroundAnimation,
    publicPagesURL,
    categoryIconsPath,
};
