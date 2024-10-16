import Image from "next/image";
import defaultStyle from "./defaultTransaction.module.css"
import homePageStyle from "./homePageTransaction.module.css"
import PropTypes from 'prop-types'

function Transaction({amount, date, time, logo, name, category, isOnHomePage = false}) {

    const style = isOnHomePage ? homePageStyle : defaultStyle;
    const amountStyle = amount > 0 ? "amountPositive" : "amountNegative";
    const endAmount = `${isOnHomePage ? Math.abs(amount) : amount}lv`;

    const dateOrTime = date ? date : time;

    return(
        <div className={style.background}>
            <Image
            className={style.logo}
            src={logo}
            alt="logo"
            width="40"
            height="40">

            </Image>
            <div className={style.nameAndCategoryWrapper}>
                <p className={style.name}>{name}</p>
                <p className={style.category}>{category}</p>
            </div>
            <div className={style.amountAndDateWrapper}>

                <p className={amountStyle}>{endAmount}</p>
                <p className={style.dateOrTime}>{dateOrTime}</p>
            </div>
        </div>
    )
}

Transaction.propTypes ={
    logo: PropTypes.Image,
    name: PropTypes.string,
    category: PropTypes.string,
    amount: PropTypes.int,
    name: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string
}

export default Transaction;