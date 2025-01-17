import {defineStore} from "pinia";
import axiosInstance from "~/api";
import {loadWithCache} from "~/api/loadWithCache";

interface AxleConfiguration {
    id: number;
    name: string;
}

// Interface for body type
interface BodyType {
    id: number;
    name: string;
}

// Interface for drive type
interface DriveType {
    id: number;
    name: string;
}

// Interface for fuel type
interface FuelType {
    id: number;
    name: string;
}

// Interface for gear type
interface GearType {
    id: number;
    name: string;
}



// Interface for steering type
interface SteeringType {
    id: number;
    name: string;
}

// Define the main interface
interface CarFilterData {
    axleConfiguration: AxleConfiguration[];
    bodyType: BodyType[];
    capacity: number[];
    driveType: DriveType[];
    engineDisplacement: number[]; // Replace 'any' with a more specific type if available
    fuelType: FuelType[];
    gearType: GearType[];
    numberOfCycle: number[];
    numberOfValves: number[];
    power: number[];
    steeringType: SteeringType[];
    vinCode: number[]; // Replace 'any' with a more specific type if available
}

export const useFilterStore = defineStore("filter-products", {
    state: () => {
        return {
            filterValues: {
                search: null as string | null,
                category: [] as string[],
                modelCar: [] as string[],
                manufacturer: null as number | null,
                axleConfiguration: null as number | null,
                bodyType: null as number | null,
                capacity: null as number | null,
                driveType: null as number | null,
                engineDisplacement: null as number | null,
                fuelType: null as number | null,
                gearType: null as number | null,
                numberOfCycle: null as number | null,
                numberOfValves: null as number | null,
                power: null as number | null,
                steeringType: null as number | null,
                vinCode: null as number | null,
                year_start: null as number | null,
                year_end: null as number | null,
            },
            filterData: {} as CarFilterData
        }
    },
    actions:  {
        async loadFilters() {
            const response = await loadWithCache(axiosInstance, "/api/car/filters/")
            this.filterData = response.data;
        },
        clearManufacturerValues() {
            this.filterValues.manufacturer = null;
            this.filterValues.modelCar = [];
        },
        clearValues() {
            this.filterValues = {
                search: null,
                category: [],
                modelCar: [],
                manufacturer: null,
                axleConfiguration: null,
                bodyType: null,
                capacity: null,
                driveType: null,
                engineDisplacement: null,
                fuelType: null,
                gearType: null,
                numberOfCycle: null,
                numberOfValves: null,
                power: null,
                steeringType: null,
                vinCode: null,
                year_start: null,
                year_end: null,
            }
        }
    },
    getters: {
        filtersForm: (state) => {
            const filterForm: any[] = []
            Object.keys(state.filterData).forEach(key=> {
                let type;
                let options;
                let title;
                switch (key) {
                    case "axleConfiguration":
                        type = 'radio';
                        options = state.filterData[key].map(item=>{return {label: item.name, value: item.name}});
                        title = "Конфигурация оси";
                        break;
                    case "bodyType":
                        type = 'radio';
                        options = state.filterData[key].map(item=>{return {label: item.name, value: item.name}});
                        title = "Тип кузова";
                        break;
                    case "capacity":
                        type = 'select';
                        options = state.filterData[key].map(item=>{return {label: item, value: item}});
                        title = "Eмкость";
                        break;
                    case "driveType":
                        type = 'radio';
                        options = state.filterData[key].map(item=>{return {label: item.name, value: item.name}});
                        title = "Тип диска";
                        break;
                    case "engineDisplacement":
                        type = 'select';
                        options = state.filterData[key].map(item=>{return {label: item, value: item}});
                        title = "Объем двигателя";
                        break;
                    case "fuelType":
                        type = 'radio';
                        options = state.filterData[key].map(item=>{return {label: item.name, value: item.name}});
                        title = "Тип топлива";
                        break;
                    case "gearType":
                        type = 'radio';
                        options = state.filterData[key].map(item=>{return {label: item.name, value: item.name}});
                        title = "Тип шестерни";
                        break;
                    case "numberOfCycle":
                        type = 'select';
                        options = state.filterData[key].map(item=>{return {label: item, value: item}});
                        title = "Количество циклов";
                        break;
                    case "numberOfValves":
                        type = 'select';
                        options = state.filterData[key].map(item=>{return {label: item, value: item}});
                        title = "Количество клапанов";
                        break;
                    case "power":
                        type = 'select';
                        options = state.filterData[key].map(item=>{return {label: item, value: item}});
                        title = "Мощность";
                        break;
                    case "steeringType":
                        type = 'radio';
                        options = state.filterData[key].map(item=>{return {label: item.name, value: item.name}});
                        title = "Тип рулевого управления";
                        break;
                    case "vinCode":
                        type = 'select';
                        options = state.filterData[key].map(item=>{return {label: item, value: item}});
                        title = "Винкод";
                        break;
                }
                filterForm.push({
                    type,
                    title,
                    options,
                    key
                })
            });
            return filterForm;
        }
    }
})