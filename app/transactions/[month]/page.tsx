import style from "./page.module.css";
import TransactionByDay from "../../components/TransactionsByDay/TransactionByDay";
import DateSelectPanelAndButton from "./SpecificComponents/DateSelectPanelAndButton/DateSelectPanelAndButton";
import CustomChart from "./SpecificComponents/CustomChart/CustomChart";
import {Months, Transaction, transactionsArray} from "../../../utilities";

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

  const expensesByCategory = GetExpensesByCategory(transactions)
  
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

  function GetExpensesByCategory(transactions: Transaction[]) {
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
      <div className = {style.titleAnaDateWrapper}>
        <p className = {style.title}>Transactions</p>

        <DateSelectPanelAndButton text={date}/>
      </div>

      <div className={style.chartContainer}>
        <div className={style.chartInnerDiv}>
          <CustomChart categories = {categories} amountForCategory = {amountForCategory}/>    
        </div>
      </div>
      
      <div className = {style.netAmountContainer}>
        <p className = "amountPositive">{`${positiveAmount}lv`}</p>
        <p>{`-`}</p>
        <p className = "amountNegative">{`${Math.abs(negativeAmount)}lv`}</p>
        <p>{`=`}</p>
        <p className = {style.netAmount}>{`${netAmount}lv`}</p>
      </div>

      {transactionsByDate.map((transactions, index) => <TransactionByDay key={index} transactions={transactions}/>)}   
    </div>
  );
}