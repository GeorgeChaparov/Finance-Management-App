import style from "./CategoryElement.module.css"
import Image from "next/image"
import trashIcon from "@/public/trash_icon.png"
import Button from "@/src/components/basic/button/Button"
import { categoryIconsPath } from "@/src/consts"
import { DBCategory } from "@/src/types/Categories"
import { deleteCategoryAction } from "@/src/lib/actions/categoryAction"
import { useActionState } from "react"
import { HttpStatus } from "@/src/enums"


export default function CategoryElement({category, deleteCallback} : {category: DBCategory, deleteCallback: Function}) {
    const deleteAction = async (prevState: any, formData: FormData) => {
        const response = await deleteCategoryAction(prevState, formData);
        if (!response.successful) alert(response.message);

        const id = response.data != null ? response.data.id : null;
        deleteCallback(id);
        return response
    }

    const [state, formAction, isPending] = useActionState(deleteAction, {successful: true, statusCode: HttpStatus.Accepted_202});

   return (
    <form className={style.category} action={formAction}>
        <input type="hidden" name="categoryId" value={category.id} />
        <Button>
            <Image src={categoryIconsPath + category.iconName} alt={""} width={20} height={20}></Image>
            {category.name}
        </Button>
        
        <Button attributes={{className: style.deleteButton, type: "submit"}} >
            <Image src={trashIcon} alt={""}></Image>
        </Button>
    </form>
   ) 
}