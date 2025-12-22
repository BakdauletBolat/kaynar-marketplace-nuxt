<template>
  <div class="demo">
    <h2 class="demo__title">2-колоночная сетка (mobile)</h2>

    <div class="demo__grid">
      <!-- Card WITHOUT price (90% случаев) -->
      <ProductCard
        :product="productWithoutPrice"
        @open="handleOpen"
        @action="handleAction"
      />

      <!-- Card WITH price -->
      <ProductCard
        :product="productWithPrice"
        @open="handleOpen"
        @action="handleAction"
      />

      <!-- Card WITH discount -->
      <ProductCard
        :product="productWithDiscount"
        @open="handleOpen"
        @action="handleAction"
      />

      <!-- Card WITHOUT photos -->
      <ProductCard
        :product="productNoPhotos"
        @open="handleOpen"
        @action="handleAction"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue';

// ─────────────────────────────────────
// ПРИМЕР 1: БЕЗ ЦЕНЫ (основной кейс)
// ─────────────────────────────────────
const productWithoutPrice = {
  id: 1,
  name: 'Передний бампер оригинал',
  manufacturer: 'Toyota',
  model: 'Camry XV70',
  category: 'Кузовные детали',
  status: 'В наличии',
  photos: [
    'https://placehold.co/400x300/e2e8f0/64748b?text=Photo+1',
    'https://placehold.co/400x300/e2e8f0/64748b?text=Photo+2',
    'https://placehold.co/400x300/e2e8f0/64748b?text=Photo+3',
  ],
  // price: null ← НЕТ ЦЕНЫ
};

// ─────────────────────────────────────
// ПРИМЕР 2: С ЦЕНОЙ
// ─────────────────────────────────────
const productWithPrice = {
  id: 2,
  name: 'Фара передняя левая LED',
  manufacturer: 'Lexus',
  model: 'RX 350',
  category: 'Оптика',
  status: 'В наличии',
  price: 125000,
  photos: [
    'https://placehold.co/400x300/dbeafe/3b82f6?text=LED+Фара',
  ],
};

// ─────────────────────────────────────
// ПРИМЕР 3: СО СКИДКОЙ
// ─────────────────────────────────────
const productWithDiscount = {
  id: 3,
  name: 'Масляный фильтр Mann W712/75',
  manufacturer: 'Mann',
  category: 'Фильтры',
  status: 'В наличии',
  price: 3500,
  market_price: 5200,
  photos: [
    'https://placehold.co/400x300/dcfce7/22c55e?text=Фильтр',
  ],
};

// ─────────────────────────────────────
// ПРИМЕР 4: БЕЗ ФОТО + БЕЗ ЦЕНЫ
// ─────────────────────────────────────
const productNoPhotos = {
  id: 4,
  name: 'Радиатор охлаждения двигателя',
  manufacturer: 'Nissan',
  model: 'X-Trail T32',
  status: 'Зарезервирован',
  photos: [],
  // price: null
};

function handleOpen(id: number | string) {
  console.log('Open product:', id);
}

function handleAction(id: number | string) {
  console.log('Contact seller:', id);
}
</script>

<style scoped>
.demo {
  @apply max-w-md mx-auto p-4 bg-slate-50 min-h-screen;
}

.demo__title {
  @apply text-xl font-bold text-slate-900 mb-4;
}

/* 2-column grid (mobile-first) */
.demo__grid {
  @apply grid grid-cols-2 gap-3;
}

/* На больших экранах можно 3-4 колонки */
@media (min-width: 768px) {
  .demo {
    @apply max-w-4xl;
  }

  .demo__grid {
    @apply grid-cols-3 gap-4;
  }
}

@media (min-width: 1024px) {
  .demo__grid {
    @apply grid-cols-4;
  }
}
</style>
