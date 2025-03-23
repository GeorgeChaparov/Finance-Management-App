"use client"

import Transaction from "@/app/components/Transaction/Transaction";
import style from "./HomeSearchBar.module.css"
import Image from "next/image";
import searchIcon from "@/public/search.png"
import { transactionsArray } from "@/utilities";

function HomeSearchBar() {
    var transactions = transactionsArray;

    const updateSearch = () =>{
    }

    return(
        <>
            <div className={style.searchBarWrapper}>
                <input placeholder="Search transaction" onInput={updateSearch} type="search" className={style.searchBar}></input>
                <Image className={style.searchIcon} src={searchIcon} alt="settings image"></Image>
            </div> 
            {transactions.map(transaction => 
                    <Transaction key={transaction.id} logo={transaction.logo} name={transaction.name} category={transaction.category} amount={transaction.amount} date={transaction.date} isOnHomePage = {true}/>)}
        </>
    );
}

export default HomeSearchBar;