"use client"

import style from "./page.module.css"
import starIcon from "@/public/category_icons/star_icon.png"
import Image from "next/image"
import { useState } from "react"
import AddTransaction from "./SpecificComponents/AddTransaction/AddTransaction"
import Button from "@/src/components/basic/button/Button"
import CategoryElement from "@/src/components/category-element/CategoryElement"
import Menu from "@/src/components/menu/Menu"

export default function Categories() {
    const [shouldShowAddForm, setShouldShowAddForm] = useState(false);

    const showAddForm = () => {
        setShouldShowAddForm(!shouldShowAddForm);
    }

   return (
    <>
        {shouldShowAddForm && <AddTransaction closeCallback={showAddForm}></AddTransaction>}
        <section className={style.page}> 
            <section className={style.titleAndNavigationWrapper}>
                Categories
                <Button className={style.addCategoryButton} events={["click"]} callbacks={[showAddForm]} >
                    <Image src={starIcon} alt=""></Image>
                </Button>
            </section>
            <section className={style.categories}>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"My very long category, it's sooo long that it needs more then one row"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Carmasfomofobiqnchestvuva "}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>
            <CategoryElement icon={starIcon} title={"Car"}></CategoryElement>

            </section>

            <Menu isInHome={false} hide={false}></Menu>
        </section>
    </>
   ) 
}