import Image from "next/image";
import style from "./Transaction.module.css"
import Button from "../basic/button/Button";
import { Transaction as TransactionClass} from "@/src/types/Transaction";
import { redirect } from "next/navigation";
import { categoryIconsPath } from "@/src/consts";

type Transaction = {transaction: TransactionClass, isOnHomePage?: boolean, onClick?: Function}

function Transaction({transaction, isOnHomePage = false}: Transaction) {
    const amount = transaction.amount;
    const amountStyle = transaction.isExpense == 0 ? "amountPositive" : "amountNegative";
    const endAmount = `${isOnHomePage ? Math.abs(amount) : amount}lv`;

    const dateOrTime = isOnHomePage ? transaction.date : transaction.time;

    return(
        <Button attributes={{onClick: async () => {"use server"; redirect(`/transaction/${transaction.id}`)}, className: style.background}}>
            <Image className={style.logo} src={categoryIconsPath + transaction.iconName} alt={transaction.iconName} width="40" height="40"/>
            <div className={style.nameAndCategoryWrapper}>
                <p className={style.name}>{transaction.name}</p>
                <p className={style.category}>{transaction.category}</p>
            </div>
            <div className={style.amountAndDateWrapper}>
                <p className={amountStyle}>{endAmount}</p>
                <p className={style.dateOrTime}>{dateOrTime}</p>
            </div>
        </Button>
    )
}

export default Transaction;