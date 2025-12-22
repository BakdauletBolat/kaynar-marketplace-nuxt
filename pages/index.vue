<script setup lang="ts">
import ProductCard from "~/components/ProductCard.vue";
import ProductLoadingSkeleton from "~/components/product-loading-skeleton.vue";
import ManufacturersList from "~/components/manufacturers-list.vue";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { useProductStore } from "@/storages/product-store";
import { useManufacturerStore } from "@/storages/manufacturer-store";
import { ArrowRightIcon } from "@heroicons/vue/24/outline";

const productStore = useProductStore();
const manufacturerStore = useManufacturerStore();
const router = useRouter();
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
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=60&w=1280&auto=format&fit=crop', 
    title: 'Всё для ТО', 
    subtitle: 'Масла, фильтры и колодки по лучшим ценам',
    buttonText: 'Подобрать',
    link: { name: 'catalog', query: { search: 'масло' } }
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?q=60&w=1280&auto=format&fit=crop', 
    title: 'Шины и диски', 
    subtitle: 'Готовьтесь к сезону заранее',
    buttonText: 'В каталог',
    link: { name: 'catalog', query: { search: 'шины' } }
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=60&w=1280&auto=format&fit=crop', 
    title: 'Аксессуары', 
    subtitle: 'Комфорт и уют в вашем автомобиле',
    buttonText: 'Смотреть',
    link: { name: 'catalog', query: { search: 'аксессуары' } }
  },
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1562426509-5044a121aa49?q=60&w=1280&auto=format&fit=crop', 
    title: 'Кузов и Электрика', 
    subtitle: 'Бампер передний, замок зажигания и многое другое',
    buttonText: 'Поиск',
    link: { name: 'catalog', query: { search: 'бампер' } }
  },
];

const flickingOptions = {
  align: 'center',
  circular: true,
  defaultIndex: 1
}

function handleBannerClick(banner: any) {
    if (banner.link) {
        router.push(banner.link);
    }
}
</script>

<template>
  <main class="bg-light-bg dark:bg-dark-bg min-h-screen font-sans pb-24 lg:pb-12">
    
    <!-- MOBILE HERO -->
    <section class="lg:hidden relative pb-6 bg-light-bg dark:bg-dark-bg space-y-4">
       <!-- Peek-a-boo Banner -->
       <div class="pt-4 overflow-hidden">
          <Flicking :options="flickingOptions" class="h-[420px]">
             <div 
               v-for="banner in banners" 
               :key="banner.id" 
               class="relative w-[90%] h-[420px] mr-3 rounded-3xl overflow-hidden shadow-md active:scale-[0.98] transition-transform"
               @click="handleBannerClick(banner)"
             >
                <img :src="banner.image" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 pb-8">
                   <h2 class="text-white text-3xl font-black leading-tight mb-2">{{ banner.title }}</h2>
                   <p class="text-gray-200 text-sm font-medium mb-4 line-clamp-2">{{ banner.subtitle }}</p>
                   <button class="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-xl font-bold text-sm w-fit flex items-center gap-2">
                      {{ banner.buttonText }}
                      <ArrowRightIcon class="w-4 h-4" />
                   </button>
                </div>
             </div>
          </Flicking>
       </div>
    </section>

    <!-- DESKTOP HERO SECTION -->
    <section class="hidden lg:block pt-8 pb-8">
      <div class="container mx-auto px-4">
        <!-- Full width banner for desktop -->
        <div class="rounded-3xl overflow-hidden shadow-xl h-[450px] relative group">
             <Flicking :options="{ circular: true, align: 'center' }" class="h-full">
                <div 
                    v-for="banner in banners" 
                    :key="banner.id" 
                    class="relative w-full h-full cursor-pointer"
                    @click="handleBannerClick(banner)"
                >
                   <img :src="banner.image" class="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105" />
                   <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center p-20 pl-24">
                      <h2 class="text-white text-6xl font-black max-w-2xl leading-none tracking-tight mb-4">{{ banner.title }}</h2>
                      <p class="text-gray-200 text-xl font-medium max-w-lg mb-8">{{ banner.subtitle }}</p>
                      
                      <button class="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold text-lg w-fit flex items-center gap-3 transition-colors shadow-lg shadow-primary/30">
                          {{ banner.buttonText }}
                          <ArrowRightIcon class="w-5 h-5" />
                      </button>
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
