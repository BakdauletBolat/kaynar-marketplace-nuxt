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
    actions: {
        loadCarModels(options: object) {
            axiosInstance.get("/api/car/models/")
                .then((res) => {
                    this.carModels = res.data.results;
                })
        }
    }
})