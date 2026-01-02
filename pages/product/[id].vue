<script setup lang="ts">
import {
  TruckIcon,
  CheckBadgeIcon,
  StarIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
  HeartIcon,
  ShareIcon,
  PhoneIcon
} from "@heroicons/vue/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid";
import { computed, h, ref } from "vue"; // Added ref
import ProductSlider from "@/components/product-slider.vue";
import ProductMobileSlider from "@/components/product-mobile.slider.vue";
import ProductFullscreenCarousel from "@/components/product-fullscreen-carousel.vue";
import BuyOneClickModal from "@/components/modals/buy-one-click-modal.vue"; // Import modal
import { CardStorage } from "@/storages/storage";
import { useFavoritesStore } from "@/storages/favorites-store";
import { NButton, NTag, NIcon, NCard, NBreadcrumb, NBreadcrumbItem, NResult, useNotification, useMessage } from "naive-ui";
import { useProductPage } from "~/composables/useProductPage";

const route = useRoute();
const router = useRouter();
const notification = useNotification();
const message = useMessage();
const cardStorage = CardStorage.getInstance();
const favoritesStore = useFavoritesStore();

const showBuyOneClick = ref(false); // Modal state
const showFullscreenGallery = ref(false);
const fullscreenIndex = ref(0);

const productId = computed(() => parseInt(route.params.id.toString(), 10));

const {
  product,
  pending,
  error,
  productName,
  productPrice,
  categoryName,
  carSubtitle,
  statusMeta,
  breadcrumbs,
  createdAtText,
  updatedAtText,
  warehouseInfo,
  codes,
  descriptionText,
  specifications,
  dimensions,
  showDimensions,
  showCodes,
  showDescription
} = useProductPage(productId);

const isInCart = computed(() => {
  if (!product.value) return false;
  return cardStorage.checkInGoods(product.value.id);
});

const isFavorite = computed(() => {
    if (!product.value) return false;
    // Assuming checkInFavorites takes ID
    return favoritesStore.checkInFavorites(product.value.id);
});

const showBuyButton = computed(() => statusMeta.value.canBuy);
const mobileCanInteract = computed(() => showBuyButton.value || isInCart.value);

const mobileCtaText = computed(() => {
  if (isInCart.value) return "В корзине";
  return "В корзину";
});

function goBack() {
  router.back();
}

function goToCart() {
  router.push({ name: "auth-cart" });
}

function addGoods() {
  if (!product.value) return;

  cardStorage.addGood({
    quantity: 1,
    id: product.value.id,
    name: product.value.name,
    // @ts-ignore
    price: product.value.price,
    // @ts-ignore
    picture_url: product.value.pictures?.length ? product.value.pictures[0].image : null,
  });

  cardStorage.isActive.value = true;

  const n = notification.create({
    title: "Товар добавлен",
    content: "Перейти к оформлению?",
    duration: 3000,
    action: () =>
      h(
        NButton,
        {
          onClick: () => {
            goToCart();
            n.destroy();
          },
          type: 'primary',
          size: 'small'
        },
        { default: () => "В корзину" }
      ),
  });
}

function addOrGoToCart() {
  if (!product.value) return;
  if (isInCart.value) {
    goToCart();
    return;
  }
  addGoods();
}

function openBuyOneClick() {
    showBuyOneClick.value = true;
}

function openFullscreenGallery(index: number) {
  const pictures = product.value?.pictures ?? [];
  if (!pictures.length) return;
  const safeIndex = Math.min(Math.max(index, 0), pictures.length - 1);
  fullscreenIndex.value = safeIndex;
  showFullscreenGallery.value = true;
}

function toggleFavorite() {
    if (!product.value) return;
    const action = favoritesStore.addToFavorite(product.value as any);
    if (action === 'added') {
        message.success('Добавлено в избранное');
    } else {
        message.info('Удалено из избранного');
    }
}

function shareProduct() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    message.success('Ссылка скопирована');
  }).catch(() => {
    message.error('Ошибка копирования');
  });
}

useHead({
  title: computed(() => `${productName.value} ${carSubtitle.value ? '— ' + carSubtitle.value : ''}`),
});
</script>

