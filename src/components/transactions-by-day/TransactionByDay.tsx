import Menu from "../menu/Menu";
import Transaction from "../transaction/Transaction";
import style from "./transactionByDay.module.css"

function TransactionByDay({transactions}: any) {
    const date = transactions[0].date;

    const day = transactions[0].weekDay;

    let endAmount = 0;

    transactions.forEach((transaction: any) => {
        if (transaction.isExpense === 0) {
            endAmount += transaction.amount;
        }
        else {
            endAmount -= transaction.amount;
        }
    })

    const amountStyle = endAmount > 0 ? "amountPositive" : "amountNegative";

    return(
        <>
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
            {transactions.map((transaction: any) => 
                    <Transaction key={transaction.id} transaction = {transaction}/>)}
        </section>
        <Menu/>
        </>
    )
}

export default TransactionByDay;