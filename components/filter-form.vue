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
          Показать
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
        <n-form-item label="Название или артикул" path="search">
          <n-input
            v-model:value="searchValue"
            clearable
            placeholder="Например: ремень ГРМ, фильтр, стойка…"
            @keyup.enter="handleSubmit"
          />
        </n-form-item>
      </section>

      <!-- Автомобиль -->
      <section class="filter-form__section">
        <div class="filter-form__section-title">Автомобиль</div>

        <n-form-item label="Производитель" path="manufacturer">
          <n-select
            placeholder="Начните вводить для поиска"
            filterable
            clearable
            :options="manufacturerStore.manufacturerOptions"
            v-model:value="filterStore.filterValues.manufacturer"
            @update:value="handleManufacturerChange"
          />
        </n-form-item>

        <n-form-item label="Модель автомобиля" path="modelCar">
          <div class="filter-form__field">
            <n-select
              class="w-full"
              :placeholder="modelPlaceholder"
              filterable
              multiple
              clearable
              max-tag-count="responsive"
              :options="modelCarStore.modelCarOptions"
              v-model:value="filterStore.filterValues.modelCar"
              :fallback-option="resolveModelCarFallback"
              :disabled="!filterStore.filterValues.manufacturer"
            />
            <div class="filter-form__hint" v-if="selectedModelCount > 0">
              Выбрано моделей: {{ selectedModelCount }}
            </div>
            <div class="filter-form__hint" v-else>
              Можно выбрать несколько моделей
            </div>
          </div>
        </n-form-item>
      </section>

      <!-- Категории -->
      <section class="filter-form__section">
        <div class="filter-form__section-title">Категория</div>

        <n-form-item label="Категория запчасти" path="category">
          <div class="filter-form__field">
            <n-tree-select
              class="w-full"
              placeholder="Выберите одну или несколько категорий"
              multiple
              cascade
              filterable
              clearable
              checkable
              show-path
              separator=" / "
              max-tag-count="responsive"
              :check-strategy="'all'"
              :options="categoryStore.categoriesTreeOptions"
              :value="selectedCategories"
              @update:value="handleCategoryChange"
            />
            <div class="filter-form__hint" v-if="selectedCategoryCount > 0">
              Выбрано категорий: {{ selectedCategoryCount }}
            </div>
            <div class="filter-form__hint" v-else>
              Можно выбрать несколько категорий
            </div>
          </div>
        </n-form-item>
      </section>

      <!-- Доп. параметры -->
      <section v-if="filterStore.filtersForm.length > 0" class="filter-form__section">
        <div class="filter-form__section-title">Дополнительные параметры</div>
        <div v-for="field in filterStore.filtersForm" :key="field.key">
          <n-form-item :label="field.title" :path="field.key">
            <n-select
              v-if="field.type === 'select'"
              v-model:value="filterStore.filterValues[field.key]"
              :options="field.options"
              placeholder="Выберите значение"
              filterable
              clearable
              max-tag-count="responsive"
              multiple
            />
            <n-radio-group
              v-else-if="field.type === 'radio'"
              v-model:value="filterStore.filterValues[field.key]"
              :name="field.key"
              class="grid grid-cols-2 gap-2 w-full"
            >
              <n-radio
                v-for="option in field.options"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </n-radio-group>
          </n-form-item>
        </div>
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
        >
          Показать
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
    </footer>
  </n-form>
  </template>
  
  <script setup lang="ts">
  // ... весь <script setup> остается без изменений с прошлого раза
  import { ref, onMounted, computed } from "vue";
  import { NForm, NFormItem, NSelect, NRadioGroup, NRadio, NTreeSelect, NButton, NInput } from "naive-ui";
  import type { SelectOption, TreeSelectOption } from "naive-ui";
  import { useFilterStore } from "@/storages/filter-store";
  import { useCategoryStore } from "~/storages/category-storage";
  import { useManufacturerStore } from "~/storages/manufacturer-store";
  import { useCarModelsStore } from "~/storages/car-models-store";
  import { useProductStore } from "~/storages/product-store";
  
  const filterStore = useFilterStore();
  const categoryStore = useCategoryStore();
  const manufacturerStore = useManufacturerStore();
  const modelCarStore = useCarModelsStore();
  const productStore = useProductStore();
  const emit = defineEmits(['submit', 'clear']);
  const formRef = ref<InstanceType<typeof NForm> | null>(null);

  const searchValue = computed<string>({
    get: () => filterStore.filterValues.search ?? '',
    set: (value) => {
      const normalized = value.trim();
      filterStore.filterValues.search = normalized.length ? normalized : null;
    },
  });

  const selectedModelCount = computed(() => {
    const models = filterStore.filterValues.modelCar;
    return Array.isArray(models) ? models.length : 0;
  });

  const selectedCategoryCount = computed(() => {
    const categories = filterStore.filterValues.category;
    return Array.isArray(categories) ? categories.length : 0;
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

  const modelPlaceholder = computed(() =>
    filterStore.filterValues.manufacturer
      ? 'Выберите модель (можно несколько)'
      : 'Сначала выберите производителя'
  );
  
  const selectedCategories = computed(() => {
    const categories = filterStore.filterValues.category;
    return Array.isArray(categories) ? categories.map(item => parseInt(item, 10)) : [];
  });
  
  function handleSubmit() {
    productStore.loadProducts(filterStore.filterValues);
    emit('submit');
  }
  
  function handleClear() {
    filterStore.clearValues();
    productStore.loadProducts(filterStore.filterValues);
    emit('clear');
  }
  
  function handleManufacturerChange(value: number | null) {
    filterStore.filterValues.modelCar = [];
    if (value) {
      modelCarStore.loadCarModelsByManufacturer(value);
      return;
    }
    modelCarStore.carModels = [];
    modelCarStore.rawCarModels = [];
  }
  
  function handleCategoryChange(value: Array<string | number>, options: Array<TreeSelectOption | null>) {
    filterStore.filterValues.category = value.map(String);
  }
  
  function resolveModelCarFallback(value: string): SelectOption {
    return { label: modelCarStore.getModelCarById(value)?.label ?? value, value };
  }
  
  onMounted(() => {
    Promise.all([
      filterStore.loadFilters(),
      categoryStore.loadCategoriesTree(),
      manufacturerStore.loadManufacturers()
    ]);
  });
  </script>
  
  <style scoped>
  .filter-form {
    @apply flex flex-col;
  }
  
  .filter-form__desktop-actions {
    @apply hidden lg:flex sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-100 p-3 flex-col gap-2;
  }
  
  .filter-form__fields {
    @apply flex flex-col gap-6 p-3;
    /* На мобильных оставляем место под нижний бар с кнопками */
    @apply pb-24 lg:pb-4;
  }
  
  .filter-form__section {
    @apply flex flex-col gap-3;
  }

  .filter-form__section-title {
    @apply text-xs font-semibold tracking-wide text-slate-500 uppercase;
  }

  .filter-form__summary {
    @apply flex items-start justify-between gap-3;
  }

  .filter-form__summary-title {
    @apply text-sm font-semibold text-slate-900;
  }

  .filter-form__summary-subtitle {
    @apply text-xs text-slate-500;
  }

  .filter-form__actions-grid {
    @apply grid grid-cols-2 gap-2;
  }

  .filter-form__field {
    @apply w-full min-w-0 flex flex-col;
  }

  .filter-form__hint {
    @apply mt-1 text-xs text-slate-500;
  }

  .filter-form__mobile-summary {
    @apply lg:hidden px-3 pt-2;
  }

  .filter-form__mobile-actions {
    @apply lg:hidden sticky bottom-0 z-10 bg-white/95 backdrop-blur border-t border-slate-100 px-3 pt-3;
    padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
  }
  </style>
