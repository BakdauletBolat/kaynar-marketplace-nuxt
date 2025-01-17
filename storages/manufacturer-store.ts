import {defineStore} from "pinia";
import axiosInstance from "~/api";
import type {IDefaultAPI} from "~/api/interfaces";
import {loadWithCache} from "~/api/loadWithCache";

export const useManufacturerStore = defineStore("manufacturer-store", {
    state: () => {
        return {
            manufacturers: [] as IDefaultAPI[],
            manufacturer: null as IDefaultAPI | null,
            rawManufacturers: [] as IDefaultAPI[],
            searchTermManufacturer: '' as string
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
        async loadManufacturers() {
            const response = await loadWithCache(axiosInstance, '/api/car/manufacturers/')
            this.manufacturers = response.data.results;
            this.rawManufacturers = this.manufacturers;
        },
        searchManufacturers(searchTerm: string = '') {
            if (searchTerm.length === 0) {
                this.manufacturers = this.rawManufacturers;
            }
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            this.manufacturers = this.rawManufacturers.filter(item => regex.test(item.name));
        },
        getManufacturerById(id: string) {
            const value = this.manufacturers.findIndex((item: any) => item.id === parseInt(id));
            if (value != -1) {
                return {
                    label: this.manufacturers[value].name,
                    value: this.manufacturers[value].id
                }
            }
            return null;
        },
    }
})