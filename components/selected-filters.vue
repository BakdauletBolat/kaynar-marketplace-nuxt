<template>
    <!-- Показываем блок, только если есть хотя бы один активный фильтр -->
    <div v-if="activeFilters.length > 0" class="selected-filters-container">
      <ul class="selected-filters-list">
        <!-- Проходим по каждому активному фильтру -->
        <li v-for="filter in activeFilters" :key="filter.key" class="filter-chip">
          <span class="filter-chip__label">
            {{ filter.label }}:
            <span class="filter-chip__value">{{ filter.displayValue }}</span>
          </span>
          <!-- Кнопка для удаления фильтра -->
          <button @click="removeFilter(filter)" class="filter-chip__remove-btn" aria-label="Удалить фильтр">
            <n-icon :component="CloseCircle" />
          </button>
        </li>
      </ul>
      <!-- Кнопка для очистки всех фильтров сразу -->
      <n-button quaternary size="small" @click="clearAllFilters">
        Очистить все
      </n-button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { NButton, NIcon } from 'naive-ui';
  import { CloseCircle } from '@vicons/ionicons5';
  
  // --- STORES ---
  // Импортируем все необходимые сторы для получения человекочитаемых названий
  import { useFilterStore } from '@/storages/filter-store';
  import { useManufacturerStore } from '~/storages/manufacturer-store';
  import { useCarModelsStore } from '~/storages/car-models-store';
  import { useCategoryStore } from '~/storages/category-storage';
  import { useProductStore } from '~/storages/product-store'; // Для запуска нового поиска
  
  const filterStore = useFilterStore();
  const manufacturerStore = useManufacturerStore();
  const modelCarStore = useCarModelsStore();
  const categoryStore = useCategoryStore();
  const productStore = useProductStore();
  
  // --- COMPUTED: Главная логика компонента ---
  // Это вычисляемое свойство преобразует объект filterValues в удобный для отображения массив
  const activeFilters = computed(() => {
    const filtersToShow: { key: string; label: string; displayValue: string; value: any }[] = [];
    const { filterValues, filterData } = filterStore;
  
    // Карта для перевода ключей в названия
    const labelMap: Record<string, string> = {
      search: 'Поиск',
      manufacturer: 'Производитель',
      modelCar: 'Модель',
      category: 'Категория',
      // Динамические фильтры
      ...Object.fromEntries(
          filterStore.filtersForm.map(f => [f.key, f.title])
      )
    };
  
    for (const key in filterValues) {
      const value = filterValues[key as keyof typeof filterValues];
      const label = labelMap[key];
  
      // Пропускаем пустые значения
      if (!label || value === null || (Array.isArray(value) && value.length === 0)) {
        continue;
      }
  
      let displayValue = '';
  
      // Получаем человекочитаемое значение
      switch (key) {
        case 'search':
          displayValue = value as string;
          break;
        case 'manufacturer':
          displayValue = manufacturerStore.getManufacturerById(value as number)?.label ?? 'Неизвестно';
          break;
        case 'modelCar':
          displayValue = (value as string[])
            .map(id => modelCarStore.getModelCarById(id)?.label ?? id)
            .join(', ');
          break;
        case 'category':
          displayValue = (value as string[])
            .map(id => categoryStore.getCategoryLabelById(parseInt(id, 10)) ?? id)
            .join(', ');
          break;
        default:
          // Обработка динамических фильтров
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
  /**
   * Удаляет конкретный фильтр и запускает новый поиск
   */
  function removeFilter(filter: { key: string }) {
    const key = filter.key as keyof typeof filterStore.filterValues;
    const initialValue = filterStore.filterValues[key];
  
    // Определяем, как сбросить значение - в null или в пустой массив
    if (Array.isArray(initialValue)) {
      (filterStore.filterValues[key] as any[]) = [];
    } else {
      (filterStore.filterValues[key] as null | number | string) = null;
    }
  
    // Если сбросили производителя, нужно сбросить и модель
    if (key === 'manufacturer') {
      filterStore.filterValues.modelCar = [];
    }
  
    // Обновляем список продуктов
    productStore.loadProducts(filterStore.filterValues);
  }
  
  /**
   * Очищает все фильтры
   */
  function clearAllFilters() {
    filterStore.clearValues();
    productStore.loadProducts(filterStore.filterValues);
  }
  
  </script>
  
  <style scoped>
  .selected-filters-container {
    @apply flex items-start gap-4 p-3 mb-4 bg-slate-50 border rounded-lg;
  }
  .selected-filters-list {
    @apply flex flex-wrap gap-2 flex-grow list-none p-0 m-0;
  }
  .filter-chip {
    @apply flex items-center bg-blue-100 text-blue-800 text-sm font-medium pl-3 pr-1 py-1 rounded-full;
  }
  .filter-chip__label {
    @apply text-slate-600;
  }
  .filter-chip__value {
    @apply font-bold text-slate-800;
  }
  .filter-chip__remove-btn {
    @apply ml-2 flex-shrink-0 appearance-none bg-transparent border-none cursor-pointer
           rounded-full text-blue-500 hover:text-blue-800 transition-colors;
  }
  </style>