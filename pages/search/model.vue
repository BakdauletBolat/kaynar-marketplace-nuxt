<template>
  <main >

    <section class="content">
      <div>
        <n-input type="text" size="large"
                 v-model:value="carModelsStore.searchTermModelCar"
                 placeholder="Поиск по маркам">
          <template #suffix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </div>
      <div class="mt-4" @click="closeDrawers">
        <div class="px-4 py-2 text-blue-500 cursor-pointer w-full">Выбрать все модели</div>
      </div>
      <div class="mt-2">
        <n-list clickable v-if="carModelsStore.carModels.length > 0">
          <n-list-item class="!px-4" :class="{
            'bg-yellow-100': isSelected(carModel.id)
          }" @click="()=>pickModelCar(carModel.id)" v-for="carModel in carModelsStore.carModels">
            {{carModel.name}}
            <template #suffix>
              <n-icon size="16" v-if="isSelected(carModel.id)" :component="Checkbox" />
              <n-icon size="16" v-else :component="ChevronForward"></n-icon>
            </template>
          </n-list-item>
        </n-list>
        <div v-else class="px-4">
          <not-found-banner-component
              :search-text="carModelsStore.searchTermModelCar">
          </not-found-banner-component>
        </div>
      </div>
    </section>
    <section class="footer">
      <transition name="slide-up">
        <div v-if="canShowConfirmButton()" class="component w-full px-4 flex justify-center fixed left-0 z-30 bottom-[80px]">
          <n-button @click="closeDrawers" type="primary" round class="w-full" size="large">Выбрать {{filterStore.filterValues.modelCar.length}} моделей</n-button>
        </div>
      </transition>
    </section>
  </main>
</template>
<script lang="ts" setup>
import {NPageHeader, NInput, NIcon, NList, NListItem} from 'naive-ui';
import { Search, ChevronForward, Checkbox} from '@vicons/ionicons5'
import NotFoundBannerComponent from "~/components/not-found-banner-component.vue";
import {useCarModelsStore} from "~/storages/car-models-store";
import {useFilterStore} from "~/storages/filter-store";
import type {IDefaultAPI} from "~/api/interfaces";

const carModelsStore = useCarModelsStore();
const manufacturerStore = useManufacturerStore();

const filterStore = useFilterStore();
const route = useRoute()


function canShowConfirmButton() {
  return filterStore.filterValues.modelCar.length > 0;
}

function pickModelCar(value: number) {
    if (filterStore.filterValues.modelCar!.includes(value)) {
      filterStore.filterValues.modelCar!.splice(filterStore.filterValues.modelCar.indexOf(value), 1);
    }
    else {
      filterStore.filterValues.modelCar!.push(value);
    }
}

function closeDrawers() {
  filterStore.closeDrawers();
}

function isSelected(carModelId: number) {
  return filterStore.filterValues.modelCar!.includes(carModelId);
}

watch(()=>carModelsStore.searchTermModelCar, (searchTerm: string, _: string)=>{
  carModelsStore.searchCarModels(searchTerm);
})



</script>