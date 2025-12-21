<template>
  <main class="page">
    <n-page-header @back="handleBack" class="fixed w-full z-10 top-0 bg-primary px-4 py-2 shadow">
      <template #title>
      <span style="text-decoration: none; color: inherit">
        Марка
      </span>
      </template>
    </n-page-header>
    <section class="content">
      <div class="mt-[60px] px-4">
        <n-input type="text" size="large"
                 v-model:value="manufacturerStore.searchTermManufacturer"
                 placeholder="Поиск по маркам">
          <template #suffix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </div>
      <div class="mt-4">
        <div v-if="manufacturerStore.manufacturers.length > 0">
          <div v-if="manufacturerStore.popularManufacturers.length > 0" class="mb-4">
            <div class="px-4 py-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Популярные
            </div>
            <n-list clickable>
              <n-list-item
                v-for="manufacturer in manufacturerStore.popularManufacturers"
                :key="manufacturer.id"
                :class="{
                  'bg-yellow-100': isSelected(manufacturer.id)
                }"
                class="!px-4"
                @click="()=>navigateModel(manufacturer.id.toString())"
              >
                {{manufacturer.name}}
                <template #suffix>
                  <n-icon size="16" v-if="isSelected(manufacturer.id)" :component="Checkbox" />
                  <n-icon size="16" v-else :component="ChevronForward"></n-icon>
                </template>
              </n-list-item>
            </n-list>
          </div>

          <div v-if="manufacturerStore.otherManufacturers.length > 0">
            <div class="px-4 py-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Все производители
            </div>
            <n-list clickable>
              <n-list-item
                v-for="manufacturer in manufacturerStore.otherManufacturers"
                :key="manufacturer.id"
                :class="{
                  'bg-yellow-100': isSelected(manufacturer.id)
                }"
                class="!px-4"
                @click="()=>navigateModel(manufacturer.id.toString())"
              >
                {{manufacturer.name}}
                <template #suffix>
                  <n-icon size="16" v-if="isSelected(manufacturer.id)" :component="Checkbox" />
                  <n-icon size="16" v-else :component="ChevronForward"></n-icon>
                </template>
              </n-list-item>
            </n-list>
          </div>
        </div>

        <div v-else class="px-4">
          <not-found-banner-component :search-text="manufacturerStore.searchTermManufacturer" />
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import {NPageHeader, NInput, NIcon, NList, NListItem} from 'naive-ui';
import {Search, ChevronForward, Checkbox} from '@vicons/ionicons5'
import {useManufacturerStore} from "~/storages/manufacturer-store";
import NotFoundBannerComponent from "~/components/not-found-banner-component.vue";
import {useFilterStore} from "~/storages/filter-store";

const manufacturerStore = useManufacturerStore();
const filterStore = useFilterStore();

const router = useRouter()

function handleBack() {
  router.back()
}

function isSelected(manufacturerId: number) {
  return manufacturerId == filterStore.filterValues.manufacturer;
}

function navigateModel(manufacturerId: string) {
    filterStore.clearManufacturerValues();
    filterStore.filterValues.manufacturer = parseInt(manufacturerId);
    router.push({
      name: 'search-model',
      query: {
        manufacturerId: manufacturerId,
      }
    })
}

watch(()=>manufacturerStore.searchTermManufacturer, (searchTerm: string, _: string)=>{
  manufacturerStore.searchManufacturers(searchTerm);
})

onMounted(()=>{
  manufacturerStore.loadManufacturers();
})

</script>
