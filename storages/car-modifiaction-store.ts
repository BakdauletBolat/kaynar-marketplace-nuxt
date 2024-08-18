import {defineStore} from "pinia";
import axiosInstance from "~/api";
import type {CarModel} from "~/storages/car-models-store";

interface ModelCar {
    id: number;
    name: string;
    startDate: string;  // Use 'string' for dates, or 'Date' if you parse them into Date objects
    endDate: string | null;  // Nullable field
    manufacturer: number;
}

// Define the main interface using the ModelCar interface
export interface CarModification {
    id: number;
    axleConfiguration: string | null;  // Nullable field
    engines: any[];  // Assuming this is an array of engine objects. Replace 'any' with a more specific type if known.
    driveType: string;
    gearType: string | null;  // Nullable field
    fuelType: string;
    bodyType: string;
    modelCar: ModelCar;
    name: string;
    capacity: number;
    power: number;
    numberOfCycle: number;
    numberOfValves: number;
    vinCode: number;
    engineDisplacement: number | null;  // Nullable field
    steeringType: string | null;  // Nullable field
}


export const useCarModificationStore = defineStore("car-modification-store", {
    state: () => {
        return {
            carModifications: [] as CarModification[],
        }
    },
    actions: {
        loadCarModels(options: object) {
            axiosInstance.get("/api/car/modifications/")
                .then((res) => {
                    this.carModifications = res.data.results;
                })
        }
    }
})