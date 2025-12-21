<template>
  <div class="home-search">
    <div class="home-search__grid">
      <div class="home-search__copy">
        <h1 class="home-search__title">
          <span class="text-primary">Б/у автозапчасти</span> онлайн
        </h1>
        <p class="home-search__subtitle">
          Выбирайте из <span class="font-semibold text-white">70 000+</span> запчастей по доступным ценам — быстро и удобно.
        </p>
        <div class="home-search__badges">
          <span class="home-search__badge">Проверенные поставщики</span>
          <span class="home-search__badge">Доставка по Казахстану</span>
          <span class="home-search__badge">Подбор по авто</span>
        </div>
      </div>

      <div class="home-search__form-wrap">
        <div class="home-search__form">
          <h2 class="home-search__form-title">Запчасти для вашего автомобиля</h2>
          <p class="home-search__form-subtitle">
            Укажите марку, модель и деталь — покажем подходящие предложения.
          </p>

          <div class="home-search__desktop-fields">
            <n-select
              v-model:value="filterStore.filterValues.manufacturer"
              filterable
              clearable
              placeholder="Марка"
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
              :options="carModelStore.modelCarOptions"
            />
            <n-select
              v-model:value="filterStore.filterValues.category"
              filterable
              clearable
              multiple
              :fallback-option="trimCategory"
              placeholder="Название детали"
              :options="categoryStore.categoriesOptions"
            />
          </div>

          <div class="home-search__mobile-fields">
            <div v-if="filterStore.filterValues.manufacturer" class="home-search__mobile-pick">
              <button type="button" class="home-search__mobile-picked" @click="navigatePickManufacturer">
                <span class="home-search__mobile-picked-title">
                  {{ manufacturerStore.getManufacturerById(filterStore.filterValues.manufacturer.toString())?.label }}
                </span>
                <span class="home-search__mobile-picked-subtitle">
                  {{ textForModelCarMobile }}
                </span>
              </button>
              <n-button text aria-label="Очистить" @click="filterStore.clearManufacturerValues">
                <template #icon>
                  <n-icon size="26">
                    <XCircleIcon />
                  </n-icon>
                </template>
              </n-button>
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
              <div class="home-search__year-label">Год выпуска</div>
              <div class="grid grid-cols-2 gap-2">
                <select v-model="yearStartValue" class="year-picker" aria-label="Год выпуска: с">
                  <option value="">с</option>
                  <option v-for="year in years" :key="year" :value="String(year)">
                    {{ year }}
                  </option>
                </select>
                <select v-model="yearEndValue" class="year-picker" aria-label="Год выпуска: по">
                  <option value="">по</option>
                  <option v-for="year in yearsEnd" :key="year" :value="String(year)">
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <n-button type="primary" size="large" class="w-full mt-3" @click="search">
            <template #icon>
              <magnifying-glass-icon />
            </template>
            Искать
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {NSelect, NButton, type SelectOption} from "naive-ui";
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

const textForModelCarMobile = computed(()=>{
  return carModelStore.getModelLabelsByIds(filterStore.filterValues.modelCar).value;
})

const YEAR_MIN = 2000;
const YEAR_MAX = 2025;
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
  router.push({
    name: 'search-brand'
  });
}

onMounted(() => {
    categoryStore.loadCategories();
    // На iOS нативный select открывается как "крутилка".
    // Дефолтные значения ставим только на мобильных, где эти поля видны.
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
  const query: {
    modelCar?: string,
    category?: string,
    year_start?: string,
    year_end?: string
  } = {}

  if (filterStore.filterValues.modelCar.length > 0) {
    query['modelCar'] = filterStore.filterValues.modelCar!.join(',')
  }
  if (filterStore.filterValues.category.length > 0) {
    query['category'] = filterStore.filterValues.category!.join(',')
  }
  if (filterStore.filterValues.year_start) {
    query['year_start'] = String(filterStore.filterValues.year_start);
  }
  if (filterStore.filterValues.year_end) {
    query['year_end'] = String(filterStore.filterValues.year_end);
  }
    router.push({
        name: filterStore.filterValues.manufacturer != null
            ? "catalog-manufacturerId"
            : "catalog",
        query: query,
        params: {
            manufacturerId: filterStore.filterValues.manufacturer != undefined
                ? filterStore.filterValues.manufacturer
                : null,
        },
    });
}

function trimModelCar(value: string): SelectOption {
  return {
    label: carModelStore.getModelCarById(value)?.label,
    value
  }
}

function trimCategory(value: string): SelectOption {
  return {
    label: categoryStore.getCategoryById(value),
    value
  }
}
</script>

<style scoped>
.home-search {
  @apply relative;
}

.home-search__grid {
  @apply grid gap-6 py-12 lg:py-20 lg:grid-cols-[3fr_2fr] items-start;
}

.home-search__copy {
  @apply flex flex-col justify-center text-slate-100;
}

.home-search__title {
  @apply text-3xl lg:text-5xl font-bold tracking-tight leading-tight;
}

.home-search__subtitle {
  @apply mt-3 text-base lg:text-lg text-slate-200 leading-relaxed max-w-[44ch];
}

.home-search__badges {
  @apply mt-6 flex flex-wrap gap-2;
}

.home-search__badge {
  @apply inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100 backdrop-blur;
}

.home-search__form-wrap {
  @apply w-full flex justify-center;
}

.home-search__form {
  @apply w-full rounded-2xl bg-white/95 p-4 lg:p-5 shadow-xl ring-1 ring-black/5 backdrop-blur;
}

.home-search__form-title {
  @apply text-lg lg:text-xl font-bold text-slate-900;
}

.home-search__form-subtitle {
  @apply mt-1 text-sm text-slate-600;
}

.home-search__desktop-fields {
  @apply hidden lg:flex gap-3 flex-col mt-4;
}

.home-search__mobile-fields {
  @apply lg:hidden mt-4 space-y-4;
}

.home-search__mobile-pick {
  @apply flex items-start justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2;
}

.home-search__mobile-picked {
  @apply text-left min-w-0;
}

.home-search__mobile-picked-title {
  @apply block text-base font-semibold text-slate-900 truncate;
}

.home-search__mobile-picked-subtitle {
  @apply mt-0.5 block text-sm text-slate-600 truncate;
}

.home-search__year-label {
  @apply text-sm font-medium text-slate-600 mb-2;
}

.year-picker {
  @apply w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-base text-gray-900 shadow-sm;
  @apply focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary;
}
</style>
