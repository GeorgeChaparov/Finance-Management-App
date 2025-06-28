import { weekDays } from "@/src/consts";
import Loading from "../loading/Loading";
import Menu from "../menu/Menu";
import Transaction from "../transaction/Transaction";
import style from "./transactionByDay.module.css"
import { Transaction as TransactionClass } from "@/src/types/Transaction";

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

    return(
        <Suspense fallback={<Loading />}>
            <section className={style.container}>
                <div className={style.infoContainer}>
                    <div className={style.dateWrapper}>
                        <p className={style.date}>{date}</p>
                        <p className={style.dayOfWeek}>{day}</p>
                    </div>
                    <div className={style.amountWrapper}>
                        <p className={amountStyle}>{`${endAmount}lv`}</p>
                    </div>
                </div>
                {transactions.map(transaction => 
                        <Transaction key={transaction.id} transaction = {transaction}/>)}
            </section>
            <Menu/>
        </Suspense>
    )
}

export default TransactionByDay;