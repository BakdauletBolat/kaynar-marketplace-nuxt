<template>
  <article class="product-card group">
    <button
      type="button"
      class="product-card__favorite-button"
      :aria-label="favoriteAriaLabel"
      :aria-pressed="isFavorite"
      @click.stop="handleFavorite"
    >
      <n-icon
        size="22"
        :component="isFavorite ? Heart : HeartOutline"
        :class="[
          'product-card__favorite-icon',
          { 'product-card__favorite-icon--active': isFavorite },
        ]"
      />
    </button>

    <div class="product-card__layout">
      <div class="product-card__image-wrapper">
        <div class="product-card__media">
          <NCarousel
            v-if="picturesCount > 0"
            :space-between="0"
            draggable
            :show-arrow="picturesCount > 1"
            :show-dots="false"
            class="product-card__carousel"
          >
            <img
              v-for="picture in item.pictures"
              :key="picture.id"
              :src="picture.image"
              :alt="item.name ?? 'Изображение товара'"
              loading="lazy"
              class="product-card__image"
            />
          </NCarousel>
          <div v-else class="product-card__image-placeholder">Нет фото</div>
        </div>

        <div v-if="picturesCount > 1" class="product-card__photos-badge">
          {{ picturesCount }} фото
        </div>

        <div v-if="categoryName" class="product-card__category-badge">
          {{ categoryName }}
        </div>
      </div>

      <NuxtLink
        :to="productLink"
        class="product-card__content product-card__content-link"
        :aria-label="linkAriaLabel"
      >
        <header class="product-card__header">
          <div class="product-card__price-block">
            <div class="product-card__price">{{ getPrice(item.price) }}</div>

            <div v-if="hasDiscount" class="product-card__price-sub">
              <span class="product-card__market-price">
                {{ getPrice(item.market_price) }}
              </span>
              <span
                v-if="discountPercent !== null"
                class="product-card__discount-badge"
              >
                -{{ discountPercent }}%
              </span>
            </div>
          </div>

          <span v-if="statusLabel" class="product-card__status" :class="statusClass">
            {{ statusLabel }}
          </span>
        </header>

        <div class="product-card__main">
          <h3 class="product-card__title">
            {{ item.name ?? 'Название товара' }}
          </h3>
          <p v-if="carLabel" class="product-card__model">{{ carLabel }}</p>

          <div class="product-card__meta">
            <span class="product-card__meta-id">№{{ item.id }}</span>
            <span
              v-if="warehouseName"
              class="product-card__meta-separator"
              aria-hidden="true"
            />
            <span v-if="warehouseName" class="product-card__meta-warehouse">
              {{ warehouseName }}
            </span>
          </div>
        </div>

        <footer class="product-card__footer">
          <span>{{ displayCity }}</span>
          <span
            v-if="cityName"
            class="product-card__footer-separator"
            aria-hidden="true"
          />
          <span>{{ formattedDate }}</span>
        </footer>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDateFormat } from '@vueuse/core';
import { NCarousel, NIcon, useMessage } from 'naive-ui';
import { Heart, HeartOutline } from '@vicons/ionicons5';
import type { ProductList } from '~/api/products';
import { useFavoritesStore } from '~/storages/favorites-store';
import { getPrice } from '~/utils/getPrice';

const props = defineProps<{
  item: ProductList;
}>();

const favoritesStore = useFavoritesStore();
const message = useMessage();

const productLink = computed(() => ({
  name: 'product-id',
  params: { id: props.item.id },
}));

const isFavorite = computed(() => favoritesStore.checkInFavorites(props.item.id));

const picturesCount = computed(() => props.item.pictures?.length ?? 0);

const categoryName = computed(() => props.item.category?.name ?? '');
const warehouseName = computed(() => props.item.warehouse?.name ?? '');
const cityName = computed(() => props.item.warehouse?.city?.name ?? '');
const displayCity = computed(() => cityName.value || 'Город не указан');

const carLabel = computed(() => {
  const manufacturerName = props.item.modelCar?.manufacturer?.name;
  const modelName = props.item.modelCar?.name;
  if (manufacturerName && modelName) return `${manufacturerName} · ${modelName}`;
  return manufacturerName || modelName || '';
});

const statusLabel = computed(() => props.item.status ?? '');
const statusClass = computed(() => {
  if (statusLabel.value === 'В наличии') return 'product-card__status--success';
  if (statusLabel.value === 'Зарезервирован') return 'product-card__status--warning';
  if (statusLabel.value === 'Продан') return 'product-card__status--danger';
  return 'product-card__status--neutral';
});

const hasDiscount = computed(() => {
  return (
    props.item.price > 0 &&
    props.item.market_price > 0 &&
    props.item.market_price > props.item.price
  );
});

