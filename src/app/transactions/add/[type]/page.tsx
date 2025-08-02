"use server";

import style from "./page.module.css";
import BackgroundCircles from "@/src/components/background-circles/BackgroundCircles";
import Calculator from "@/src/components/calculator/Calculator";
import Menu from "@/src/components/menu/Menu";
import Input from "@/src/components/basic/input/Input";
import { RadioButtons } from "./SpecificComponents/RadioButtons/RadioButtons";
import DataTimePicker from "./SpecificComponents/DataTimePicker/DataTimePicker";
import AddCancelButton from "./SpecificComponents/AddCancleButton/AddCancleButton";
import CategoryMenu from "./SpecificComponents/CategoriesMenu/CategoriesMenu";
import { getCategoryAction } from "@/src/lib/actions/categoryAction";
import { createTransactionAction } from "@/src/lib/actions/transactionActions";
import { convertDateForDisplay, convertTimeForDisplay } from "@/src/utilities";

export default async function AddTransaction({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined }}) {
  const date = new Date();

  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  const today = convertDateForDisplay({dayOfMonth, month, year});
  
  const rawDate=`${year}-${String(month).padStart(2, "0")}-${String(dayOfMonth).padStart(2, "0")}`;

  let categories: Record<string, string>[] = [{}];

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const rawTime = `${hours}:${minutes}`;


  
  const transactionDate = today;
  const transactionTime = convertTimeForDisplay(date);

  const response = await getCategoryAction();
  
  if (response.successful) {
    if (response.data) {
      categories = response.data.categories as Record<string, string>[];
    }
  }

  return (
    <>
      <BackgroundCircles  
      circles={[
        {
          variants:{init: {top: "200px", left: "-320px"}, animate: {left:"calc(50% - 300px)"}}, 
          radius: 320
        },
        {
          variants:{init: {top: "70px", right: "-260px"}, animate: {left:"50%"}, },
          radius: 260
        },
        {
          variants:{init: {top: "0px", right: "-150px"}, animate: {left:"calc(50% - 150px)"}, },
          radius: 150
        },
        {
          variants:{init: {bottom: "70px", right: "-220px"}, animate: {left:"calc(50% - 160px)"}}, 
          radius: 220
        },
        {
          variants:{init: {bottom: "100px", right: "-220px"}, animate: {left:"50%"}}, 
          radius: 220
        },
      ]} 
      transitionDelay={0.1}
      height="100vh">
      </BackgroundCircles> 

      <form className={style.page} action={createTransactionAction}>

        <section className={style.contentWrapperOne}>
          <Input attributes={{name: "categoryName", type: "text", placeholder: "Name", className: style.name, required: true, maxLength: 45}} />

          <DataTimePicker rawDate={rawDate} rawTime={rawTime} date={transactionDate} time={transactionTime}></DataTimePicker>

          <RadioButtons></RadioButtons>
          
          <CategoryMenu categories={categories}></CategoryMenu>
        </section>
              
        <section className={style.contentWrapperTwo}>
          <textarea name="note" className={style.note} placeholder="Note"></textarea>
          <Calculator></Calculator>
        </section>

        <AddCancelButton></AddCancelButton>
        <Menu hide={true}/>
      </form>
    </>
  );
}