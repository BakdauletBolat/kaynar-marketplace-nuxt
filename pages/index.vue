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
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1280&auto=format&fit=crop',
    icon: '🚀',
    title: 'Kaynar запущен!',
    subtitle: 'Автозапчасти для любых марок с доставкой по Казахстану',
    tag: 'Новинка'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1280&auto=format&fit=crop',
    icon: '💳',
    title: 'Рассрочка до 24 месяцев',
    subtitle: 'Оформите покупку через Kaspi или Halyk Bank — без переплат',
    tag: '0-0-24'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1280&auto=format&fit=crop',
    icon: '🎁',
    title: 'Розыгрыш подарков',
    subtitle: 'Участвуйте в конкурсе и выиграйте сертификат на 100 000 ₸',
    tag: 'Акция'
  },
];

const flickingOptions = {
  align: 'center',
  circular: true,
  defaultIndex: 0
}
</script>

<template>
  <main class="bg-light-bg dark:bg-dark-bg min-h-screen font-sans pb-24 lg:pb-12">

    <!-- MOBILE HERO -->
    <section class="lg:hidden">
       <div class="pt-3 pb-2 overflow-hidden">
          <Flicking :options="flickingOptions" class="h-[320px]">
             <div
               v-for="banner in banners"
               :key="banner.id"
               class="relative w-[88%] h-[320px] mr-2.5 rounded-2xl overflow-hidden shadow-lg"
             >
                <img :src="banner.image" class="w-full h-full object-cover" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 flex flex-col justify-end p-5 pb-6">
                   <div class="flex items-center gap-2 mb-2">
                      <span class="text-2xl">{{ banner.icon }}</span>
                      <span class="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wide">
                        {{ banner.tag }}
                      </span>
                   </div>
                   <h2 class="text-white text-2xl font-black leading-tight mb-2">{{ banner.title }}</h2>
                   <p class="text-white/80 text-sm font-medium leading-relaxed">{{ banner.subtitle }}</p>
                </div>
             </div>
          </Flicking>
       </div>
    </section>

    <!-- DESKTOP HERO SECTION -->
    <section class="hidden lg:block pt-8 pb-8">
      <div class="container mx-auto px-4">
        <!-- Full width banner for desktop -->
        <div class="rounded-3xl overflow-hidden shadow-xl h-[400px] relative group">
             <Flicking :options="{ circular: true, align: 'center' }" class="h-full">
                <div
                    v-for="banner in banners"
                    :key="banner.id"
                    class="relative w-full h-full"
                >
                   <img :src="banner.image" class="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105" />
                   <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent flex flex-col justify-center p-16 pl-20">
                      <div class="flex items-center gap-3 mb-4">
                        <span class="text-5xl">{{ banner.icon }}</span>
                        <span class="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-full uppercase tracking-wider">
                          {{ banner.tag }}
                        </span>
                      </div>
                      <h2 class="text-white text-5xl font-black max-w-2xl leading-tight tracking-tight mb-4">{{ banner.title }}</h2>
                      <p class="text-gray-200 text-xl font-medium max-w-lg leading-relaxed">{{ banner.subtitle }}</p>
                   </div>
                </div>
             </Flicking>
        </div>
      </div>
    </section>

    <!-- POPULAR PRODUCTS -->
    <section class="mx-auto container px-4 pt-4 pb-6 lg:pt-0 lg:pb-8">
      <div class="flex items-center justify-between gap-4 mb-4">
        <h3 class="text-lg lg:text-2xl font-bold text-light-text-main dark:text-dark-text-main">
          Хиты продаж
        </h3>
        <nuxt-link :to="{ name: 'catalog' }" class="text-sm text-primary font-semibold hover:text-primary-hover transition-colors">
          Все товары →
        </nuxt-link>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2.5 lg:gap-4">
        <template v-if="!popularLoaded">
          <product-loading-skeleton v-for="i in 6" :key="i" class="h-[280px]" />
        </template>
        <template v-else-if="productStore.popularProducts.length > 0">
          <ProductCard
            :item="item"
            v-for="item in productStore.popularProducts"
            :key="item.id"
          />
        </template>
        <div v-else class="col-span-full py-16 text-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl">
          <div class="text-4xl mb-2">🔍</div>
          <div class="text-base font-medium text-gray-500 dark:text-gray-400">Популярных товаров пока нет</div>
        </div>
      </div>
    </section>

    <!-- BRANDS -->
    <section class="mx-auto container px-4 pb-8">
      <h3 class="text-lg lg:text-2xl font-bold text-light-text-main dark:text-dark-text-main mb-4">Популярные марки</h3>
      <div class="bg-white dark:bg-dark-card rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 dark:border-white/5">
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
