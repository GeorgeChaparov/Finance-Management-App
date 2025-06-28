export interface Category {
    name: string,
    iconName: string,
    userId: string,
}

export interface CategoryRequest {
    userId: string
}

export interface CategoryResponse {
    name: string,
    iconName: string,
}

export interface DBCategory extends Category {
    id: string;
}