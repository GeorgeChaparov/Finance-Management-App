"use server"

import style from "./page.module.css";
import DateSelectPanelAndButton from "./SpecificComponents/DateSelectPanelAndButton/DateSelectPanelAndButton";
import CustomChart from "./SpecificComponents/CustomChart/CustomChart";
import { Months, transactionsArray } from "@/src/consts";
import { Transaction } from "@/src/types/Transaction";
import BackgroundCircles from "@/src/components/background-circles/BackgroundCircles";
import TransactionByDay from "@/src/components/transactions-by-day/TransactionByDay";

export default async function Transactions({params}: {params:any}) {
  type MonthsStrings = keyof typeof Months;
  const { month } = await params;

  const currentMonth = new Date().getMonth()
  const currentYear =  new Date().getFullYear()
  const date = `${month}, ${Months[month as MonthsStrings] > currentMonth ? currentYear - 1 : currentYear}`;

  let transactions = transactionsArray;

  let netAmount = 0;
  let positiveAmount = 0;
  let negativeAmount = 0;

  const expensesByCategory = getExpensesByCategory(transactions)
  
  const finalExpenses = expensesByCategory.slice(0, 4);

  let otherExpenses = 0;
  for (let i = 4; i < expensesByCategory.length; i++) {
    const expense = expensesByCategory[i];
    otherExpenses+= expense[1];
  }

  finalExpenses.push(["Others", otherExpenses]);

  const categories = finalExpenses.map(item => item[0]);
  const amountForCategory = finalExpenses.map(item => item[1]);

  for (let i = 0; i < transactions.length; i++) {
    const amount = transactions[i].amount;
    netAmount += amount;

    if (amount > 0) {
      positiveAmount += amount;
    }else{
      negativeAmount += amount;
    }
  }

  transactions.sort((a, b) => {
    const toComparable = (d:string) => d.split('.').reverse().join('');

    return toComparable(a.date).localeCompare(toComparable(b.date));
  });

  transactions.reverse();

  
  const transactionsByDate = GetTransactionsByDay(transactions);
  transactionsByDate.forEach(innerTransitions => {
    innerTransitions = sortTransactionsByTime(innerTransitions);
    innerTransitions.reverse();
  })
  
  function GetTransactionsByDay(_transactions:Array<Transaction>) {
    let transactionsByDay = [];
    let currentDayGroup: Transaction[] = [];
    let currentDate = _transactions[0].date;
  
    for (let i = 0; i < _transactions.length; i++) {
      const transaction = _transactions[i];
  
      if (transaction.date === currentDate) {
        currentDayGroup.push(transaction);
      } else {
        transactionsByDay.push(currentDayGroup);

        currentDayGroup = [transaction];
        currentDate = transaction.date;       
      }
    }

    if (currentDayGroup.length > 0) {
      transactionsByDay.push(currentDayGroup);
    }
  
    return transactionsByDay;
  }

  function getExpensesByCategory(transactions: Transaction[]) {
    const expenseByCategory = new Map();

    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      
      if (transaction.amount > 0) {
        continue;
      }

      if (expenseByCategory.has(transaction.category)) {
        expenseByCategory.set(transaction.category, expenseByCategory.get(transaction.category) + transaction.amount)
      }else{
        expenseByCategory.set(transaction.category, transaction.amount)
      }
    }
    return [...expenseByCategory].sort((a, b) => a[1] - b[1]);;
  }

  function sortTransactionsByTime(transactions: Transaction[]) {
    return [...transactions].sort((a, b) => {
      // return a.time.localeCompare(b.time);
      
      // If we need to handle 24-hour format specially (not sure yet):
      return Number(a.time.replace(':', '')) - Number(b.time.replace(':', ''));
    });
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

        <DateSelectPanelAndButton text={date}/>
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

      {transactionsByDate.map((transactions, index) => <TransactionByDay key={index} transactions={transactions}/>)}   
    </div>
  );
}