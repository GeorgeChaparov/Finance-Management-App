import Image from "next/image";
import style from "./Transaction.module.css"
import { Transaction as TransactionClass} from "../../../utilities";
type PopupPanelProps = {transaction: TransactionClass, isOnHomePage?: boolean}

function Transaction({transaction, isOnHomePage = false}: PopupPanelProps) {

    const amount = transaction.amount;
    const amountStyle = amount >= 0 ? "amountPositive" : "amountNegative";
    const endAmount = `${isOnHomePage ? Math.abs(amount) : amount}lv`;

    const dateOrTime = isOnHomePage ? transaction.date : transaction.time;

    return(
        <section className={style.background}>
            <Image className={style.logo} src={transaction.logo} alt="logo" width="40" height="40"/>
            <div className={style.nameAndCategoryWrapper}>
                <p className={style.name}>{transaction.name}</p>
                <p className={style.category}>{transaction.category}</p>
            </div>
            <div className={style.amountAndDateWrapper}>
                <p className={amountStyle}>{endAmount}</p>
                <p className={style.dateOrTime}>{dateOrTime}</p>
            </div>
        </section>
    )
}

export default Transaction;