"use server";

import style from "./page.module.css";
import { Months } from "@/src/consts";
import BackgroundCircles from "@/src/components/background-circles/BackgroundCircles";
import Calculator from "@/src/components/calculator/Calculator";
import Menu from "@/src/components/menu/Menu";
import Input from "@/src/components/basic/input/Input";
import { RadioButtons } from "./SpecificComponents/RadioButtons/RadioButtons";
import DataTimePicker from "./SpecificComponents/DataTimePicker/DataTimePicker";
import AddCancelButton from "./SpecificComponents/AddCancleButton/AddCancleButton";
import CategoryMenu from "./SpecificComponents/CategoriesMenu/CategoriesMenu";
import { getCategoryAction } from "@/src/lib/actions/categoryAction";

export default async function AddTransaction({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined }}) {
  const date = new Date();
  const today = `${Months[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`;
  let categories: Record<string, string>[] = [{}];

  let hours = date.getHours();
  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; 
  const minutes = String(date.getMinutes()).padStart(2, "0");
  
  const transactionDate = today;
  const transactionTime = `${hours}:${minutes} ${period}`;

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

      <form className={style.page}>

        <section className={style.contentWrapperOne}>
          <Input attributes={{type: "text", placeholder: "Name", className: style.name}} />

          <DataTimePicker date={transactionDate} time={transactionTime}></DataTimePicker>

          <RadioButtons></RadioButtons>
          
          <CategoryMenu categories={categories}></CategoryMenu>
        </section>
              
        <section className={style.contentWrapperTwo}>
          <textarea className={style.note} placeholder="Note"></textarea>
          <Calculator></Calculator>
        </section>

        <AddCancelButton></AddCancelButton>
        <Menu hide={true}/>
      </form>
    </>
  );
}