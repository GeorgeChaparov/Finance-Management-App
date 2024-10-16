"use client"

import Transaction from "@/app/components/Transaction/Transaction";
import style from "./HomeSearchBar.module.css"
import logo from "../../lidl.png"
import Image from "next/image";
import searchicon from "./search.png"
function HomeSearchBar() {
    var transactions = [{id:0, logo: logo, name:"Food", category:"Gifts", amount:-200, date:"20.01.2024", time:"13:12"},
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

const updateSearch = () =>{
console.log("sadasd");

}

    return(
        <>
            <div className={style.searchBarWrapper}>
                <input placeholder="Search transaction" onInput={updateSearch} type="search" className={style.searchBar}></input>
                <Image className={style.searchIcon} src={searchicon} alt="settings image"></Image>
            </div> 
            
            {transactions.map(transaction => 
                    <Transaction key={transaction.id} logo={transaction.logo} name={transaction.name} category={transaction.category} amount={transaction.amount} date={transaction.date} isOnHomePage = {true}/>)}
        </>
    );
}

export default HomeSearchBar;