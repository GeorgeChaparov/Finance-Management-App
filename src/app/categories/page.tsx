"use client"

import style from "./page.module.css"
import starIcon from "@/public/category_icons/0_star_icon.png"
import addIcon from "@/public/add_white.png"
import Image from "next/image"
import { useState, useEffect} from "react"
import AddTransaction from "./SpecificComponents/AddTransaction/AddTransaction"
import Button from "@/src/components/basic/button/Button"
import CategoryElement from "@/src/components/category-element/CategoryElement"
import Menu from "@/src/components/menu/Menu"
import { CategoryResponse, DBCategory } from "@/src/types/Categories"

export default function Categories() {
    const [shouldShowAddForm, setShouldShowAddForm] = useState(false);
    const [categories, setCategories]: any = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/category', {method: "GET"});
                const categoires: CategoryResponse[] = await res.json();
                setCategories(categoires); 
            } catch (error) {
                console.error('Failed to fetch:', error);
            }
        };

    fetchData();
    }, [])

    async function showAddForm () {
        setShouldShowAddForm(!shouldShowAddForm);
    }

    function deleteCategory (id: string) {
        setCategories((prev:any) => prev.filter((category:any) => category.id != id));
    }

    function addCategory (data: any) {
        const newCategory: CategoryResponse = data as CategoryResponse;
        setCategories((prev:any) => [...prev, newCategory]);
    }

    return (
    <>
        {shouldShowAddForm && <AddTransaction closeCallback={showAddForm} addCallback={addCategory}></AddTransaction>}
        <section className={style.page}> 
            <section className={style.titleAndNavigationWrapper}>
                Categories
                <Button className={style.addCategoryButton} events={["click"]} callbacks={[showAddForm]} >
                    <Image src={addIcon} alt=""></Image>
                </Button>
            </section>
            <section className={style.categories}>
                {categories.map((category: DBCategory) => {
                    return (
                        <CategoryElement key={category.id} category={category} deleteCallback={deleteCategory}></CategoryElement>
                    )
                })}
            </section>

            <Menu isInHome={false} hide={false}></Menu>
        </section>
    </>
   ) 
}