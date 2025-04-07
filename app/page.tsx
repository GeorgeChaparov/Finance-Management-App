import Menu from "./components/Menu/Menu";
import style from "./page.module.css";
import HomeSearchBar from "./SpecificComponents/HomeSearchBar/HomeSearchBar";
import AllTransactionsButton from "./SpecificComponents/AllTransactionsButton/AllTransactionsButton";

export default function Home() {
  return (
    <>
      <div className={style.page}>
        <div className={style.moneySection}>
          <div className={style.totalBalance}>
            <span className={style.balanceTitle}>Total Balance</span>
            <span className={style.balanceAmount}>3,245.00lv</span>
          </div>

          <div className={style.seperateAmountContainer}>
            <div className={style.inBankWrapper}>
              <span className={style.inBankTitle}>Bank</span>
              <span className={style.inBankAmount}>3,245.00</span>
            </div>

            <div className={style.ceshWrapper}>
              <span className={style.ceshTitle}>Cash</span>
              <span className={style.ceshAmount}>9,999.99</span>
            </div>
          </div>
        </div>
        <div className={style.transactions}>
          <div className={style.transactionSection}>
            <div className={style.titleAndButtonWrapper}>
              Transactions 
              <AllTransactionsButton />
            </div>

            <HomeSearchBar />
          </div>
        </div>
      </div>
      <Menu/>
    </>
  );
}
