
import style from "./Home.module.css";
import MenuButtons from "./MenuButtons/MenuButtons"
import AddTransactionButton from "./AddTransactionButton/AddTransactionButton"

function Menu({children, isInHome = true}) {
  return (
    <div className={style.menuWrapper}>
        {children}

        <AddTransactionButton />
        <MenuButtons isInHome={isInHome}/>
    </div>  
  );
}

export default Menu;
