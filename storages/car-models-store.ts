import {defineStore} from "pinia";
import axiosInstance from "~/api";
import {loadWithCache} from "~/api/loadWithCache";

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
            rawCarModels: [] as CarModel[],
            searchTermModelCar: '' as string
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
        async loadCarModels() {
            const response = await loadWithCache(axiosInstance, "/api/car/models/?page_size=10000");
            this.carModels = response.data.results;
            this.rawCarModels = response.data.results;
        },
        searchCarModels(searchTerm: string = '') {
            if (searchTerm.length === 0) {
                this.carModels = this.rawCarModels;
            }
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            this.carModels = this.rawCarModels.filter(item => regex.test(item.name));
        },
        getModelLabelsByIds(ids: string[]) {
            console.log(ids)
            const modelsForReturn = []
            ids.forEach((id)=>{
                const value = this.carModels.findIndex((item: any) => item.id === id);
                if (value != -1) {
                    modelsForReturn.push(this.carModels[value].name)
                }
            })

            return modelsForReturn.join(', ');
        },
        async loadCarModelsByManufacturer(value: number | null) {
            const response = await loadWithCache(axiosInstance, `/api/car/models/?manufacturer=${value}&page_size=10000`);
            this.carModels = response.data.results;
            this.rawCarModels = response.data.results;
        },

    }
})