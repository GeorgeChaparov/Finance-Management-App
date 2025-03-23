import style from "./page.module.css";
import TransactionByDay from "@/app/components/TransactionsByDay/TransactionByDay";
import DateSelectPanelAndButton from "../SpecificComponents/DateSelectPanelAndButton/DateSelectPanelAndButton";
import CustomChart from "../SpecificComponents/CustomChart/CustomChart";
import {monthsEnum, transactionsArray} from "@/utilities";

export default async function Transactions({params}) {
  const { month } = await params;

  const currentMonth = new Date().getMonth()
  const currentYear =  new Date().getFullYear()
  const date = `${month}, ${monthsEnum[month] > currentMonth ? currentYear - 1 : currentYear}`;

  var transactions = transactionsArray;

  var netAmount = 0;
  var positiveAmount = 0;
  var negativeAmount = 0;

  const expensesByCategory = GetExpensesByCategory(transactions)
  
  const finalExpenses = expensesByCategory.slice(0, 4);
  var otherExpenses = 0;
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
      
    const dateA = a.date.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1');
    const dateB = b.date.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1');
    
    return new Date(dateA) - new Date(dateB);
  });

  transactions.reverse();

  
  transactions = GetTransactionsByDay(transactions);
  transactions.forEach(innerTransitions => {
    innerTransitions = sortTransactionsByTime(innerTransitions);
    innerTransitions.reverse();
  })

  function GetTransactionsByDay(_transactions) {
    let transactionsByDay = [];
    let currentDayGroup = [];
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

  function GetExpensesByCategory(transactions) {
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

  function sortTransactionsByTime(transactions) {
    return transactions.sort((a, b) => {
      const timeA = a.time.replace(/(\d{2}):(\d{2})/, '$1:$2');
      const timeB = b.time.replace(/(\d{2}):(\d{2})/, '$1:$2');
      
      return new Date(`1970-01-01T${timeA}:00`) - new Date(`1970-01-01T${timeB}:00`);
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

      {transactions.map((transaction, index) => <TransactionByDay key={index} transactions={transaction}/>)}   
    </div>
  );
}