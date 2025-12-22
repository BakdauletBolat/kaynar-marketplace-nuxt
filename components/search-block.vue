<template>
  <div class="w-full bg-white dark:bg-dark-card rounded-2xl p-5 shadow-lg border border-transparent dark:border-white/5">
    <div class="flex items-center gap-2 mb-5">
       <div class="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
          <FunnelIcon class="w-5 h-5" />
       </div>
       <h2 class="text-lg font-bold text-light-text-main dark:text-dark-text-main">Подбор запчастей</h2>
    </div>

    <div class="flex flex-col gap-4">
      <!-- Desktop Fields (Visible on LG+) -->
      <div class="hidden lg:flex flex-col gap-4">
        <n-select
          v-model:value="filterStore.filterValues.manufacturer"
          filterable
          clearable
          placeholder="Марка авто"
          size="large"
          class="!rounded-xl"
          :on-update:value="onChangeManufacturer"
          :options="manufacturerStore.manufacturerOptions"
        />
        <n-select
          v-model:value="filterStore.filterValues.modelCar"
          filterable
          clearable
          multiple
          :fallback-option="trimModelCar"
          :disabled="!filterStore.filterValues.manufacturer"
          placeholder="Модель"
          size="large"
          class="!rounded-xl"
          :options="carModelStore.modelCarOptions"
        />
        <n-select
          v-model:value="filterStore.filterValues.category"
          filterable
          clearable
          multiple
          :fallback-option="trimCategory"
          placeholder="Название детали"
          size="large"
          class="!rounded-xl"
          :options="categoryStore.categoriesOptions"
        />
      </div>

      <!-- Mobile Fields (Visible on Mobile) -->
      <div class="lg:hidden space-y-4">
        <div v-if="filterStore.filterValues.manufacturer" class="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
          <button type="button" class="text-left" @click="navigatePickManufacturer">
            <span class="block text-xs text-gray-500">Марка и модель</span>
            <span class="block font-bold text-light-text-main dark:text-dark-text-main text-sm">
              {{ manufacturerStore.getManufacturerById(filterStore.filterValues.manufacturer.toString())?.label }}
            </span>
            <span class="block text-xs text-gray-400 truncate max-w-[200px]">
              {{ textForModelCarMobile || 'Все модели' }}
            </span>
          </button>
          <n-button text class="text-gray-400" @click="filterStore.clearManufacturerValues">
            <template #icon>
              <n-icon size="24"><XCircleIcon /></n-icon>
            </template>
          </n-button>
        </div>

        <n-button v-else @click="navigatePickManufacturer" size="large" class="w-full !rounded-xl !h-12 border-dashed !border-gray-300 dark:!border-gray-600 !text-gray-500">
          <template #icon>
            <n-icon><PlusIcon /></n-icon>
          </template>
          Выбрать автомобиль
        </n-button>

        <!-- Year Picker (Universal) -->
        <div>
           <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Год выпуска</div>
           <div class="grid grid-cols-2 gap-3">
              <div class="relative">
                 <select v-model="yearStartValue" class="w-full h-11 pl-3 pr-8 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm focus:border-primary appearance-none dark:text-white">
                    <option value="">От</option>
                    <option v-for="year in years" :key="year" :value="String(year)">{{ year }}</option>
                 </select>
              </div>
              <div class="relative">
                 <select v-model="yearEndValue" class="w-full h-11 pl-3 pr-8 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm focus:border-primary appearance-none dark:text-white">
                    <option value="">До</option>
                    <option v-for="year in yearsEnd" :key="year" :value="String(year)">{{ year }}</option>
                 </select>
              </div>
           </div>
        </div>
      </div>

      <n-button type="primary" size="large" class="w-full !h-12 !rounded-xl !text-base !font-bold shadow-lg shadow-purple-500/20" @click="search">
        <template #icon>
          <magnifying-glass-icon />
        </template>
        Показать запчасти
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NSelect, NButton, NIcon, type SelectOption } from "naive-ui";
import { XCircleIcon, MagnifyingGlassIcon, PlusIcon, FunnelIcon } from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { useCategoryStore } from "~/storages/category-storage";
import { useFilterStore } from "~/storages/filter-store";
import { useManufacturerStore } from "~/storages/manufacturer-store";
import { useCarModelsStore } from "~/storages/car-models-store";

const router = useRouter();
const categoryStore = useCategoryStore();
const filterStore = useFilterStore();
const manufacturerStore = useManufacturerStore();
const carModelStore = useCarModelsStore();

const textForModelCarMobile = computed(() => {
  return carModelStore.getModelLabelsByIds(filterStore.filterValues.modelCar).value;
});

const YEAR_MIN = 2000;
const YEAR_MAX = new Date().getFullYear();
const YEAR_DEFAULT_START = 2010;

const years = computed(() => {
  const list: number[] = [];
  for (let y = YEAR_MAX; y >= YEAR_MIN; y--) list.push(y);
  return list;
});

const yearsEnd = computed(() => {
  const start = filterStore.filterValues.year_start;
  if (!start) return years.value;
  return years.value.filter((year) => year >= start);
});

const yearStartValue = computed<string>({
  get: () => (filterStore.filterValues.year_start ? String(filterStore.filterValues.year_start) : ""),
  set: (value) => {
    const parsed = parseInt(value, 10);
    filterStore.filterValues.year_start = Number.isFinite(parsed) ? parsed : null;
  },
});

const yearEndValue = computed<string>({
  get: () => (filterStore.filterValues.year_end ? String(filterStore.filterValues.year_end) : ""),
  set: (value) => {
    const parsed = parseInt(value, 10);
    filterStore.filterValues.year_end = Number.isFinite(parsed) ? parsed : null;
  },
});

watch(
  () => filterStore.filterValues.year_start,
  (start) => {
    const end = filterStore.filterValues.year_end;
    if (start && end && end < start) {
      filterStore.filterValues.year_end = start;
    }
  }
);

function navigatePickManufacturer() {
  router.push({ name: 'search-brand' });
}

onMounted(() => {
  categoryStore.loadCategories();
  if (window.matchMedia("(max-width: 1023px)").matches) {
    if (filterStore.filterValues.year_start == null) {
      filterStore.filterValues.year_start = YEAR_DEFAULT_START;
    }
    if (filterStore.filterValues.year_end == null) {
      filterStore.filterValues.year_end = YEAR_MAX;
    }
  }
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
  const query: any = {};
  if (filterStore.filterValues.modelCar.length > 0) query['modelCar'] = filterStore.filterValues.modelCar!.join(',');
  if (filterStore.filterValues.category.length > 0) query['category'] = filterStore.filterValues.category!.join(',');
  if (filterStore.filterValues.year_start) query['year_start'] = String(filterStore.filterValues.year_start);
  if (filterStore.filterValues.year_end) query['year_end'] = String(filterStore.filterValues.year_end);

  router.push({
    name: filterStore.filterValues.manufacturer != null ? "catalog-manufacturerId" : "catalog",
    query: query,
    params: {
      manufacturerId: filterStore.filterValues.manufacturer != undefined ? filterStore.filterValues.manufacturer : null,
    },
  });
}

function trimModelCar(value: string): SelectOption {
  return { label: carModelStore.getModelCarById(value)?.label, value };
}

function trimCategory(value: string): SelectOption {
  return { label: categoryStore.getCategoryById(value), value };
}
</script>
