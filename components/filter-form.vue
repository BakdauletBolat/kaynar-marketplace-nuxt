<template>
  <n-form ref="formRef" :model="filterStore.filterValues" class="filter-form">
    <!-- DESKTOP: липкий верхний бар действий (внутри скроллящейся карточки) -->
    <header class="filter-form__desktop-actions">
      <div class="filter-form__summary">
        <div class="filter-form__summary-title">Выбрано</div>
        <div class="filter-form__summary-subtitle">
          Активно: {{ activeFiltersCount }}
        </div>
      </div>
      <div class="filter-form__actions-grid">
        <n-button
          @click="handleSubmit"
          type="primary"
          :loading="productStore.isLoadingProducts"
          block
        >
          <span v-if="!productStore.isLoadingProducts">Показать {{ productStore.pageCount }}</span>
          <span v-else>Загрузка...</span>
        </n-button>
        <n-button
          @click="handleClear"
          tertiary
          :disabled="!hasActiveFilters"
          block
        >
          Сбросить
        </n-button>
      </div>
    </header>

    <!-- MOBILE: компактная подсказка сверху -->
    <div class="filter-form__mobile-summary">
      <div class="filter-form__summary-subtitle">
        Активно фильтров: {{ activeFiltersCount }}
      </div>
    </div>

    <div class="filter-form__fields">
      <!-- Поиск -->
      <section class="filter-form__section">
        <div class="filter-form__section-title">Поиск</div>
        <n-input
          v-model:value="searchValue"
          clearable
          size="large"
          placeholder="Например: ремень ГРМ, фильтр, стойка…"
          @keyup.enter="handleSubmit"
        />
      </section>

      <!-- Производитель -->
      <section class="filter-form__section">
        <FilterChips
          title="Производитель"
          :items="manufacturerChipOptions"
          v-model="selectedManufacturers"
          :multiple="false"
          :max-display="8"
          @view-all="showManufacturerDrawer = true"
        />
      </section>

      <!-- Модель автомобиля -->
      <section class="filter-form__section" v-if="filterStore.filterValues.manufacturer">
        <!-- Loading skeleton -->
        <div v-if="modelCarStore.isLoadingModels" class="filter-form__loading">
          <div class="filter-form__section-title">Модель автомобиля</div>
          <div class="filter-form__skeleton-grid">
            <div
              v-for="i in 6"
              :key="i"
              class="filter-chip-skeleton"
              :style="{ animationDelay: `${i * 0.1}s`, width: `${100 + (i % 3) * 30}px` }"
            ></div>
          </div>
        </div>

        <!-- Loaded chips -->
        <FilterChips
          v-else
          title="Модель автомобиля"
          :items="modelCarChipOptions"
          v-model="filterStore.filterValues.modelCar"
          :max-display="8"
          @view-all="showModelCarDrawer = true"
        />
      </section>

      <!-- Категории -->
      <section class="filter-form__section">
        <FilterChips
          title="Категория запчасти"
          :items="categoryChipOptions"
          v-model="filterStore.filterValues.category"
          :max-display="10"
          @view-all="showCategoryDrawer = true"
        />
      </section>

      <!-- Цена -->
      <section class="filter-form__section">
        <div class="filter-form__section-title">Цена</div>
        <PriceRange
          :min="0"
          :max="1000000"
          :step="1000"
          v-model:price-from="filterStore.filterValues.price_from"
          v-model:price-to="filterStore.filterValues.price_to"
        />
      </section>

      <!-- Емкость -->
      <section class="filter-form__section" v-if="capacityChipOptions.length > 0">
        <FilterChips
          title="Емкость"
          :items="capacityChipOptions"
          v-model="selectedCapacities"
          :multiple="false"
          :max-display="12"
          @view-all="showCapacityDrawer = true"
        />
      </section>

      <!-- Объем двигателя -->
      <section class="filter-form__section" v-if="engineDisplacementChipOptions.length > 0">
        <FilterChips
          title="Объем двигателя"
          :items="engineDisplacementChipOptions"
          v-model="selectedEngineDisplacements"
          :multiple="false"
          :max-display="12"
          @view-all="showEngineDisplacementDrawer = true"
        />
      </section>
    </div>

    <!-- MOBILE: липкий нижний бар действий -->
    <footer class="filter-form__mobile-actions">
      <div class="filter-form__actions-grid">
        <n-button
          @click="handleSubmit"
          type="primary"
          :loading="productStore.isLoadingProducts"
          block
          size="large"
          class="font-bold"
        >
          <span v-if="!productStore.isLoadingProducts">Показать {{ productStore.pageCount }} товаров</span>
          <span v-else>Поиск...</span>
        </n-button>
        <n-button
          @click="handleClear"
          tertiary
          size="large"
          :disabled="!hasActiveFilters"
          block
        >
          Сбросить
        </n-button>
      </div>
    </footer>

    <!-- Drawers for full selection screens -->
    <FilterSelectDrawer
      v-model:show="showManufacturerDrawer"
      title="Производитель"
      :items="manufacturerChipOptions"
      v-model="selectedManufacturers"
      :enable-grouping="true"
      :multiple="false"
    />

    <FilterSelectDrawer
      v-model:show="showModelCarDrawer"
      title="Модель автомобиля"
      :items="modelCarChipOptions"
      v-model="filterStore.filterValues.modelCar"
      :enable-grouping="true"
    />

    <FilterSelectDrawer
      v-model:show="showCategoryDrawer"
      title="Категория запчасти"
      :items="categoryChipOptions"
      v-model="filterStore.filterValues.category"
      :enable-grouping="true"
    />

    <FilterSelectDrawer
      v-model:show="showCapacityDrawer"
      title="Емкость"
      :items="capacityChipOptions"
      v-model="selectedCapacities"
      :enable-grouping="false"
      :multiple="false"
    />

    <FilterSelectDrawer
      v-model:show="showEngineDisplacementDrawer"
      title="Объем двигателя"
      :items="engineDisplacementChipOptions"
      v-model="selectedEngineDisplacements"
      :enable-grouping="false"
      :multiple="false"
    />
  </n-form>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed, watch } from "vue";
  import { NForm, NButton, NInput } from "naive-ui";
  import { useFilterStore } from "@/storages/filter-store";
  import { useCategoryStore } from "~/storages/category-storage";
  import { useManufacturerStore } from "~/storages/manufacturer-store";
  import { useCarModelsStore } from "~/storages/car-models-store";
  import { useProductStore } from "~/storages/product-store";
  import FilterChips from "./FilterChips.vue";
  import FilterSelectDrawer from "./FilterSelectDrawer.vue";
  import PriceRange from "./PriceRange.vue";
  import type { FilterChipOption } from "@/composables/useFilterChips";

  const filterStore = useFilterStore();
  const categoryStore = useCategoryStore();
  const manufacturerStore = useManufacturerStore();
  const modelCarStore = useCarModelsStore();
  const productStore = useProductStore();
  const emit = defineEmits(['submit', 'clear']);
  const formRef = ref<InstanceType<typeof NForm> | null>(null);

  // Drawer states for "Show All" screens
  const showManufacturerDrawer = ref(false);
  const showModelCarDrawer = ref(false);
  const showCategoryDrawer = ref(false);
  const showCapacityDrawer = ref(false);
  const showEngineDisplacementDrawer = ref(false);

  const searchValue = computed<string>({
    get: () => filterStore.filterValues.search ?? '',
    set: (value) => {
      const normalized = value.trim();
      filterStore.filterValues.search = normalized.length ? normalized : null;
    },
  });


  const activeFiltersCount = computed(() => {
    const values = filterStore.filterValues as Record<string, unknown>;
    return Object.values(values).reduce((count, value) => {
      if (value == null || value === '') return count;
      if (Array.isArray(value)) return value.length ? count + 1 : count;
      return count + 1;
    }, 0);
  });

  const hasActiveFilters = computed(() => activeFiltersCount.value > 0);


  // Transform filter data to chip options
  const manufacturerChipOptions = computed<FilterChipOption[]>(() => {
    // Use flat list: popular first, then others
    const popular = manufacturerStore.popularManufacturers.map(m => ({
      label: m.name,
      value: m.id
    }));
    const others = manufacturerStore.otherManufacturers.map(m => ({
      label: m.name,
      value: m.id
    }));
    return [...popular, ...others];
  });

  const modelCarChipOptions = computed<FilterChipOption[]>(() => {
    return modelCarStore.modelCarOptions.map(opt => ({
      label: opt.label as string,
      value: opt.value as string
    }));
  });

  const categoryChipOptions = computed<FilterChipOption[]>(() => {
    return categoryStore.categoriesOptions.map(opt => ({
      label: opt.label as string,
      value: String(opt.value)
    }));
  });

  const capacityChipOptions = computed<FilterChipOption[]>(() => {
    return (filterStore.filterData.capacity || []).map(item => ({
      label: `${item} л`,
      value: item
    }));
  });

  const engineDisplacementChipOptions = computed<FilterChipOption[]>(() => {
    return (filterStore.filterData.engineDisplacement || []).map(item => ({
      label: `${item} л`,
      value: item
    }));
  });

  // Selected manufacturers as array (for chips compatibility - single selection with toggle)
  const selectedManufacturers = computed<(string | number)[]>({
    get: () => {
      const value = filterStore.filterValues.manufacturer;
      return value ? [value] : [];
    },
    set: (values: (string | number)[]) => {
      const newValue = values.length > 0 ? Number(values[0]) : null;
      const prevValue = filterStore.filterValues.manufacturer;

      // Update manufacturer
      filterStore.filterValues.manufacturer = newValue;

      // Clear models and reload when manufacturer changes
      if (newValue !== prevValue) {
        filterStore.filterValues.modelCar = [];
        if (!newValue) {
          modelCarStore.carModels = [];
          modelCarStore.rawCarModels = [];
          modelCarStore.isLoadingModels = false;
        } else {
          modelCarStore.loadCarModelsByManufacturer(newValue);
        }
      }
    }
  });

  const selectedCapacities = computed<number[]>({
    get: () => filterStore.filterValues.capacity ? [filterStore.filterValues.capacity] : [],
    set: (values: number[]) => {
      filterStore.filterValues.capacity = values.length > 0 ? values[0] : null;
    }
  });

  const selectedEngineDisplacements = computed<number[]>({
    get: () => filterStore.filterValues.engineDisplacement ? [filterStore.filterValues.engineDisplacement] : [],
    set: (values: number[]) => {
      filterStore.filterValues.engineDisplacement = values.length > 0 ? values[0] : null;
    }
  });

  function handleSubmit() {
    // Just emit submit, data is already loaded via watcher or we can load one last time
    // productStore.loadProducts(filterStore.filterValues); 
    emit('submit');
  }
  
  function handleClear() {
    filterStore.clearValues();
    // Watcher will handle reload
    emit('clear');
  }

  // --- REACTIVE LOADING ---
  let debounceTimer: any = null;
  function debouncedLoad() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      productStore.loadProducts(filterStore.filterValues);
    }, 500);
  }

  watch(
    () => filterStore.filterValues,
    () => {
      debouncedLoad();
    },
    { deep: true }
  );
  
  onMounted(() => {
    Promise.all([
      filterStore.loadFilters(),
      categoryStore.loadCategories(),
      manufacturerStore.loadManufacturers()
    ]);
  });
  </script>
  
  <style scoped>
  .filter-form {
    @apply flex flex-col;
  }

  .filter-form__desktop-actions {
    @apply hidden lg:flex sticky top-0 z-10;
    @apply bg-white/95 dark:bg-dark-card/95 backdrop-blur;
    @apply border-b border-slate-100 dark:border-white/5;
    @apply p-4 flex-col gap-3;
  }

  .filter-form__fields {
    @apply flex flex-col gap-6 p-4;
    /* На мобильных оставляем место под нижний бар с кнопками */
    @apply pb-24 lg:pb-4;
  }

  .filter-form__section {
    @apply flex flex-col gap-4;
  }

  .filter-form__section-title {
    @apply text-xs font-semibold tracking-wide;
    @apply text-slate-500 dark:text-slate-400 uppercase;
  }

  .filter-form__summary {
    @apply flex items-start justify-between gap-3;
  }

  .filter-form__summary-title {
    @apply text-sm font-semibold;
    @apply text-slate-900 dark:text-white;
  }

  .filter-form__summary-subtitle {
    @apply text-xs text-slate-500 dark:text-slate-400;
  }

  .filter-form__actions-grid {
    @apply grid grid-cols-2 gap-2;
  }

  .filter-form__field {
    @apply w-full min-w-0 flex flex-col;
  }

  .filter-form__hint {
    @apply mt-1 text-xs text-slate-500 dark:text-slate-400;
  }

  .filter-form__mobile-summary {
    @apply lg:hidden px-4 pt-3;
  }

  .filter-form__mobile-actions {
    @apply lg:hidden sticky bottom-0 z-10;
    @apply bg-white/95 dark:bg-dark-card/95 backdrop-blur;
    @apply border-t border-slate-100 dark:border-white/5;
    @apply px-4 pt-4;
    padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  }

  .filter-form__loading {
    @apply flex flex-col gap-4;
  }

  .filter-form__skeleton-grid {
    @apply flex flex-wrap gap-2;
  }

  .filter-chip-skeleton {
    @apply inline-flex items-center gap-1.5 px-4 py-2 rounded-full;
    @apply bg-slate-200 dark:bg-white/10;
    min-height: 38px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  </style>
