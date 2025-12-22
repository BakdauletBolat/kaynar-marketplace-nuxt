import {defineStore} from "pinia";
import {getProducts, type ProductList} from "~/api/products";

export const useProductStore = defineStore("product-store", {
    state: () => {
        return {
            products: [] as ProductList[],
            isLoadingProducts: false,
            popularProducts: [] as ProductList[],
            pageCount: 0
        }
    },
    actions: {
        async loadProducts(options: object) {
            this.isLoadingProducts = true;
            getProducts({...options, 
                page_size: 20, 
                status: 2
            }).then(res=>{
                this.products = res.results;
                this.pageCount = res.count;
            }).finally(()=>{
                this.isLoadingProducts = false;
            })
        },
        loadPopularProducts(options: object) {
            const popularOptions = {page_size: 10, status: 2, ...options};
            getProducts(popularOptions).then(res=>{
                this.popularProducts = res.results;
            })
        }
    }
})