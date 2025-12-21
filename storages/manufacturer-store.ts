import {defineStore} from "pinia";
import axiosInstance from "~/api";
import type {IDefaultAPI} from "~/api/interfaces";
import {loadWithCache} from "~/api/loadWithCache";

const POPULAR_MANUFACTURERS = [
    "AUDI",
    "BMW",
    "DAEWOO",
    "KIA",
    "LADA",
    "MERCEDES-BENZ",
    "MERCEDES BENZ",
    "TOYOTA",
    "VOLVO",
    "MAZDA",
    "FORD",
];

function normalizeManufacturerName(name: string) {
    return name
        .toUpperCase()
        .replace(/[-_]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

const POPULAR_MANUFACTURER_KEYS = POPULAR_MANUFACTURERS.map(normalizeManufacturerName);
const POPULAR_MANUFACTURER_KEY_SET = new Set(POPULAR_MANUFACTURER_KEYS);
const POPULAR_MANUFACTURER_ORDER_INDEX = new Map(
    POPULAR_MANUFACTURER_KEYS.map((key, index) => [key, index] as const),
);

function isPopularManufacturer(name: string) {
    return POPULAR_MANUFACTURER_KEY_SET.has(normalizeManufacturerName(name));
}

function popularManufacturerOrderIndex(name: string) {
    return POPULAR_MANUFACTURER_ORDER_INDEX.get(normalizeManufacturerName(name)) ?? Number.MAX_SAFE_INTEGER;
}

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
        popularManufacturers: (state) => {
            return state.manufacturers
                .filter((m) => isPopularManufacturer(m.name))
                .slice()
                .sort((a, b) => {
                    return (
                        popularManufacturerOrderIndex(a.name) - popularManufacturerOrderIndex(b.name) ||
                        a.name.localeCompare(b.name)
                    );
                });
        },
        otherManufacturers: (state) => {
            return state.manufacturers
                .filter((m) => !isPopularManufacturer(m.name))
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name));
        },
        manufacturerOptions: (state) => {
            const popular = state.manufacturers
                .filter((m) => isPopularManufacturer(m.name))
                .slice()
                .sort((a, b) => {
                    return (
                        popularManufacturerOrderIndex(a.name) - popularManufacturerOrderIndex(b.name) ||
                        a.name.localeCompare(b.name)
                    );
                });
            const other = state.manufacturers
                .filter((m) => !isPopularManufacturer(m.name))
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name));

            const toOption = (m: IDefaultAPI) => ({ label: m.name, value: m.id });

            const options: any[] = [];
            if (popular.length) {
                options.push({
                    type: "group",
                    key: "popular",
                    label: "Популярные",
                    children: popular.map(toOption),
                });
            }
            if (other.length) {
                options.push({
                    type: "group",
                    key: "all",
                    label: "Все производители",
                    children: other.map(toOption),
                });
            }
            return options;
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
