"use client"

import style from "./CategoryElement.module.css"
import Image from "next/image"
import trashIcon from "@/public/trash_icon.png"
import Button from "@/src/components/basic/button/Button"
import { categoryIconsPath } from "@/src/consts"
import { DBCategory } from "@/src/types/Categories"
import starIcon from "@/public/category_icons/0_star_icon.png"


export default function CategoryElementSkeleton() {
   return (
    <form className={style.category}>
        <Button>
            <Image src={starIcon} alt={""} width={20} height={20}></Image>
        </Button>
        
        <Button attributes={{className: style.deleteButton, type: "submit"}} >
            <Image src={trashIcon} alt={""}></Image>
        </Button>
    </form>
   ) 
}