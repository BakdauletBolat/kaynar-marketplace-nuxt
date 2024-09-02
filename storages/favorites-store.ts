// stores/userStore.ts
import { defineStore } from "pinia";
import {ProductList} from '@/api/products';


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
            if (localStorage.getItem("favorites") != undefined) {
                this.favorites = JSON.parse(localStorage.getItem("favorites"));
            }
        },
        updateState() {
            if (localStorage.getItem("favorites") != undefined) {
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

export const rules = {
    password: {
        required: true,
        type: "string",
        min: 1,
        max: 128,
        message: "Password is required",
        trigger: "blur",
    },
    phone: {
        required: true,
        message: "Invalid phone number",
        trigger: "blur",
    },
    first_name: {
        required: true,
        type: "string",
        min: 1,
        max: 255,
        message: "First name is required",
        trigger: "blur",
    },
    last_name: {
        required: true,
        type: "string",
        min: 1,
        max: 255,
        message: "Last name is required",
        trigger: "blur",
    },
};
