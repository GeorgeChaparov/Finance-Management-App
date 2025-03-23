import logo from "@/public/lidl.png"

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsEnum = {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'};
const transactionsArray = [{id:0, logo: logo, name:"Food", category:"Gifts", amount:-200, date:"20.01.2024", time:"13:12"},
    {id:1, logo: logo, name:"dsf", category:"Transport", amount:-20, date:"22.01.2024", time:"16:31"},
    {id:2, logo: logo, name:"Work", category:"Transport", amount:-60, date:"20.01.2024", time:"12:23"},
    {id:3, logo: logo, name:"Food", category:"Food", amount:-250, date:"20.01.2024", time:"23:51"},
    {id:4, logo: logo, name:"dsf", category:"Food", amount:-63, date:"22.01.2024", time:"15:23"},
    {id:5, logo: logo, name:"Foghod", category:"Shopping", amount: -109, date:"22.01.2024", time:"22:45"},
    {id:6, logo: logo, name:"Food", category:"Food", amount:-300, date:"25.01.2024", time:"14:05"},
    {id:7, logo: logo, name:"dsf", category:"Shopping", amount:-400, date:"25.01.2024", time:"11:12"},
    {id:8, logo: logo, name:"Foghod", category:"Income", amount:2500, date:"08.01.2024", time:"00:45"},
    {id:9, logo: logo, name:"dsf", category:"Electronics", amount:-400, date:"25.01.2024", time:"11:12"},
    {id:10, logo: logo, name:"Foghod", category:"Car", amount:-400, date:"08.01.2024", time:"00:45"}
];


export {
    weekDays,
    monthsEnum,
    transactionsArray
}