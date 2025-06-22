import {defineStore} from 'pinia'
import axiosInstance from "~/api";
import type {ISelectOption} from "~/api/interfaces";
import type {TreeSelectOption} from "naive-ui";
import {loadWithCache} from "~/api/loadWithCache";
import {type Category} from '@/api/interfaces';



function recursiveCategory(children: any, options: TreeSelectOption[]) {
    for (let i = 0; i<children.length; i++) {
        const category = children[i];
        let option: TreeSelectOption = {
            label: category.name,
            key: category.id
        }
        if (category.children.length>0) {
            const subChildren: TreeSelectOption[] = [];
            recursiveCategory(category.children, subChildren);
            option['children'] = subChildren;
        }
        options.push(option);
    }
}

export const useCategoryStore = defineStore('category', {
    state: () => {
        return {
            categories: [] as Category[],
            categoriesTree: [] as Category[],
            category: null as Category | null
        }
    },
    getters: {
        categoriesOptions: (state) => {
            if (state.categories != undefined) {
                return state.categories.map<ISelectOption>(item=>{
                    return {label: item.name,value:item.id}
                });
            }
            return []

        },
        categoriesTreeOptions: (state) => {
            const options: TreeSelectOption[] = []
            recursiveCategory(state.categoriesTree, options);
            return options;
        }
    },
    actions: {
        loadCategoryById(id: number) {
          axiosInstance.get(`/api/category/${id}`).then(
              res=>{
                  this.category = res.data
              }
          )
        },
        getCategoryById(value: string) {
          const findIndex = this.categories.findIndex((item)=>item.id === parseInt(value));
          if (findIndex != -1) {
              return this.categories[findIndex].name;
          }
          return undefined;
        },
        async loadCategories() {
            const response = await loadWithCache(axiosInstance, `/api/category?page_size=10000`)
            this.categories = response.data.results;
        },
        async loadCategoriesTree() {
            const response = await loadWithCache(axiosInstance, `/api/category/tree`)
            this.categoriesTree = response.data;
        },
    },
})