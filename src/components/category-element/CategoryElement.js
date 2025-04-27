import style from "./CategoryElement.module.css"
import Image from "next/image"
import trashIcon from "@/public/trash_icon.png"
import Button from "@/src/components/basic/button/Button"

export default function CategoryElement({title, icon}) {
   return (
    <div className={style.category}>
        <Button>
            <Image src={icon} alt={""}></Image>
            {title}
        </Button>
        
        <Button className={style.deleteButton}>
            <Image src={trashIcon} alt={""}></Image>
        </Button>
    </div>
   ) 
}