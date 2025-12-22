<script setup lang="ts">
import ProductCard from "~/components/ProductCard.vue";
import ProductLoadingSkeleton from "~/components/product-loading-skeleton.vue";
import ManufacturersList from "~/components/manufacturers-list.vue";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { useProductStore } from "@/storages/product-store";
import { useManufacturerStore } from "@/storages/manufacturer-store";

const productStore = useProductStore();
const manufacturerStore = useManufacturerStore();
const popularLoaded = ref(false);

onMounted(() => {
  productStore.loadPopularProducts({});
  manufacturerStore.loadManufacturers();
});

watch(
  () => productStore.popularProducts,
  () => {
    popularLoaded.value = true;
  },
  { deep: false },
);

// Banners
const banners = [
  { id: 1, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2832&auto=format&fit=crop', title: 'Скидки до 50% на ходовую' },
  { id: 2, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2832&auto=format&fit=crop', title: 'Новое поступление двигателей' },
  { id: 3, image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2940&auto=format&fit=crop', title: 'Бесплатная доставка от 50 000 ₸' },
];

const flickingOptions = {
  align: 'center',
  circular: true,
  defaultIndex: 1
}
</script>

<template>
  <main class="bg-light-bg dark:bg-dark-bg min-h-screen font-sans pb-24 lg:pb-12">
    
    <!-- MOBILE HERO -->
    <section class="lg:hidden relative pb-6 bg-light-bg dark:bg-dark-bg space-y-4">
       <!-- Peek-a-boo Banner -->
       <div class="pt-4 overflow-hidden">
          <Flicking :options="flickingOptions" class="h-[400px]">
             <div 
               v-for="banner in banners" 
               :key="banner.id" 
               class="relative w-[85%] h-[400px] mr-3 rounded-2xl overflow-hidden shadow-sm"
             >
                <img :src="banner.image" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                   <h2 class="text-white text-xl font-bold leading-tight">{{ banner.title }}</h2>
                </div>
             </div>
          </Flicking>
       </div>
    </section>

    <!-- DESKTOP HERO SECTION -->
    <section class="hidden lg:block pt-8 pb-8">
      <div class="container mx-auto px-4">
        <!-- Full width banner for desktop -->
        <div class="rounded-3xl overflow-hidden shadow-xl h-[400px] relative">
             <Flicking :options="{ circular: true, align: 'center' }" class="h-full">
                <div v-for="banner in banners" :key="banner.id" class="relative w-full h-full">
                   <img :src="banner.image" class="w-full h-full object-cover" />
                   <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-12">
                      <h2 class="text-white text-5xl font-black max-w-xl leading-tight italic uppercase tracking-tighter">{{ banner.title }}</h2>
                   </div>
                </div>
             </Flicking>
        </div>
      </div>
    </section>

    <!-- POPULAR PRODUCTS -->
    <section class="mx-auto container px-4 py-8 mt-6 lg:mt-0">
      <div class="flex items-end justify-between gap-4 mb-6">
        <h3 class="text-xl lg:text-3xl font-extrabold text-light-text-main dark:text-dark-text-main">
          Хиты продаж
        </h3>
        <nuxt-link :to="{ name: 'catalog' }" class="text-primary font-bold hover:text-primary-hover transition-colors">
          Смотреть все
        </nuxt-link>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-5">
        <template v-if="!popularLoaded">
          <product-loading-skeleton v-for="i in 6" :key="i" class="h-[320px]" />
        </template>
        <template v-else-if="productStore.popularProducts.length > 0">
          <ProductCard
            :item="item"
            v-for="item in productStore.popularProducts"
            :key="item.id"
          />
        </template>
        <div v-else class="col-span-full py-20 text-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
          <div class="text-4xl mb-2">🤔</div>
          <div class="text-lg font-bold text-gray-500">Популярных товаров пока нет</div>
        </div>
      </div>
    </section>

    <!-- BRANDS -->
    <section class="mx-auto container px-4 pb-16">
      <h3 class="text-xl lg:text-3xl font-extrabold text-light-text-main dark:text-dark-text-main mb-6">Популярные марки</h3>
      <div class="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-sm border border-transparent dark:border-white/5">
        <manufacturers-list></manufacturers-list>
      </div>
    </section>

  </main>
</template>

<style scoped>
:deep(.flicking-viewport) {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
:deep(.flicking-camera) {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
