import Menu from "./components/Menu/Menu";
import style from "./page.module.css";
import HomeSearchBar from "./SpecificComponents/HomeSearchBar/HomeSearchBar";
import AllTransactionsButton from "./SpecificComponents/AllTransactionsButton/AllTransactionsButton";

export default function Home() {
  return (
    <Menu>
      <div className={style.page}>
      <div className={style.totalBalance}>
        <p className={style.balanceTitle}>Total Balance</p>
        <p className={style.balanceAmount}>3,245.00lv</p>
      </div>

      <div className={style.seperateAmountContainer}>
        <div className={style.inBankWrapper}>
          <p className={style.inBankTitle}>Bank</p>
          <p className={style.inBankAmount}>3,245.00</p>
        </div>

        <div className={style.ceshWrapper}>
          <p className={style.ceshTitle}>Cash</p>
          <p className={style.ceshAmount}>9,999,999.99</p>
        </div>
      </div>

      <div className={style.transactionsTitleAndButtonContainer}>
        <p className={style.transactionsTitle}>Transactions</p>
        <AllTransactionsButton />
      </div>
        <HomeSearchBar />
      </div>
    </Menu>
    
  );
}
