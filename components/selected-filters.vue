<template>
    <!-- Показываем блок, только если есть хотя бы один активный фильтр -->
    <div v-if="activeFilters.length > 0" 
         class="selected-filters-container"
         :class="{ 'is-compact': mode === 'compact', 'is-default': mode === 'default' }">
      <ul class="selected-filters-list" :class="{ 'flex-nowrap': mode === 'compact', 'flex-wrap': mode === 'default' }">
        <!-- Проходим по каждому активному фильтру -->
        <li v-for="filter in activeFilters" :key="filter.key" class="filter-chip">
          <span class="filter-chip__label">
            <span class="hidden sm:inline">{{ filter.label }}:</span>
            <span class="filter-chip__value">{{ filter.displayValue }}</span>
          </span>
          <!-- Кнопка для удаления фильтра -->
          <button @click="removeFilter(filter)" class="filter-chip__remove-btn" aria-label="Удалить фильтр">
            <n-icon :component="CloseCircle" />
          </button>
        </li>
        <!-- Кнопка для очистки всех фильтров сразу (только в desktop/default режиме или если мало фильтров) -->
        <li v-if="mode === 'default' || activeFilters.length < 3">
            <n-button quaternary size="tiny" @click="clearAllFilters" class="text-xs">
              Очистить все
            </n-button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { NButton, NIcon } from 'naive-ui';
  import { CloseCircle } from '@vicons/ionicons5';
  
  // --- STORES ---
  import { useFilterStore } from '@/storages/filter-store';
  import { useManufacturerStore } from '~/storages/manufacturer-store';
  import { useCarModelsStore } from '~/storages/car-models-store';
  import { useCategoryStore } from '~/storages/category-storage';
  import { useProductStore } from '~/storages/product-store'; 
  
  const props = withDefaults(defineProps<{
      mode?: 'default' | 'compact'
  }>(), {
      mode: 'default'
  });

  const filterStore = useFilterStore();
  const manufacturerStore = useManufacturerStore();
  const modelCarStore = useCarModelsStore();
  const categoryStore = useCategoryStore();
  const productStore = useProductStore();
  
  // --- COMPUTED: Главная логика компонента ---
  const activeFilters = computed(() => {
    const filtersToShow: { key: string; label: string; displayValue: string; value: any }[] = [];
    const { filterValues, filterData } = filterStore;
  
    // Карта для перевода ключей в названия
    const labelMap: Record<string, string> = {
      search: 'Поиск',
      manufacturer: 'Производитель',
      modelCar: 'Модель',
      category: 'Категория',
      year_start: 'Год с',
      year_end: 'Год по',
      // Динамические фильтры
      ...Object.fromEntries(
          filterStore.filtersForm.map(f => [f.key, f.title])
      )
    };
  
    for (const key in filterValues) {
      const value = filterValues[key as keyof typeof filterValues];
      const label = labelMap[key];
  
      if (!label || value == null || value === '' || (Array.isArray(value) && value.length === 0)) {
        continue;
      }
  
      let displayValue = '';
  
      switch (key) {
        case 'search':
          displayValue = value as string;
          break;
        case 'manufacturer':
          displayValue = manufacturerStore.getManufacturerById(value as number)?.label ?? 'Неизвестно';
          break;
        case 'modelCar':
          displayValue = (Array.isArray(value) ? value : [String(value)])
            .map((id) => modelCarStore.getModelCarById(id)?.label ?? id)
            .join(', ');
          break;
        case 'category':
          displayValue = (Array.isArray(value) ? value : [String(value)])
            .map((id) => categoryStore.getCategoryById(String(id)) ?? String(id))
            .join(', ');
          break;
        default:
          const dynamicFilter = filterStore.filtersForm.find(f => f.key === key);
          if (dynamicFilter && dynamicFilter.options) {
              const option = dynamicFilter.options.find(o => o.value === value);
              displayValue = option?.label ?? String(value);
          } else {
              displayValue = String(value);
          }
      }
  
      if (displayValue) {
        filtersToShow.push({ key, label, displayValue, value });
      }
    }
  
    return filtersToShow;
  });
  
  // --- METHODS ---
  function removeFilter(filter: { key: string }) {
    const key = filter.key as keyof typeof filterStore.filterValues;
    const initialValue = filterStore.filterValues[key];
  
    if (Array.isArray(initialValue)) {
      (filterStore.filterValues[key] as any[]) = [];
    } else {
      (filterStore.filterValues[key] as null | number | string) = null;
    }
  
    if (key === 'manufacturer') {
      filterStore.filterValues.modelCar = [];
    }
  
    productStore.loadProducts(filterStore.filterValues);
  }
  
  function clearAllFilters() {
    filterStore.clearValues();
    productStore.loadProducts(filterStore.filterValues);
  }
  
  </script>
  
  <style scoped>
  .selected-filters-container {
    @apply flex items-start gap-4 dark:bg-black;
  }
  .selected-filters-container.is-default {
      @apply p-3 mb-4 bg-slate-50 dark:bg-dark-bg dark:border dark:border-0 rounded-lg;
  }
  .selected-filters-container.is-compact {
      @apply p-0 mb-0 bg-transparent border-0;
  }

  .selected-filters-list {
    @apply flex gap-2 flex-grow list-none p-0 m-0 items-center;
  }
  
  .filter-chip {
    @apply flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium pl-3 pr-1 py-1 rounded-full whitespace-nowrap flex-shrink-0;
  }
  .filter-chip__label {
    @apply text-slate-600 dark:text-slate-400;
  }
  .filter-chip__value {
    @apply font-bold text-slate-800 dark:text-white ml-1;
  }
  .filter-chip__remove-btn {
    @apply ml-1 flex-shrink-0 appearance-none bg-transparent border-none cursor-pointer
           rounded-full text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors flex items-center justify-center;
  }
  </style>
