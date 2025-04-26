"use server"

import Menu from "./components/Menu/Menu";
import style from "./page.module.css";
import BackgroundCircles from "./components/BackgroundCircles/BackgroundCircles";
import Button from "./components/Basic/Button/Button";
import { redirect } from "next/navigation";
import { Months, transactionsArray } from "@/utilities";
import Input from "./components/Basic/Input/Input";
import Transaction from "./components/Transaction/Transaction";
import Image from "next/image";
import searchIcon from "@/public/search.png"

export default async function Home() {
  const currentMonth = new Date().getMonth();
  const transactions = transactionsArray;


  return (
    <>
      <div className={style.page}>
        <BackgroundCircles 
       circles={[
        {
          variants:{init: {top: "200px", left: "-320px"}, animate: {left:"calc(50% - 300px)"}}, 
          radius: 320
        },
        {
          variants:{init: {top: "100px", right: "-260px"}, animate: {left:"calc(50% - 35px)"}, },
          radius: 260
        },
        {
          variants:{init: {top: "22px", right: "-150px"}, animate: {left:"calc(50% - 120px)"}, },
          radius: 150
        },
        {
          variants:{init: {bottom: "70px", right: "-420px"}, animate: {left:"calc(50% - 160px)"}}, 
          radius: 420
        },
      ]} 
      transitionDelay={0.1}
      height="100vh">
        </BackgroundCircles>
        <section className={style.moneySection}>
          <div className={style.totalBalance}>
            <span className={style.balanceTitle}>Total Balance</span>
            <span className={style.balanceAmount}>3,245.00lv</span>
          </div>

          <div className={style.seperateAmountContainer}>
            <div className={style.inBankWrapper}>
              <span className={style.inBankTitle}>Bank</span>
              <span className={style.inBankAmount}>3,245.00</span>
            </div>

            <div className={style.ceshWrapper}>
              <span className={style.ceshTitle}>Cash</span>
              <span className={style.ceshAmount}>9,999.99</span>
            </div>
          </div>
        </section>
        <section className={style.transactions}>
          <div className={style.transactionSection}>
            <div className={style.titleAndButtonWrapper}>
              Transactions 
              <a href={`/transactions/${Months[currentMonth]}`} className={style.seeAll}>See all</a>
            </div>

            <section className={style.searchBarWrapper}>
                <Input placeholder="Search transaction" type="search" className={style.searchBar}></Input>
                <Image className={style.searchIcon} src={searchIcon} alt="settings image"></Image>
            </section> 
            {transactions.map(transaction => 
                <Transaction key={transaction.id} transaction={transaction} isOnHomePage = {true}/>
            )}
          </div>
        </section>
      </div>
      <Menu/>
    </>
  );
}
