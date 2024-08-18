import {defineStore} from "pinia";
import axiosInstance from "~/api";
import type {IDefaultAPI} from "~/api/interfaces";
import type {SelectOption} from "naive-ui";

export const useManufacturerStore = defineStore("manufacturer-store", {
    state: () => {
        return {
            manufacturers: [] as IDefaultAPI[],
            manufacturer: null as IDefaultAPI | null
         }
    },
    getters: {
        manufacturersByLetterGrouping: (state) => {
            return state.manufacturers.reduce((accumulator, currentItem) => {
                // Get the first letter of the current item and convert to uppercase
                const firstLetter = currentItem.name[0].toUpperCase();

                // Initialize the array for this letter if it doesn't exist
                // @ts-ignore
                if (!accumulator[firstLetter]) {
                    // @ts-ignore
                    accumulator[firstLetter] = [];
                }

                // Add the current item to the corresponding letter's array
                // @ts-ignore
                accumulator[firstLetter].push(currentItem);

                return accumulator;
            }, {});
        },
        manufacturerOptions: (state) => {
            return state.manufacturers.map(option=>{
                return {
                    label: option.name,
                    value: option.id
                }
            })
        }
    },
    actions: {
        loadManufacturers() {
            axiosInstance.get("/api/car/manufacturers/")
                .then((res) => {
                    this.manufacturers = res.data.results;
                })
        },
        loadManufacturerById(id: number) {
            axiosInstance.get(`/api/car/manufacturers/${id}`)
                .then((res) => {
                    this.manufacturer = res.data;
                })
        }
    }
})