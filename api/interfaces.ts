export interface IDefaultAPI {
    id: number;
    name: string;
}

export interface ISelectOption {
    label: string;
    value: string | number;
    type?: string
}

export interface Category {
    id: number;
    name: string;
    parent: number | null;
    children: Category[]; // Это и есть рекурсивное определение типа
}