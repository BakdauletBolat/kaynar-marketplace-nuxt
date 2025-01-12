<template>
    <div class="">
        <div class="grid py-[100px] lg:grid-cols-[3fr_2fr] gap-4 items-start justify-center">
            <div class="flex justify-center text-white w-full h-full flex-col">
                <h1 class="text-2xl">
                    <strong class="text-primary">Б/у автозапчасти </strong>Онлайн
                </h1>
                <p class="mt-2">
                    Выбирайте из 70 000 б/у запчастей по доступным ценам в одном
                    магазине
                </p>
            </div>
            <div class="w-full justify-center flex h-full items-center">
                <div class="flex w-full gap-2 flex-col bg-white p-4 rounded-lg">
                    <h2 class="text-xl font-bold mb-3">
                        Запчасти для вашего автомобиля
                    </h2>
                    <n-select v-model:value="filterStore.filterValues.manufacturer" filterable clearable
                        placeholder="Марка" :on-update:value="onChangeManufacturer"
                        :options="manufacturersOptions"></n-select>
                    <n-select filterable clearable v-model:value="filterStore.filterValues.modelCar"
                        :disabled="!filterStore.filterValues.manufacturer" placeholder="Модель"
                        :options="carModelsOptions"></n-select>
                    <n-select filterable clearable v-model:value="filterStore.filterValues.category"
                        placeholder="Название детали" :options="categoryStore.categoriesOptions">
                    </n-select>
                    <n-button type="primary" @click="search">
                        <template #icon>
                            <magnifying-glass-icon></magnifying-glass-icon>
                        </template>
                        Искать
                    </n-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { NSelect, NButton } from "naive-ui";
import { ref, computed } from "vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import axiosInstance, { customFetch } from "@/api";
import { useRouter } from "vue-router";
import { type IDefaultAPI, type ISelectOption } from "@/api/interfaces";
import { useCategoryStore } from "~/storages/category-storage";
import { useFilterStore } from "~/storages/filter-store";

const router = useRouter();

const categoryStore = useCategoryStore();
const filterStore = useFilterStore();

const { data: manufacturers } = useAsyncData("manufacturers", () =>
    getManufacturers(),
);

const manufacturersOptions = computed(() => {
    if (manufacturers.value != null) {
        return manufacturers.value!.results.map((item) => {
            return {
                label: item.name,
                value: item.id,
            };
        });
    }
    return [];
});

const carModelsOptions = ref<ISelectOption[]>([]);

onMounted(() => {
    categoryStore.loadCategories();
});

function clearModelCar() {
    filterStore.filterValues.modelCar = null;
}

function onChangeManufacturer(value: number) {
    clearModelCar();
    filterStore.filterValues.manufacturer = value;
    getCarModels(value);
}

function search() {
    router.push({
        name: filterStore.filterValues.manufacturer != null
            ? "catalog-manufacturerId"
            : "catalog",
        query: {
            category: filterStore.filterValues.category?.toString(),
            modelCar: filterStore.filterValues.modelCar?.toString(),
        },
        params: {
            manufacturerId: filterStore.filterValues.manufacturer != undefined
                ? filterStore.filterValues.manufacturer
                : null,
        },
    });
}

function getManufacturers() {
    return customFetch<{
        results: IDefaultAPI[];
    }>("/api/car/manufacturers/");
}

function getCarModels(value: number) {
    axiosInstance
        .get<{
            results: IDefaultAPI[];
        }>(`/api/car/models/?manufacturer=${value}`)
        .then((res) => {
            carModelsOptions.value = res.data.results.map((item) => {
                return {
                    label: item.name,
                    value: item.id,
                };
            });
        })
        .catch((e) => {
            console.log(e);
        });
}
</script>
