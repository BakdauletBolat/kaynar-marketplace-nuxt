<template>
    <div class="">
        <div
            class="grid py-[100px]  lg:grid-cols-[3fr_2fr] gap-4 items-start justify-center ">
          <div class="flex justify-center text-white w-full h-full flex-col">
            <h1 class="text-2xl">
              <strong class="text-primary">Б/у автозапчасти </strong>онлайн от 3 605 европейских продавцов
            </h1>
            <p class="mt-2">Выбирайте из 18 575 764 б/у запчастей по доступным ценам в одном магазине</p>
          </div>
            <div class="w-full justify-center flex h-full items-center">
                <div class="flex w-full gap-2 flex-col bg-white p-4 rounded-lg">
                  <h2 class="text-xl font-bold mb-3">Запчасти для вашего автомобиля</h2>
                  <SelectSingle placeholder="Марка" v-if="manufacturers" v-model="selectedManufacturer"
                                :options="manufacturers.results"></SelectSingle>
                  <Select :disabled="!selectedManufacturer" placeholder="Модель" name="model" v-if="car_models" v-model="selectedModel"
                          :options="car_models"></Select>
                  <Select :disabled="!selectedModel" placeholder="Название детали" name="Наименования" v-if="catalogStorage.categories.value"
                          v-model="selectedModification" :options="catalogStorage.categories.value"></Select>
                  <button @click="search"
                          class="flex gap-1 cursor-pointer rounded-lg hover:bg-primary-hover mt-3 p-3 bg-primary items-center justify-center">
                    <MagnifyingGlassIcon class="h-5 w-5"></MagnifyingGlassIcon>
                    <div>Искать</div>
                  </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import SelectSingle from '@/components/Select/single.vue';
import Select from '@/components/Select/index.vue';
import { CatalogStorage } from '@/storages/storage';
import { onMounted, ref, watch } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import axiosInstance, {customFetch} from '@/api';
import { useRouter } from 'vue-router';

let selectedManufacturer = ref<any>();
let selectedModel = ref<any>([]);
let selectedModification = ref<any>([]);

const catalogStorage = CatalogStorage.getInstance();

const {data:manufacturers} = useAsyncData('manufacturers', ()=>getManufacturers());

const car_models = ref<any[]>([]);
const router = useRouter();


function search() {
    router.push({
        name: selectedManufacturer.value != null  ? 'catalog-manufacturerId' : 'catalog',
        query: {
            category: selectedModification.value?.map((item:any)=>item.id).toString(),
            modification: selectedModel.value?.map((item:any)=>item.id).toString()
        },
        params: {
          manufacturerId: selectedManufacturer?.value != undefined ? selectedManufacturer?.value.id : null
        }
    });
}

function getManufacturers() {
    return customFetch('/api/car/manufacturers/');
}

watch(selectedManufacturer, (value) => {
    selectedModel.value = [];
    getCarModels(value.id);
});

function getCarModels(value: number) {
    axiosInstance.get(`/api/car/models/?manufacturer=${value}`).then(res => {
        car_models.value = res.data.results;
    })
        .catch(e => {
            console.log(e);
        });
}

function getCategories() {
    axiosInstance.get(`/api/category/?page_size=20`).then(
        (res)=>{catalogStorage.categories.value = res.data.results}
    ).catch(e=>console.log(e));
}

</script>