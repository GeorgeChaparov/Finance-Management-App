import Image from "next/image";
import style from "./Transaction.module.css"
import Button from "../basic/button/Button";
import { Transaction as TransactionClass} from "@/src/types/Transaction";
import { redirect } from "next/navigation";

type PopupPanelProps = {transaction: TransactionClass, isOnHomePage?: boolean, onClick?: Function}

function Transaction({transaction, isOnHomePage = false}: PopupPanelProps) {

    const amount = transaction.amount;
    const amountStyle = amount >= 0 ? "amountPositive" : "amountNegative";
    const endAmount = `${isOnHomePage ? Math.abs(amount) : amount}lv`;

    const dateOrTime = isOnHomePage ? transaction.date : transaction.time;

    return(
        <Button events={["click"]} callbacks={[async () => {"use server"; redirect(`/transaction/${transaction.id}`)}]} className={style.background}>
            <Image className={style.logo} src={transaction.logo} alt="logo" width="40" height="40"/>
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