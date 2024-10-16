import style from "./transactionByDay.module.css"
import Transaction from "../Transaction/Transaction"
import Menu from "../Menu/Menu";


function TransactionByDay({transactions}) {
    const date = transactions[0].date;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const day = days[new Date(date.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')).getDay()];

    var endAmount = 0;

    transactions.forEach(transaction => {
        endAmount += transaction.amount})

    var amountStyle = endAmount > 0 ? "amountPositive" : "amountNegative";
    var amount = `${endAmount}lv`;

    return(
        <Menu>
            <div className={style.container}>
            <div className={style.infoContainer}>
                <div className={style.dateWrapper}>
                    <p className={style.date}>{date}</p>
                    <p className={style.dayOfWeek}>{day}</p>
                </div>
                <div className={style.amountWrapper}>
                    <p className={amountStyle}>{amount}</p>
                </div>
            </div>

                {transactions.map(transaction => 
                    <Transaction key={transaction.id} logo={transaction.logo} name={transaction.name} category={transaction.category} amount={transaction.amount} time={transaction.time}/>)}

            </div>
        </Menu>
        
    )
}

export default TransactionByDay;