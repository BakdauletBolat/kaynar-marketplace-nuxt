<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NDrawer, NDrawerContent, NIcon, NPagination, NButton, NBadge } from 'naive-ui';
import { FunnelIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/vue/24/outline';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import FilterSidebar from './filter-sidebar.vue';
import ProductCard from './ProductCard.vue';
import ProductLoadingSkeleton from './product-loading-skeleton.vue';
import SelectedFilters from './selected-filters.vue'; // Ensure imported
import { useProductStore } from '~/storages/product-store';
import { useFilterStore } from '~/storages/filter-store';
import { useCarModelsStore } from '~/storages/car-models-store';
import { useCategoryStore } from '~/storages/category-storage';

// --- STORES & ROUTER ---
const productStore = useProductStore();
const filterStore = useFilterStore();
const modelCarStore = useCarModelsStore();
const categoryStore = useCategoryStore();
const route = useRoute();
const router = useRouter();

// --- PROPS ---
const props = defineProps<{
  category?: string | number | Array<string | number>;
}>();

// --- STATE ---
const page = ref(1);
const mobileFiltersOpen = ref(false);
const viewMode = ref<'grid' | 'list'>('grid'); // 'grid' or 'list'

// --- COMPUTED ---
const products = computed(() => productStore.products);
const isInitialLoading = computed(() => productStore.isLoadingProducts && products.value.length === 0);
const isListVisible = computed(() => products.value.length > 0);
const isListEmpty = computed(() => !productStore.isLoadingProducts && products.value.length === 0);
const isUpdating = computed(() => productStore.isLoadingProducts && products.value.length > 0);

const activeFilterCount = computed(() => {
  const values = filterStore.filterValues as Record<string, unknown>;
  return Object.values(values).reduce((count, value) => {
    if (value == null || value === '') return count;
    if (Array.isArray(value)) return value.length ? count + 1 : count;
    return count + 1;
  }, 0) as number;
});

const pageTitle = computed(() => {
  if (filterStore.filterValues.search) {
    return `Поиск: ${filterStore.filterValues.search}`;
  }
  // Try to find category name
  if (filterStore.filterValues.category && filterStore.filterValues.category.length > 0) {
    // Assuming single category for title or generic "Catalog"
    const catId = filterStore.filterValues.category[0];
    const cat = categoryStore.getCategoryById(catId);
    if (cat) return cat;
  }
  return 'Каталог';
});

// --- METHODS ---
function handleBack() {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push({ name: 'index' });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function onFilterSubmit() {
  mobileFiltersOpen.value = false;
  // Update URL with current filters to support deep linking
  // This is a simplified example, you might want a dedicated helper to serialize filters to query
  const query = { ...route.query, ...filterStore.filterValues };
  // Clean up empty values
  Object.keys(query).forEach(key => {
    if (query[key] === null || query[key] === '' || (Array.isArray(query[key]) && query[key].length === 0)) {
      delete query[key];
    }
  });
  
  router.push({ query });
  scrollToTop();
}

function onFilterClear() {
  // Clearing is handled inside filter-form/sidebar components usually, 
  // but we might want to close drawer here too.
  // mobileFiltersOpen.value = false; // Optional: keep open to show result?
  // scrollToTop();
}

function toggleViewMode() {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid';
}

// --- WATCHERS ---
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
      filterStore.filterValues.category = Array.isArray(query.category) ? query.category.map(String) : query.category.toString().split(',');
    }
    if (query.modelCar) {
      filterStore.filterValues.modelCar = Array.isArray(query.modelCar) ? query.modelCar.map(String) : query.modelCar.toString().split(',');
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
    // Handle manufacturer route param or query
    if (route.params.manufacturerId) {
      const manufId = parseInt(route.params.manufacturerId.toString());
      filterStore.filterValues.manufacturer = manufId;
      modelCarStore.loadCarModelsByManufacturer(manufId);
    } else if (query.manufacturer) {
        const manufId = parseInt(query.manufacturer.toString());
        filterStore.filterValues.manufacturer = manufId;
        modelCarStore.loadCarModelsByManufacturer(manufId);
    }
    
    productStore.loadProducts(filterStore.filterValues);
  },
  { deep: true, immediate: true }
);

watch(page, (newPage) => {
  productStore.loadProducts({ ...filterStore.filterValues, page: newPage });
  scrollToTop();
});

onMounted(() => {
    categoryStore.loadCategoriesTree(); // Ensure categories are loaded for title
});

</script>

