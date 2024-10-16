import style from "./page.module.css";
import TransactionByDay from "@/app/components/TransactionsByDay/TransactionByDay";
import DateSelectPanelAndButton from "../SpecificComponents/DateSelectPanelAndButton/DateSelectPanelAndButton";
import logo from "../../lidl.png"
import CustomChart from "../SpecificComponents/CustomChart/CustomChart";


export default function Transactions({params}) {
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

  const monthsEnum = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12};
  const { month } = params;

  const currentMonth = new Date().getMonth()
  const currentYear =  new Date().getFullYear()
  const date = `${month}, ${monthsEnum[month] > currentMonth ? currentYear - 1 : currentYear}`;

  function GetTransactionsByDay(transactions) {
    let transactionsByDay = [];
    let currentDayGroup = [];
    let currentDate = transactions[0].date;
  
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
  
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