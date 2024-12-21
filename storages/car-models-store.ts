import {defineStore} from "pinia";
import axiosInstance from "~/api";

export interface CarModel {
    id: number;
    name: string;
    startDate: string;  // Use 'string' for dates; you may convert them to Date objects if needed
    endDate: string;    // Use 'string' for dates; 'Date' if you parse them
    manufacturer: number;
}

export const useCarModelsStore = defineStore("car-models-store", {
    state: () => {
        return {
            carModels: [] as CarModel[],
        }
    },
    getters: {
        modelCarOptions: (state) => {
            return state.carModels.map((item) => {
                return {
                    label: item.name,
                    value: item.id,
                };
            });
        }
    },
    actions: {
        loadCarModels(options: object) {
            axiosInstance.get("/api/car/models/")
                .then((res) => {
                    this.carModels = res.data.results;
                })
        },
        getOptionValueById(id: string) {
            const value = this.carModels.findIndex((item: any) => item.id === id);
            if (value != -1) {
                return {
                    label: this.carModels[value].name,
                    value: this.carModels[value].id
                }
            }
            return null;
        },
        async loadCarModelsByManufacturer(value: number | null) {
            await axiosInstance.get(`/api/car/models/?manufacturer=${value}`)
                .then((res) => {
                    this.carModels = res.data.results;
                })
        },

    }
})