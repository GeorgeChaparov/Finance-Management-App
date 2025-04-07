import style from "./transactionByDay.module.css"
import Transaction from "../Transaction/Transaction"
import Menu from "../Menu/Menu";
import {weekDays, Transaction as TransactionClass} from "../../../utilities";
import Loading from "../Loading/Loading";
import { Suspense } from "react";

type TransactionByDayProps = {transactions: Array<TransactionClass>}

function TransactionByDay({transactions}: TransactionByDayProps) {
    const date = transactions[0].date;
    
    const day = weekDays[new Date(date.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')).getDay()];

    let endAmount = 0;

    transactions.forEach(transaction => {
        endAmount += transaction.amount
    })

    const amountStyle = endAmount > 0 ? "amountPositive" : "amountNegative";
    const amount = `${endAmount}lv`;

    return(
        <Suspense fallback={<Loading />}>
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
                        <Transaction key={transaction.id} transaction = {transaction}/>)}
            </div>
            <Menu/>
        </Suspense>
    )
}

export default TransactionByDay;