import Button from "../basic/button/Button"

export default function Switch() {  
    const categoriesArray = [
        { icon: "@/public/category_icons/star_icon.png", title: "Groceries" },
        { icon: "", title: "Shopping" },
        { icon: "", title: "Dinning" },
        { icon: "", title: "Transport" },
        { icon: "", title: "Entertaiment" },
        { icon: "", title: "Bills" },
        { icon: "", title: "Gifts" },
        { icon: "", title: "Income" },
        { icon: "", title: "Travel" },
        { icon: "", title: "Medicin and Cosmetics" },
    ] 
    return (
        <section>
            <section>
                <div>
                    <Button></Button>
                    Categories
                </div>
                <Button></Button>
            </section>
            <section>
                {categoriesArray.map((category, index) => {
                    return (
                        <div key={index}>
                            <div>
                                {category.icon}
                                {category.title}
                            </div>
                            <Button></Button>
                        </div>
                    )
                })}
            </section>
        </section>
    )
} 