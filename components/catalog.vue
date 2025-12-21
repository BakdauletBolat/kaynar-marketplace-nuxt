<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NDrawer, NDrawerContent, NPageHeader, NButton, NIcon, NPagination } from 'naive-ui';
import { FunnelIcon } from '@heroicons/vue/20/solid';
import FilterSidebar from './filter-sidebar.vue'; // <-- Наш новый компонент
import Card from './card.vue';
import ProductLoadingSkeleton from './product-loading-skeleton.vue';
import { useProductStore } from '~/storages/product-store';
import { useFilterStore } from '~/storages/filter-store';
import { useCarModelsStore } from '~/storages/car-models-store';

// --- STORES & ROUTER ---
const productStore = useProductStore();
const filterStore = useFilterStore();
const modelCarStore = useCarModelsStore();
const route = useRoute();
const router = useRouter();

// --- PROPS ---
const props = defineProps<{
  category?: string | number | Array<string | number>;
}>();

// --- STATE ---
const page = ref(1);
const mobileFiltersOpen = ref(false);

// --- COMPUTED (для чистоты шаблона) ---
const products = computed(() => productStore.products);
const isInitialLoading = computed(() => productStore.isLoadingProducts && products.value.length === 0);
const isListVisible = computed(() => products.value.length > 0);
const isListEmpty = computed(() => !productStore.isLoadingProducts && products.value.length === 0);
const isUpdating = computed(() => productStore.isLoadingProducts && products.value.length > 0);

// --- METHODS ---
function handleBack() {
  router.back();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function onFilterSubmit() {
  mobileFiltersOpen.value = false;
  scrollToTop();
}

function onFilterClear() {
  mobileFiltersOpen.value = false;
  scrollToTop();
}

// --- WATCHERS & LIFECYCLE ---

// Этот watcher заменяет логику из onMounted и старый watch(route)
// Он отслеживает ИЗМЕНЕНИЯ в URL и сразу же синхронизирует состояние фильтров,
// а затем загружает продукты.
watch(
  () => route.query,
  (query) => {
    filterStore.clearValues();
    
    if (props.category !== undefined && props.category !== null && props.category !== '') {
      const category = props.category;
      filterStore.filterValues.category = Array.isArray(category)
        ? category.map(String)
        : [String(category)];
    }
    if (query.category) {
      filterStore.filterValues.category = query.category.toString().split(',');
    }
    if (query.modelCar) {
      filterStore.filterValues.modelCar = query.modelCar.toString().split(',');
    }
    if (query.search) {
      filterStore.filterValues.search = query.search.toString();
    }
    if (query.year_start) {
      const parsed = parseInt(query.year_start.toString(), 10);
      filterStore.filterValues.year_start = Number.isFinite(parsed) ? parsed : null;
    }
    if (query.year_end) {
      const parsed = parseInt(query.year_end.toString(), 10);
      filterStore.filterValues.year_end = Number.isFinite(parsed) ? parsed : null;
    }
    if (route.params.manufacturerId) {
      const manufId = parseInt(route.params.manufacturerId.toString());
      filterStore.filterValues.manufacturer = manufId;
      modelCarStore.loadCarModelsByManufacturer(manufId);
    }
    
    productStore.loadProducts(filterStore.filterValues);
  },
  { deep: true, immediate: true } // immediate: true запускает его сразу при загрузке компонента
);


// Отслеживаем только изменение страницы
watch(page, (newPage) => {
  productStore.loadProducts({ ...filterStore.filterValues, page: newPage });
  scrollToTop();
});

</script>

<template>
  <div>
    <!-- Мобильная шторка с фильтрами -->
    <n-drawer v-model:show="mobileFiltersOpen" width="100%" :z-index="10000">
      <n-drawer-content title="Фильтры и поиск" closable>
        <!-- Используем наш новый компонент. Кнопки теперь его часть. -->
        <filter-sidebar @submit="onFilterSubmit" @clear="onFilterClear" />
      </n-drawer-content>
    </n-drawer>

    <main>
      <!-- Шапка страницы -->
      <div class="sticky top-0 z-10 bg-white shadow-sm">
        <div class="container w-full px-4 py-2 mx-auto">
          <n-page-header @back="handleBack">
            <template #title>
              <span class="text-base">Поиск запчастей</span>
            </template>
            <template #extra>
              <n-button tertiary round @click="mobileFiltersOpen = true">
                <template #icon>
                  <n-icon><FunnelIcon class="w-5 h-5" /></n-icon>
                </template>
                Фильтры
              </n-button>
            </template>
          </n-page-header>
        </div>
      </div>

      <div>
        <selected-filters></selected-filters>
      </div>

      <!-- Основной контент -->
      <div class="container px-4 mx-auto">
        <section class="pb-24">
          <div class="grid grid-cols-1 gap-x-8 items-start lg:grid-cols-[320px_1fr] mt-4">
            
            <!-- Левая колонка (Фильтры для десктопа) -->
            <aside class="hidden lg:block sticky top-[80px]">
              <!-- И снова используем наш компонент -->
              <filter-sidebar @submit="onFilterSubmit" @clear="onFilterClear" />
            </aside>

            <!-- Правая колонка (Список товаров) -->
            <div class="relative">
              <!-- Состояние начальной загрузки -->
              <div v-if="isInitialLoading" class="grid gap-3">
                <product-loading-skeleton v-for="i in 10" :key="i" />
              </div>

              <!-- Список товаров -->
              <div v-if="isListVisible" 
                   class="grid lg:grid-cols-2 gap-3 transition-opacity"
                   :class="{ 'opacity-50': isUpdating }">
                <card v-for="item in products" :key="item.id" :item="item" />
              </div>

              <!-- Состояние "Ничего не найдено" -->
              <div v-if="isListEmpty">
                <p>Запчастей по вашему запросу не найдено.</p>
                <p>Попробуйте изменить параметры фильтра.</p>
              </div>

              <!-- Пагинация -->
              <n-pagination
                v-if="isListVisible"
                v-model:page="page"
                :item-count="productStore.pageCount"
                class="w-full mt-6"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
