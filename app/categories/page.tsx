import Button from "../components/Basic/Button/Button"
import Menu from "../components/Menu/Menu"
import style from "./page.module.css"
import CategoryElement from "../components/CategoryElement/CategoryElement"
import starIcon from "@/public/category_icons/star_icon.png"
import Image from "next/image"

export default function Categories() {


   return (
    <section className={style.page}> 
        <section className={style.titleAndNavigationWrapper}>
            Categories
            <Button className={style.addCategoryButton}>
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

        <Menu isInHome={false}></Menu>
    </section>
   ) 
}