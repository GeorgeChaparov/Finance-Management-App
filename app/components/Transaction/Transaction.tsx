import Image from "next/image";
import defaultStyle from "./defaultTransaction.module.css"
import homePageStyle from "./homePageTransaction.module.css"
import { Transaction as TransactionClass} from "../../../utilities";
type PopupPanelProps = {transaction: TransactionClass, isOnHomePage?: boolean}

function Transaction({transaction, isOnHomePage = false}: PopupPanelProps) {

    const style = isOnHomePage ? homePageStyle : defaultStyle;
    const amount = transaction.amount;
    const date = transaction.date;
    const amountStyle = amount >= 0 ? "amountPositive" : "amountNegative";
    const endAmount = `${isOnHomePage ? Math.abs(amount) : amount}lv`;

    const dateOrTime = date ? date : transaction.time;

    return(
        <div className={style.background}>
            <Image className={style.logo} src={transaction.logo} alt="logo" width="40" height="40"/>
            <div className={style.nameAndCategoryWrapper}>
                <p className={style.name}>{transaction.name}</p>
                <p className={style.category}>{transaction.category}</p>
            </div>
            <div className={style.amountAndDateWrapper}>

                <p className={amountStyle}>{endAmount}</p>
                <p className={style.dateOrTime}>{dateOrTime}</p>
            </div>
        </div>
    )
}

export default Transaction;