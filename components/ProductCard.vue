<template>
  <div 
    class="group relative flex bg-light-card dark:bg-dark-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20" 
    :class="[
      horizontal ? 'flex-row h-auto min-h-[140px]' : 'flex-col h-full'
    ]"
    @click="handleCardClick"
  >
    <!-- Image Area -->
    <div 
      class="relative overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0"
      :class="[
         horizontal ? 'w-32 md:w-48 aspect-[3/4] md:aspect-square' : 'w-full aspect-[3/4]'
      ]"
    >
      <img
        :src="mainPhoto"
        :alt="item.name"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      <!-- Discount Badge -->
      <div v-if="hasDiscount" class="absolute bottom-1.5 left-1.5 bg-wb-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
        -{{ discountPercent }}%
      </div>

      <!-- Quick Actions (Hover) -->
      <div
        class="absolute top-2 right-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-2"
        v-if="!horizontal"
      >
        <button
          @click.stop="toggleFavorite"
          class="w-8 h-8 flex items-center justify-center bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-full text-gray-400 dark:text-gray-500 hover:text-wb-red dark:hover:text-wb-red transition-colors shadow-md"
          :class="{ '!text-wb-red': isFavorite }"
        >
          <n-icon :component="isFavorite ? Heart : HeartOutline" size="18" />
        </button>
        <button
          @click.stop="shareProduct"
          class="w-8 h-8 flex items-center justify-center bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-full text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors shadow-md"
        >
          <n-icon :component="ShareSocialOutline" size="18" />
        </button>
      </div>

      <!-- Out of stock overlay -->
      <div v-if="isOutOfStock" class="absolute inset-0 bg-white/60 dark:bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
        <span class="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Продано</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-3 flex flex-col flex-grow relative min-w-0">
      <!-- Horizontal Actions (visible in list view) -->
      <div v-if="horizontal" class="absolute top-2 right-2 flex gap-2 z-10">
         <button
          @click.stop="toggleFavorite"
          class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-gray-500 hover:text-wb-red dark:hover:text-wb-red transition-colors"
          :class="{ '!text-wb-red': isFavorite }"
        >
          <n-icon :component="isFavorite ? Heart : HeartOutline" size="18" />
        </button>
      </div>

      <!-- Price Row -->
      <div class="flex items-baseline gap-2 mb-1.5 h-auto">
        <template v-if="hasPrice">
          <span class="text-primary font-bold text-lg leading-none">{{ formattedPrice }}</span>
          <span v-if="hasDiscount" class="text-gray-400 text-xs line-through decoration-gray-400">{{ formattedMarketPrice }}</span>
        </template>
        <span v-else class="text-sm font-medium text-gray-400">Нет цены</span>
      </div>

      <!-- Brand / Info -->
      <div class="text-[10px] text-gray-400 mb-1 font-medium uppercase tracking-wider truncate pr-8">
        {{ manufacturerLabel }}
      </div>

      <!-- Title -->
      <h3 class="text-sm text-light-text-main dark:text-dark-text-main leading-5 line-clamp-2 mb-2 font-normal">
        {{ item.name }}
      </h3>
      
      <!-- Horizontal Extra Info (Optional) -->
      <div v-if="horizontal && item.detail" class="hidden md:block text-xs text-gray-500 mb-2">
         <!-- Add details here if available -->
      </div>

      <!-- Add to Cart Button -->
      <button
        @click.stop="addToCart"
        class="mt-auto w-full font-semibold py-2 rounded-lg text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        :class="[
          isInCart
            ? 'bg-green-500 dark:bg-green-600 text-white hover:bg-green-600 dark:hover:bg-green-500'
            : 'bg-primary/10 dark:bg-primary/20 hover:bg-primary text-primary hover:text-white',
           horizontal ? 'md:max-w-[200px]' : ''
        ]"
      >
        <span v-if="isInCart">В корзине</span>
        <span v-else>В корзину</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { ProductList } from '~/api/products';
import { getPrice } from '~/utils/getPrice';
import { CardStorage } from "~/storages/storage";
import { useFavoritesStore } from "~/storages/favorites-store";
import { HeartOutline, Heart, ShareSocialOutline } from "@vicons/ionicons5";
import { NIcon, useMessage } from "naive-ui";

interface Props {
  item: ProductList;
  horizontal?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  horizontal: false
});

const router = useRouter();
const message = useMessage();
const cardStorage = CardStorage.getInstance();
const favoritesStore = useFavoritesStore();

// Photos
const mainPhoto = computed(() => {
  if (props.item.pictures && props.item.pictures.length > 0) {
    return props.item.pictures[0].image;
  }
  return '/img/no-photo.png';
});

// Price Logic
const hasPrice = computed(() => {
  return props.item.price !== null && props.item.price !== undefined && props.item.price > 0;
});

const formattedPrice = computed(() => getPrice(props.item.price));

const hasDiscount = computed(() => {
  return (
    hasPrice.value &&
    props.item.market_price &&
    props.item.market_price > props.item.price
  );
});

const formattedMarketPrice = computed(() => getPrice(props.item.market_price));

const discountPercent = computed(() => {
  if (!hasDiscount.value) return 0;
  const diff = props.item.market_price - props.item.price;
  return Math.round((diff / props.item.market_price) * 100);
});

// Info
const manufacturerLabel = computed(() => {
  const brand = props.item.modelCar?.manufacturer?.name || '';
  const model = props.item.modelCar?.name || '';
  return brand && model ? `${brand} ${model}` : (brand || model || 'Запчасть');
});

const isOutOfStock = computed(() => props.item.status === 'Продан');

const isInCart = computed(() => cardStorage.checkInGoods(props.item.id));
const isFavorite = computed(() => favoritesStore.checkInFavorites(props.item.id));

// Actions
function handleCardClick() {
  router.push({
    name: 'product-id',
    params: { id: props.item.id }
  });
}

function addToCart() {
  if (isInCart.value) {
    router.push({ name: 'auth-cart' });
    return;
  }
  
  cardStorage.addGood({
    quantity: 1,
    id: props.item.id,
    name: props.item.name,
    // @ts-ignore
    price: props.item.price,
    // @ts-ignore
    picture_url: mainPhoto.value,
  });
  cardStorage.isActive.value = true;
  message.success('Товар добавлен в корзину');
}

function toggleFavorite() {
  const action = favoritesStore.addToFavorite(props.item);
  if (action === 'added') {
    message.success('Добавлено в избранное');
  } else {
    message.info('Удалено из избранного');
  }
}

function shareProduct() {
  const url = `${window.location.origin}/product/${props.item.id}`;
  navigator.clipboard.writeText(url).then(() => {
    message.success('Ссылка скопирована');
  }).catch(() => {
    message.error('Ошибка копирования');
  });
}
</script>
