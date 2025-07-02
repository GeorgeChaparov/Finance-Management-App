export interface Category {
    name: string,
    iconName: string,
    userId: string,
}

export interface CategoriesRequest {
    userId: string
}

export interface CategoryRequest {
    userId: string,
    categoryId: string
}

export interface GetCategoryResponse {
    name: string,
    iconName: string,
}

export interface DBCategory extends Category {
    id: string;
}