const discountPercent = computed(() => {
  if (!hasDiscount.value) return null;
  const raw = (1 - props.item.price / props.item.market_price) * 100;
  if (!Number.isFinite(raw)) return null;
  const rounded = Math.round(raw);
  return rounded > 0 ? rounded : null;
});

const linkAriaLabel = computed(() => {
  const name = props.item.name ?? 'Товар';
  const price = getPrice(props.item.price);
  const car = carLabel.value ? `, ${carLabel.value}` : '';
  const city = cityName.value ? `, ${cityName.value}` : '';
  return `Открыть: ${name}${car}. ${price}${city}`;
});

const favoriteAriaLabel = computed(() =>
  isFavorite.value ? 'Убрать из избранных' : 'Добавить в избранное',
);

const formattedDate = useDateFormat(props.item.created_at, 'D MMMM', { locales: 'ru-RU' });

function handleFavorite() {
  const action = favoritesStore.addToFavorite(props.item);
  if (action === 'removed') {
    message.warning('Убрано из избранных');
  } else {
    message.success('Добавлено в избранные');
  }
}
</script>

<style scoped>
.product-card {
  @apply relative bg-white rounded-xl border border-slate-200 p-3 lg:p-4
         transition-all duration-200 hover:shadow-md hover:border-slate-300
         focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2;
}

.product-card__layout {
  @apply relative z-0 flex flex-col lg:flex-row gap-4;
}

.product-card__image-wrapper {
  @apply relative w-full lg:w-[168px] flex-shrink-0;
}

.product-card__media {
  @apply w-full h-[220px] lg:h-[136px] rounded-lg border border-slate-200 bg-slate-100 overflow-hidden;
}

.product-card__carousel {
  @apply h-full;
}

.product-card__carousel :deep(.n-carousel__slides),
.product-card__carousel :deep(.n-carousel__slide) {
  height: 100%;
}

.product-card__image {
  @apply w-full h-full object-cover;
}

.product-card__image-placeholder {
  @apply w-full h-full flex items-center justify-center text-slate-400 text-sm;
}

.product-card__photos-badge {
  @apply absolute left-2 bottom-2 rounded-md bg-black/60 text-white text-xs px-2 py-0.5 pointer-events-none;
}

.product-card__category-badge {
  @apply absolute left-2 top-2 rounded-md bg-white/90 text-slate-700 text-xs px-2 py-0.5
         border border-slate-200 backdrop-blur pointer-events-none;
}

.product-card__content {
  @apply flex flex-col w-full min-w-0;
}

.product-card__content-link {
  @apply block text-inherit no-underline;
}

.product-card__header {
  @apply flex items-start justify-between gap-3;
}

.product-card__price-block {
  @apply flex flex-col gap-1 min-w-0;
}

.product-card__price {
  @apply text-slate-900 font-bold text-xl lg:text-2xl leading-none;
}

.product-card__price-sub {
  @apply flex items-center gap-2 text-sm;
}

.product-card__market-price {
  @apply text-slate-400 line-through;
}

.product-card__discount-badge {
  @apply inline-flex items-center rounded-md bg-rose-50 text-rose-700 px-2 py-0.5 text-xs font-medium;
}

.product-card__status {
  @apply inline-flex items-center rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap;
}

.product-card__status--success {
  @apply bg-emerald-50 text-emerald-700;
}

.product-card__status--warning {
  @apply bg-amber-50 text-amber-800;
}

.product-card__status--danger {
  @apply bg-rose-50 text-rose-700;
}

.product-card__status--neutral {
  @apply bg-slate-100 text-slate-700;
}

.product-card__favorite-button {
  @apply absolute top-3 right-3 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur
         border border-slate-200 shadow-sm text-slate-600
         transition-colors duration-200 hover:text-red-500 hover:border-slate-300
         focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2;
}

.product-card__favorite-icon {
  @apply block transition-colors duration-200;
}

.product-card__favorite-icon--active {
  @apply text-red-500;
}

.product-card__main {
  @apply flex-grow min-w-0 mt-3 lg:mt-2;
}

.product-card__title {
  @apply text-base lg:text-lg text-slate-900 font-semibold leading-snug;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__model {
  @apply text-sm text-slate-600 mt-1 truncate;
}

.product-card__meta {
  @apply flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mt-2;
}

.product-card__meta-id {
  @apply inline-flex items-center rounded-md bg-slate-100 text-slate-700 px-2 py-0.5;
}

.product-card__meta-warehouse {
  @apply min-w-0 truncate;
}

.product-card__footer {
  @apply flex items-center gap-2 text-xs text-slate-500 font-light mt-3;
}

.product-card__footer-separator::before {
  content: '•';
}

.product-card__meta-separator::before {
  content: '•';
}
</style>
