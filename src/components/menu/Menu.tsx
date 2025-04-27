
import MenuButtons from "./menu-buttons/MenuButtons"
import AddTransactionButton from "./add-transaction-button/AddTransactionButton"

function Menu({hide = false, isInHome = true}) {
  return (
    <>
        <AddTransactionButton hide={hide}/>
        <MenuButtons isInHome={isInHome} hide={hide}/>
    </>  
  );
}

export default Menu;
