<template>
    <!-- 
      Важно: для работы `position: sticky` родительский контейнер
      (в данном случае n-card и n-drawer) должен быть прокручиваемым.
    -->
    <n-form ref="formRef" :model="filterStore.filterValues" class="filter-form">
      <!-- БЛОК ДЕЙСТВИЙ СДЕЛАЛИ "ЛИПКИМ" -->
      <header class="filter-form__header">
        <n-button @click="handleSubmit" type="primary" block>Показать</n-button>
        <n-button @click="handleClear" class="!bg-white" block>Очистить</n-button>
      </header>
  
      <n-divider />
  
      <!-- Остальная часть формы будет прокручиваться под "липкой" шапкой -->
      <div class="filter-form__fields">
        <section class="filter-form__section">
          <n-form-item label="Производитель" path="manufacturer">
            <n-select
              placeholder="Сначала выберите производителя"
              filterable
              clearable
              :options="manufacturerStore.manufacturerOptions"
              v-model:value="filterStore.filterValues.manufacturer"
              @update:value="handleManufacturerChange"
            />
          </n-form-item>
  
          <n-form-item label="Модель автомобиля" path="modelCar">
            <n-select
              placeholder="Выберите модель"
              filterable
              multiple
              clearable
              :options="modelCarStore.modelCarOptions"
              v-model:value="filterStore.filterValues.modelCar"
              :fallback-option="resolveModelCarFallback"
              :disabled="!filterStore.filterValues.manufacturer"
            />
          </n-form-item>
        </section>
  
        <section class="filter-form__section">
          <n-form-item label="Категория запчасти" path="category">
            <n-tree-select
              placeholder="Выберите одну или несколько категорий"
              multiple
              cascade
              filterable
              checkable
              :check-strategy="'all'"
              :options="categoryStore.categoriesTreeOptions"
              :value="selectedCategories"
              @update:value="handleCategoryChange"
            />
          </n-form-item>
        </section>
  
        <!-- Динамические фильтры -->
        <section v-if="filterStore.filtersForm.length > 0" class="filter-form__section">
          <div v-for="field in filterStore.filtersForm" :key="field.key">
            <n-form-item :label="field.title" :path="field.key">
              <n-select
                v-if="field.type === 'select'"
                v-model:value="filterStore.filterValues[field.key]"
                :options="field.options"
                placeholder="Выберите один из вариантов"
                multiple
                clearable
              />
              <n-radio-group
                v-else-if="field.type === 'radio'"
                v-model:value="filterStore.filterValues[field.key]"
                :name="field.key"
                class="grid grid-cols-2 gap-2 w-full"
              >
                <n-radio v-for="option in field.options" :key="option.value" :value="option.value" :label="option.label" />
              </n-radio-group>
            </n-form-item>
          </div>
        </section>
      </div>
    </n-form>
  </template>
  
  <script setup lang="ts">
  // ... весь <script setup> остается без изменений с прошлого раза
  import { ref, onMounted, computed } from "vue";
  import { NForm, NFormItem, NSelect, NRadioGroup, NRadio, NTreeSelect, NButton, NDivider } from "naive-ui";
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
    modelCarStore.loadCarModelsByManufacturer(value);
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
  
  .filter-form__header {
    /* 
      Вот магия "липкого" блока:
      - sticky: Включает липкое позиционирование.
      - top-0: Прилипает к верху родительского контейнера при скролле.
      - bg-white: Обязательно нужен фон, чтобы контент не просвечивал.
      - z-10: Гарантирует, что блок будет поверх полей формы.
      - pb-4: Добавляет отступ снизу, чтобы разделитель не прилипал к кнопкам.
    */
    @apply sticky top-0 md:top-4 !bg-white z-10 bg-white grid grid-cols-2 gap-2;
  }
  
  .filter-form__fields {
    /* Этот блок теперь содержит все поля и будет прокручиваться */
    @apply flex flex-col gap-4 pt-2; /* pt-2 для небольшого отступа от разделителя */
  }
  
  .filter-form__section {
    @apply flex flex-col gap-2;
  }
  </style>