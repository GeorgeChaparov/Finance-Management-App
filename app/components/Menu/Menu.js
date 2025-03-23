
import MenuButtons from "./MenuButtons/MenuButtons"
import AddTransactionButton from "./AddTransactionButton/AddTransactionButton"

function Menu({hide = false, isInHome = true}) {
  return (
    <>
        <AddTransactionButton hide={hide}/>
        <MenuButtons isInHome={isInHome} hide={hide}/>
    </>  
  );
}

export default Menu;
