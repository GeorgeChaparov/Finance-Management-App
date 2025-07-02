"use server"

import style from "./page.module.css";
import Image from "next/image";
import searchIcon from "@/public/search.png"
import { Months, transactionsArray } from "@/src/consts";
import BackgroundCircles from "@/src/components/background-circles/BackgroundCircles";
import Input from "@/src/components/basic/input/Input";
import { Transaction as TransactionClass } from "@/src/types/Transaction";
import Transaction from "@/src/components/transaction/Transaction";
import Menu from "@/src/components/menu/Menu";
import { User } from "@/src/types/User";
import Link from "next/link";
import { getUserAction } from "@/src/lib/actions/userActions";
import { getUserIdFromCookieAction } from "@/src/lib/actions/authActions";
import { ServerResponse } from "@/src/types/ServerRespons";

export default async function Home() {
  const currentMonth = new Date().getMonth();
  const transactions = transactionsArray;


  const id = await getUserIdFromCookieAction();
  const response: ServerResponse = await getUserAction({id: id});
  const user = response.data != null ? response.data.user as User : null;

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  if (user != null) {
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
              <span className={style.balanceAmount}>{formatter.format(Number(user.cashAmount) + Number(user.bankAmount))}lv</span>
            </div>

            <div className={style.seperateAmountContainer}>
              <div className={style.inBankWrapper}>
                <span className={style.inBankTitle}>Bank</span>
                <span className={style.inBankAmount}>{formatter.format(user.bankAmount)}</span>
              </div>

              <div className={style.ceshWrapper}>
                <span className={style.ceshTitle}>Cash</span>
                <span className={style.ceshAmount}>{formatter.format(user.cashAmount)}</span>
              </div>
            </div>
          </section>
          <section className={style.transactions}>
            <div className={style.transactionSection}>
              <div className={style.titleAndButtonWrapper}>
                Transactions 
                <Link href={`/transactions/${Months[currentMonth]}`} className={style.seeAll}>See all</Link>
              </div>

              <section className={style.searchBarWrapper}>
                  <Input attributes={{placeholder: "Search transaction", type: "search", className: style.searchBar}}></Input>
                  <Image className={style.searchIcon} src={searchIcon} alt="settings image"></Image>
              </section> 
              {transactions.map((transaction: TransactionClass) => {
                return (
                  <Transaction key={transaction.id} transaction={transaction} isOnHomePage = {true}/>
                )
              })}
            </div>
          </section>
        </div>
        <Menu/>
      </>
    );
  }
  else
  {
    //first show the user a way to contact the support and then
    //logout the user and redirect him to the "wellcome" page, so he can try again.
  }
}
