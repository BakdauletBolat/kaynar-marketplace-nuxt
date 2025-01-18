// stores/userStore.ts
import { defineStore } from "pinia";
import {type ProductList} from '@/api/products';


interface FavoritesStore {
    favorites: ProductList[];
    isLoading: boolean;
}

export const useFavoritesStore = defineStore("favorites-store", {
    state: (): FavoritesStore => ({
        favorites: [],
        isLoading: false,
    }),
    actions: {
        loadState() {
            if (localStorage.getItem("favorites") != null) {
                this.favorites = JSON.parse(localStorage.getItem("favorites")!);
            }
        },
        updateState() {
            if (localStorage.getItem("favorites") != null) {
                localStorage.setItem("favorites", JSON.stringify(this.favorites));
            } else {
                localStorage.setItem("favorites", JSON.stringify(this.favorites));
            }
        },
        checkInFavorites(index: number) {
            return this.favorites.findIndex((item=>item.id == index)) != -1;
        },
        addToFavorite(product: ProductList) {
            const findIndex = this.favorites.findIndex((item=>item.id == product.id));
            let action = 'added';
            if (findIndex == -1) {
                this.favorites.push(product);
            }
            else {
                action = 'removed';
                this.favorites.splice(findIndex, 1);
            }
            this.updateState();
            return action;

        },
        loadFavorites() {
          this.loadState();
        },
    },
});
