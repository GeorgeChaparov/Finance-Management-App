import { Months, transactionsArray } from "@/src/consts";
import style from "./page.module.css";
import { Transaction } from "@/src/types/Transaction";
import TransactionByDay from "@/src/components/transactions-by-day/TransactionByDay";
import DateSelectPanel from "@/src/app/transactions/[month]/SpecificComponents/DateSelectPanel/DateSelectPanel";
import BackgroundCircles from "@/src/components/background-circles/BackgroundCircles";

export default async function Category({params}: {params:any}) {
  type MonthsStrings = keyof typeof Months;

  const { month, id} = await params;

  const currentMonth = new Date().getMonth()
  const currentYear =  new Date().getFullYear()
  const date = `${month}, ${Months[month as MonthsStrings] > currentMonth ? currentYear - 1 : currentYear}`;

  let transactions = transactionsArray;

  let negativeAmount = 0;

  for (let i = 0; i < transactions.length; i++) {
    const amount = transactions[i].amount;

    if (amount < 0) {
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
        <p className = {style.categoryTitle}>Transactions</p>

        <DateSelectPanel text={date}/>
      </div>

      <div className={style.expensesWrapper}>
        <span className={style.expensesTitle}>Spend this month</span>
        <span className={style.expensesAmount}>{Math.abs(negativeAmount)}lv</span>
      </div>

      {transactionsByDate.map((transactions, index) => <TransactionByDay key={index} transactions={transactions}/>)}   
    </div>
  );
}