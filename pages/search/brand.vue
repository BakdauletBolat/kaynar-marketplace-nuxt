<template>
  <main class="w-full">
    <section class="content">
      <div>
        <n-input type="text" size="large"
                 v-model:value="manufacturerStore.searchTermManufacturer"
                 placeholder="Поиск по маркам">
          <template #suffix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </div>
      <div class="mt-4">
        <n-list clickable v-if="manufacturerStore.manufacturers.length > 0">
          <n-list-item :class="{
            'bg-yellow-100': isSelected(manufacturer.id)
          }" class="!px-4"
                       @click="()=>navigateModel(manufacturer.id.toString())"
                       v-for="manufacturer in manufacturerStore.manufacturers">
            {{manufacturer.name}}
            <template #suffix>
              <n-icon size="16" v-if="isSelected(manufacturer.id)" :component="Checkbox" />
              <n-icon size="16" v-else :component="ChevronForward"></n-icon>
            </template>
          </n-list-item>
        </n-list>
        <div v-else class="px-4">
          <not-found-banner-component
              :search-text="manufacturerStore.searchTermManufacturer">
          </not-found-banner-component>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import {NInput, NIcon, NList, NListItem} from 'naive-ui';
import {Search, ChevronForward, Checkbox} from '@vicons/ionicons5'
import {useManufacturerStore} from "~/storages/manufacturer-store";
import NotFoundBannerComponent from "~/components/not-found-banner-component.vue";
import {useFilterStore} from "~/storages/filter-store";

const manufacturerStore = useManufacturerStore();
const carModelsStore = useCarModelsStore();
const filterStore = useFilterStore();


function isSelected(manufacturerId: number) {
  return manufacturerId == filterStore.filterValues.manufacturer;
}

async function navigateModel(manufacturerId: string) {
    filterStore.clearManufacturerValues();
    const manufacturer = parseInt(manufacturerId);
    filterStore.filterValues.manufacturer = manufacturer
    await carModelsStore.loadCarModelsByManufacturer(manufacturer)
    filterStore.openModelDrawer();
}

watch(()=>manufacturerStore.searchTermManufacturer, (searchTerm: string, _: string)=>{
  manufacturerStore.searchManufacturers(searchTerm);
})

onMounted(()=>{
  manufacturerStore.loadManufacturers();
})

</script>