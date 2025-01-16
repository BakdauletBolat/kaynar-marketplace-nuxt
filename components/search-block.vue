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
                    <div class="lg:flex hidden gap-2 flex-col ">
                      <n-select v-model:value="filterStore.filterValues.manufacturer"
                                filterable
                                clearable
                                placeholder="Марка"
                                :on-update:value="onChangeManufacturer"
                                :options="manufacturerStore.manufacturerOptions"></n-select>
                      <n-select v-model:value="filterStore.filterValues.modelCar"
                                filterable
                                clearable
                                multiple
                                :disabled="!filterStore.filterValues.manufacturer"
                                placeholder="Модель"
                                :options="carModelStore.modelCarOptions"></n-select>
                      <n-select
                          v-model:value="filterStore.filterValues.category"
                          filterable
                          clearable
                          placeholder="Название детали"
                          :options="categoryStore.categoriesOptions">
                      </n-select>
                    </div>
                    <div class="lg:hidden">
                      <div v-if="filterStore.filterValues.manufacturer">
                        <div class="flex w-full justify-between px-4 py-2">
                          <div class="cursor-pointer" @click="navigatePickManufacturer">
                            <span class="text-lg">{{manufacturerStore.getManufacturerById(filterStore.filterValues.manufacturer).label}}</span>
                            <div class="flex text-sm text-gray-600">
                              <span>{{carModelStore.getModelLabelsByIds(filterStore.filterValues.modelCar)}}</span>
                            </div>
                          </div>
                          <n-button text @click="filterStore.clearManufacturerValues">
                            <template #icon>
                              <n-icon size="26">
                                <XCircleIcon></XCircleIcon>
                              </n-icon>
                            </template>
                          </n-button>
                        </div>
                      </div>
                      <n-button v-else @click="navigatePickManufacturer" size="large" class="w-full">
                        Добавить марку
                        <template #icon>
                          <n-icon>
                            <PlusIcon />
                          </n-icon>
                        </template>
                      </n-button>
                      <div>
                        <div class="text-gray-400 my-2">Год Выпуска</div>
                        <div class="grid grid-cols-2 gap-2">
                          <n-input-number
                              size="large"
                              v-model:value="filterStore.filterValues.year_start"
                              placeholder="c"
                              :min="1900"
                              :max="2030"
                          />
                          <n-input-number
                              size="large"
                              v-model:value="filterStore.filterValues.year_end"
                              placeholder="По"
                              :min="1900"
                              :max="2030"
                          />
                        </div>
                      </div>
                    </div>
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
import { XCircleIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { useCategoryStore } from "~/storages/category-storage";
import { useFilterStore } from "~/storages/filter-store";
import {useManufacturerStore} from "~/storages/manufacturer-store";
import {useCarModelsStore} from "~/storages/car-models-store";

const router = useRouter();

const categoryStore = useCategoryStore();
const filterStore = useFilterStore();
const manufacturerStore = useManufacturerStore();
const carModelStore = useCarModelsStore();


function navigatePickManufacturer() {
  router.push({
    name: 'search-brand'
  });
}

onMounted(() => {
    categoryStore.loadCategories();
});

function clearModelCar() {
    filterStore.filterValues.modelCar = [];
}

function onChangeManufacturer(value: number) {
    clearModelCar();
    filterStore.filterValues.manufacturer = value;
    carModelStore.loadCarModelsByManufacturer(value);
}

function search() {
    router.push({
        name: filterStore.filterValues.manufacturer != null
            ? "catalog-manufacturerId"
            : "catalog",
        query: {
            category: filterStore.filterValues.category?.toString(),
            modelCar: filterStore.filterValues.modelCar!.join(',')
        },
        params: {
            manufacturerId: filterStore.filterValues.manufacturer != undefined
                ? filterStore.filterValues.manufacturer
                : null,
        },
    });
}
</script>
