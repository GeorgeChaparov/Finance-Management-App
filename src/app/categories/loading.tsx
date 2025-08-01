import style from "./page.module.css"
import Button from "@/src/components/basic/button/Button"
import Menu from "@/src/components/menu/Menu"
import Image from "next/image"
import addIcon from "@/public/add_white.png"
import CategoryElementSkeleton from "@/src/components/category-element/CategoryElementSkeleton"

export default function Loading() {
  return (
    <>
        <section className={style.page}> 
            <section className={style.titleAndNavigationWrapper}>
                Categories
                <Button attributes={{className: style.addCategoryButton}}>
                    <Image src={addIcon} alt=""></Image>
                </Button>
            </section>
            <section className={style.categories}>
                <CategoryElementSkeleton></CategoryElementSkeleton>
                <CategoryElementSkeleton></CategoryElementSkeleton>
                <CategoryElementSkeleton></CategoryElementSkeleton>
            </section>

            <Menu isInHome={false} hide={false}></Menu>
        </section>
    </>
  )
}