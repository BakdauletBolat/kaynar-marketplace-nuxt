import {defineStore} from "pinia";
import axios from "~/api";


export const useFeadBackStore = defineStore("feadback-store", {
    state: () => {
        return {
            phone: null as string | null,
            nickname: null as string | null,
            isLoading: false,
        }
    },
    actions: {
        async createFeadback() {
            this.isLoading = true;
            axios.post("/api/feedback/", {
                phone: this.phone,
                name: this.nickname
            }).then(() => {
                this.phone = '';
                this.nickname = '';
            }).finally(() => {
                this.isLoading = false;
            })
        }
    }
})