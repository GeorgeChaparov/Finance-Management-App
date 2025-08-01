"use server"

import style from "./page.module.css";
import DateSelectPanel from "./SpecificComponents/DateSelectPanel/DateSelectPanel";
import CustomChart from "./SpecificComponents/CustomChart/CustomChart";
import { Months } from "@/src/consts";
import { Transaction } from "@/src/types/Transaction";
import BackgroundCircles from "@/src/components/background-circles/BackgroundCircles";
import TransactionByDay from "@/src/components/transactions-by-day/TransactionByDay";
import { getTransactionsByUserAndMonthAction } from "@/src/lib/actions/transactionActions";
import { convertDateForDisplay, convertTimeForDisplay, getWeekdayName } from "@/src/components/utilities";

export default async function Transactions({params}: {params:any}) {
  type MonthsStrings = keyof typeof Months;
  const { month } = await params;
  const monthAsNumber = Months[month as MonthsStrings]
  const currentMonth = new Date().getMonth()
  const currentYear =  new Date().getFullYear()
  const date = `${month}, ${monthAsNumber > currentMonth ? currentYear - 1 : currentYear}`;

  let netAmount = 0;
  let positiveAmount = 0;
  let negativeAmount = 0;

  const response = await getTransactionsByUserAndMonthAction(monthAsNumber);

  if (!response.successful) {
    console.log(response.message);
  }

  if (!response.data) {
    return
  }

  let dates = response?.data;

  const transactionsByDate = dates.map((transactionsAndDate: any, index: number) => {
    let transactions = JSON.parse(transactionsAndDate.transactions);

    transactions = transactions.map((transaction: Transaction) => {
      transaction.weekDay = getWeekdayName(transaction.date);
      transaction.date = convertDateForDisplay(transaction.date);
      transaction.time = convertTimeForDisplay(transaction.time);
      return transaction;
    })

    return transactions
  })
  
  const categoriesAndAmounts = getCategories();
  const categories = Array.from(categoriesAndAmounts.keys());
  const amountForCategory = Array.from(categoriesAndAmounts.values());


  
  function getCategories() {
    const categoriesMap = new Map();
  
    transactionsByDate.forEach((transactions: Transaction[]) => {
      transactions.forEach((transaction: Transaction) => {
        
        if (transaction.isExpense === 0) {
          netAmount += transaction.amount;
          positiveAmount += transaction.amount;
        }
        else {
          netAmount -= transaction.amount;
          negativeAmount += transaction.amount;
        }

        if (categoriesMap.has(transaction.category)) {
          categoriesMap.set(transaction.category, categoriesMap.get(transaction.category) + transaction.amount);
        }
        else {
          categoriesMap.set(transaction.category, transaction.amount);
        }
      });
    });
   
    return categoriesMap;
  }

  return (
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
      <div className = {style.titleAnaDateWrapper}>
        <p className = {style.title}>Transactions</p>

        <DateSelectPanel text={date}/>
      </div>

      <section className={style.statisticsContainer + " " + style.backgroundBlur}>
        <section className={style.chartContainer}>
          <div className={style.chartInnerDiv}>
            <CustomChart categories = {categories} amountForCategory = {amountForCategory}/>    
          </div>
        </section>

        <section className = {style.netAmountContainer}>
          <p className = "amountPositive">{`${positiveAmount}lv`}</p>
          <p>{`-`}</p>
          <p className = "amountNegative">{`${Math.abs(negativeAmount)}lv`}</p>
          <p>{`=`}</p>
          <p className = {style.netAmount}>{`${netAmount}lv`}</p>
        </section>
      </section>

      {transactionsByDate.map((transactions: any, index: number) => {
        return <TransactionByDay key={index} transactions={transactions}/>
      })}   
    </div>
  );
}