<template>
  <main class="bg-light-bg dark:bg-dark-bg min-h-screen font-sans pb-24 lg:pb-12">
    <!-- Modal -->
    <BuyOneClickModal 
        v-if="product"
        v-model:show="showBuyOneClick" 
        :product-name="productName" 
        :product-id="productId" 
    />
    <ProductFullscreenCarousel
        v-if="product"
        v-model:show="showFullscreenGallery"
        :pictures="product.pictures"
        :start-index="fullscreenIndex"
    />

    <!-- MOBILE: Header & Gallery -->
    <div class="relative lg:hidden bg-white dark:bg-dark-card">
      <div class="absolute top-4 left-4 z-20 flex gap-4 w-full pr-8 justify-between pointer-events-none">
         <button
          type="button"
          @click="goBack"
          class="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 dark:bg-black/50 shadow-sm backdrop-blur active:scale-90 transition-transform"
          aria-label="Назад"
        >
          <ArrowLeftIcon class="h-6 w-6 text-slate-700 dark:text-white" />
        </button>
         <button
          type="button"
          @click="shareProduct"
          class="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 dark:bg-black/50 shadow-sm backdrop-blur active:scale-90 transition-transform"
          aria-label="Поделиться"
        >
          <ShareIcon class="h-6 w-6 text-slate-700 dark:text-white" />
        </button>
      </div>
     
      <ProductMobileSlider :pictures="product?.pictures" @open="openFullscreenGallery" />
    </div>

    <div class="container mx-auto px-4 pt-4 lg:pt-8">
      <!-- DESKTOP: Breadcrumbs -->
      <div class="hidden lg:block mb-6">
        <n-breadcrumb>
          <n-breadcrumb-item v-for="option in breadcrumbs" :key="option.text">
            <nuxt-link :to="option.link" class="text-gray-500 hover:text-primary transition-colors">{{ option.text }}</nuxt-link>
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="pending">
        <!-- Mobile Skeleton -->
        <div class="lg:hidden -mx-4 -mt-4">
          <div class="w-full h-[350px] bg-gray-200 dark:bg-white/10 animate-pulse"></div>
          <div class="px-4 pt-4 space-y-4">
            <div class="h-6 bg-gray-200 dark:bg-white/10 rounded-lg w-3/4 animate-pulse"></div>
            <div class="h-4 bg-gray-200 dark:bg-white/10 rounded-lg w-1/2 animate-pulse"></div>
            <div class="h-10 bg-gray-200 dark:bg-white/10 rounded-lg w-1/3 animate-pulse"></div>
            <div class="flex gap-3 pt-2">
              <div class="h-12 bg-gray-200 dark:bg-white/10 rounded-xl flex-1 animate-pulse"></div>
              <div class="h-12 bg-gray-200 dark:bg-white/10 rounded-xl w-12 animate-pulse"></div>
            </div>
          </div>
        </div>

        <!-- Desktop Skeleton -->
        <div class="hidden lg:grid grid-cols-[minmax(0,1fr)_360px] gap-8">
          <!-- Left Column -->
          <div class="space-y-8">
            <div class="bg-white dark:bg-dark-card rounded-2xl p-4 shadow-sm">
              <div class="aspect-square bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
              <div class="flex gap-2 mt-4">
                <div v-for="i in 4" :key="i" class="w-20 h-20 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div class="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm space-y-6">
              <div class="h-6 bg-gray-200 dark:bg-white/10 rounded-lg w-1/4 animate-pulse"></div>
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 dark:bg-white/10 rounded w-full animate-pulse"></div>
                <div class="h-4 bg-gray-200 dark:bg-white/10 rounded w-5/6 animate-pulse"></div>
                <div class="h-4 bg-gray-200 dark:bg-white/10 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          </div>
          <!-- Right Column -->
          <div class="bg-white dark:bg-dark-card rounded-2xl p-5 shadow-lg space-y-4">
            <div class="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/4 animate-pulse"></div>
            <div class="h-7 bg-gray-200 dark:bg-white/10 rounded w-3/4 animate-pulse"></div>
            <div class="h-5 bg-gray-200 dark:bg-white/10 rounded w-1/2 animate-pulse"></div>
            <div class="h-12 bg-gray-200 dark:bg-white/10 rounded-lg w-1/3 animate-pulse mt-4"></div>
            <div class="space-y-3 pt-4">
              <div class="h-14 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
              <div class="h-12 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
              <div class="grid grid-cols-2 gap-3">
                <div class="h-12 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
                <div class="h-12 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="!product" class="py-10">
        <n-result
          status="404"
          title="Товар не найден"
          description="Похоже, этот товар закончился или был удален."
        >
          <template #footer>
            <n-button @click="router.push({ name: 'catalog' })" type="primary">
              Вернуться в каталог
            </n-button>
          </template>
        </n-result>
      </div>

      <!-- Content Grid -->
      <div
        v-else
        class="grid w-full grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start"
      >
        <!-- LEFT COLUMN: Gallery & Specs -->
        <div class="space-y-8 min-w-0">
          
          <!-- Desktop Gallery -->
          <div class="hidden lg:block bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm p-4">
            <ProductSlider :pictures="product.pictures" @open="openFullscreenGallery" />
          </div>

          <!-- Description & Specs (Both Mobile & Desktop) -->
          <div class="bg-white dark:bg-dark-card rounded-2xl p-4 lg:p-8 shadow-sm">
             <h2 class="text-xl font-bold mb-6 text-light-text-main dark:text-dark-text-main">О товаре</h2>
             
             <div class="mb-8">
               <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3">Описание</h3>
               <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                 {{ descriptionText || 'Описание отсутствует.' }}
               </p>
             </div>

             <div class="grid md:grid-cols-2 gap-8">
                <div>
                   <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Характеристики</h3>
                   <dl class="space-y-3">
                      <div v-for="spec in specifications" :key="spec.label" class="flex justify-between text-sm border-b border-gray-100 dark:border-gray-800 pb-2">
                        <dt class="text-gray-500 dark:text-gray-400">{{ spec.label }}</dt>
                        <dd class="text-gray-900 dark:text-gray-200 font-medium">{{ spec.value }}</dd>
                      </div>
                   </dl>
                </div>
                <div>
                   <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Габариты</h3>
                   <dl class="space-y-3">
                      <div v-for="dim in dimensions" :key="dim.label" class="flex justify-between text-sm border-b border-gray-100 dark:border-gray-800 pb-2">
                        <dt class="text-gray-500 dark:text-gray-400">{{ dim.label }}</dt>
                        <dd class="text-gray-900 dark:text-gray-200 font-medium">{{ dim.value }}</dd>
                      </div>
                      <div class="flex justify-between text-sm border-b border-gray-100 dark:border-gray-800 pb-2">
                        <dt class="text-gray-500 dark:text-gray-400">Состояние</dt>
                        <dd class="text-gray-900 dark:text-gray-200 font-medium">Б/у</dd>
                      </div>
                   </dl>
                </div>
             </div>

             <div v-if="codes.length > 0" class="mt-8">
                <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3">Коды детали</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="code in codes" :key="code" class="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-md text-sm text-gray-700 dark:text-gray-300">
                    {{ code }}
                  </span>
                </div>
             </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Buy Block (Sticky) -->
        <div class="lg:sticky lg:top-24 space-y-4">
          
          <div class="bg-white dark:bg-dark-card rounded-2xl p-5 shadow-lg border border-transparent dark:border-white/5">
             <!-- Header Info -->
             <div class="flex items-center gap-2 mb-2 text-sm text-gray-500">
                <span class="text-gray-400">Арт: {{ product.id }}</span>
             </div>

             <h1 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
               {{ productName }}
               <span v-if="carSubtitle" class="block text-base font-normal text-gray-500 mt-1">{{ carSubtitle }}</span>
             </h1>

             <!-- Price Block -->
             <div class="mb-6">
                <div class="flex items-center justify-between">
                   <span class="text-4xl font-black text-gray-900 dark:text-white">{{ getPrice(productPrice) }}</span>
                   <div v-if="statusMeta.label">
                      <n-tag :type="statusMeta.type" round size="small" :bordered="false" class="font-bold">
                         {{ statusMeta.label }}
                      </n-tag>
                   </div>
                </div>
             </div>

             <!-- Actions -->
             <div class="space-y-3">
                 <!-- Primary Action: Buy in 1 Click -->
                <button 
                  @click="openBuyOneClick"
                  class="hidden lg:block w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                >
                  Купить в 1 клик
                </button>
                
                <!-- Secondary Action: Add to Cart -->
                <button
                  @click="addOrGoToCart"
                  class="hidden lg:block w-full bg-white dark:bg-white/5 border-2 border-primary/20 hover:border-primary text-primary dark:text-white font-bold py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
                  :class="{'!bg-emerald-50 dark:!bg-emerald-900/30 !border-emerald-500 !text-emerald-700 dark:!text-emerald-400': isInCart}"
                  :disabled="!mobileCanInteract"
                >
                  {{ mobileCtaText }}
                </button>
                
                <!-- Secondary Actions -->
                <div class="grid grid-cols-2 gap-3">
                   <button 
                    @click="toggleFavorite"
                    class="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-sm font-medium"
                    :class="{'!text-wb-red': isFavorite}"
                   >
                      <component :is="isFavorite ? HeartIconSolid : HeartIcon" class="w-5 h-5" />
                      В избранное
                   </button>
                   <button 
                    @click="shareProduct"
                    class="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-sm font-medium"
                   >
                      <ShareIcon class="w-5 h-5" />
                      Поделиться
                   </button>
                </div>
             </div>

             <!-- Delivery Info -->
             <div class="mt-6 space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                <!-- <div class="flex items-start gap-3">
                   <div class="mt-1"><TruckIcon class="w-5 h-5 text-gray-400" /></div>
                   <div>
                      <div class="text-sm font-bold text-gray-900 dark:text-white">Доставка завтра</div>
                      <div class="text-xs text-gray-500">Курьером или в пункт выдачи</div>
                   </div>
                </div> -->
                <div class="flex items-start gap-3">
                   <div class="mt-1"><CheckBadgeIcon class="w-5 h-5 text-gray-400" /></div>
                   <div>
                      <div class="text-sm font-bold text-gray-900 dark:text-white">Гарантия возврата</div>
                      <div class="text-xs text-gray-500">14 дней на проверку товара</div>
                   </div>
                </div>
             </div>
          </div>
          
          <!-- Seller Info (Optional) -->
          <div class="bg-white dark:bg-dark-card rounded-2xl p-4 shadow-sm border border-transparent dark:border-white/5 flex items-center justify-between">
             <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-xl">🏢</div>
                <div>
                   <div class="text-sm font-bold text-gray-900 dark:text-white">Kaynar Warehouse</div>
                   <div class="text-xs text-gray-500 dark:text-gray-400">Продавец</div>
                </div>
             </div>
             <div class="text-xs font-bold text-gray-400">4.9 ★</div>
          </div>

        </div>
      </div>
    </div>

    <!-- MOBILE CTA (Sticky Bottom) -->
    <client-only>
      <div
        v-if="product"
        class="fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-800 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] lg:hidden"
      >
        <div class="px-4 py-3 flex items-center gap-3">
          
          <!-- Add to Cart (Now a Side Icon Button) -->
           <button 
             @click="addOrGoToCart"
             class="flex-none p-3 rounded-xl bg-gray-100 dark:bg-white/10 active:scale-95 transition-transform"
             :class="{'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20': isInCart, 'text-gray-500': !isInCart}"
             aria-label="В корзину"
          >
             <ShoppingCartIcon class="w-6 h-6" />
          </button>
          
          <!-- Buy in 1 Click (Now the Primary Large Button) -->
          <button
            class="flex-1 bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/30 active:scale-95 transition-transform flex flex-col items-center justify-center leading-tight"
            @click="openBuyOneClick"
          >
            <span class="text-sm">Купить в 1 клик</span>
            <span class="text-xs opacity-90">{{ getPrice(productPrice) }}</span>
          </button>

           <!-- Favorite Icon in Sticky Bar -->
          <button 
             @click="toggleFavorite"
             class="flex-none p-3 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-500 active:scale-95 transition-transform"
             :class="{'!text-wb-red !bg-red-50 dark:!bg-red-900/20': isFavorite}"
          >
             <component :is="isFavorite ? HeartIconSolid : HeartIcon" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </client-only>
  </main>
</template>

<style scoped>
/* Gradient Text for Title (Optional) */
/* .gradient-text {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600;
} */
</style>