<template>
  <div class="bg-gray-50 dark:bg-dark-bg min-h-screen pb-24 lg:pb-0">
    <!-- Мобильная шторка с фильтрами -->
    <n-drawer 
      v-model:show="mobileFiltersOpen" 
      placement="bottom" 
      height="90vh" 
      class="rounded-t-2xl dark:bg-dark-card"
      :trap-focus="false"
      :block-scroll="true"
    >
      <n-drawer-content 
        title="Фильтры" 
        closable 
        :native-scrollbar="false"
        body-content-style="padding: 0;"
        header-style="padding: 16px; border-bottom: 1px solid #eee;"
      >
        <template #header>
            <div class="flex justify-between items-center w-full">
                <span class="text-lg font-bold">Фильтры</span>
            </div>
        </template>
        <div class="h-full bg-white dark:bg-dark-card">
           <filter-sidebar @submit="onFilterSubmit" @clear="onFilterClear" />
        </div>
      </n-drawer-content>
    </n-drawer>

    <main>
      <!-- Header -->
      <header class="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-white/5 sticky top-0 z-20">
        <div class="container w-full px-4 py-3 mx-auto">
          <div class="flex items-center gap-3">
             <button @click="handleBack" class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <ArrowLeftIcon class="w-6 h-6 text-gray-700 dark:text-gray-200"/>
             </button>
             <h1 class="font-bold text-lg text-gray-900 dark:text-white truncate flex-1">
                 {{ pageTitle }}
             </h1>
          </div>
        </div>
        
        <!-- Mobile Control Bar -->
        <div class="lg:hidden px-4 pb-3 flex items-center gap-3">
            <button 
               class="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/5 h-10 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 active:bg-gray-200 transition-colors"
               @click="mobileFiltersOpen = true"
             >
               <FunnelIcon class="w-5 h-5" />
               <span>Фильтры</span>
               <n-badge v-if="activeFilterCount > 0" :value="activeFilterCount" type="primary" show-zero class="scale-90" />
             </button>
             
             <button 
               class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-lg text-gray-700 dark:text-gray-200 active:bg-gray-200 transition-colors"
               @click="toggleViewMode"
               aria-label="Change view"
             >
               <Squares2X2Icon v-if="viewMode === 'list'" class="w-6 h-6" />
               <ListBulletIcon v-else class="w-6 h-6" />
             </button>
        </div>
        
        <!-- Selected Filters (Chips) -->
        <div class="px-4 pb-1 mx-auto lg:hidden w-full overflow-x-auto no-scrollbar">
            <selected-filters mode="compact" />
        </div>
      </header>

      <!-- Content -->
      <div class="container px-2 lg:px-4 mx-auto pt-4">
        <!-- Selected Filters Desktop -->
        <desktop-only-component>
             <selected-filters />
        </desktop-only-component>
      
        <div class="grid grid-cols-1 gap-x-6 items-start lg:grid-cols-[280px_1fr]">
            
            <!-- Sidebar (Desktop) -->
            <aside class="hidden lg:block sticky top-[90px] h-[calc(100vh-100px)] overflow-y-auto pr-2 custom-scrollbar">
              <filter-sidebar @submit="onFilterSubmit" @clear="onFilterClear" />
            </aside>

            <!-- Product Grid -->
            <div class="relative min-h-[50vh]">
              <!-- Loading -->
              <div v-if="isInitialLoading" 
                   class="grid gap-2 lg:gap-4"
                   :class="viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'"
              >
                <product-loading-skeleton v-for="i in 8" :key="i" class="h-[300px]" />
              </div>

              <!-- List -->
              <div v-else-if="isListVisible" 
                   class="grid gap-2 lg:gap-4 transition-opacity duration-200"
                   :class="[
                      viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1',
                      { 'opacity-50 pointer-events-none': isUpdating }
                   ]"
              >
                <ProductCard v-for="item in products" :key="item.id" :item="item" :horizontal="viewMode === 'list'" />
              </div>

              <!-- Empty -->
              <div v-if="isListEmpty" class="py-20 text-center text-gray-500 flex flex-col items-center">
                <div class="w-24 h-24 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-4xl mb-4">
                    🔍
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Ничего не найдено</h3>
                <p class="text-sm max-w-xs mx-auto mb-6">Попробуйте изменить параметры поиска или фильтры</p>
                <n-button @click="filterStore.clearValues(); productStore.loadProducts(filterStore.filterValues)" type="primary">
                    Сбросить фильтры
                </n-button>
              </div>

              <!-- Pagination -->
              <div v-if="isListVisible" class="flex justify-center mt-12 mb-8">
                <n-pagination
                    v-model:page="page"
                    :item-count="productStore.pageCount"
                    :page-slot="5"
                    size="large"
                />
              </div>
            </div>
          </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
