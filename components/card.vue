<template>
    <!-- 
      Оборачиваем всю карточку в NuxtLink для единой точки навигации.
      Стили вынесены в отдельный класс `.product-card` для чистоты.
    -->
    <div :to="productLink">
      <article class="product-card">
        <!-- Блок с изображением -->
        <div class="product-card__image-wrapper">
            <NCarousel :space-between="20" draggable show-arrow>
                <img
                v-for="picture in item.pictures"
                :key="picture.id" 
                loading="lazy"
                class="product-card__image"
                :alt="item.name ?? 'Изображение товара'"
                :src="picture.image"
                />
            </NCarousel>
        </div>
  
        <!-- Блок с информацией о товаре -->
        <div class="product-card__content">
          <!-- Верхняя часть: цена и кнопка "в избранное" -->
          <header class="product-card__header">
            <NuxtLink :to="productLink">
                <span class="product-card__price">{{ getPrice(item.price) }}</span>
            </NuxtLink>
            
            <!-- 
              Элемент "в избранное" теперь является кнопкой для улучшения доступности.
              `@click.prevent` не дает сработать NuxtLink, который находится выше.
            -->
            <button
              type="button"
              class="product-card__favorite-button"
              aria-label="Добавить в избранное"
              @click.prevent="handleFavorite"
            >
              <n-icon
                size="24"
                :component="isFavorite ? Heart : HeartOutline"
              />
            </button>
          </header>
  
          <!-- Основная информация -->
          <NuxtLink :to="productLink">
                <main class="product-card__main">
                <h3 class="product-card__title">{{ item.name ?? 'Название товара' }}</h3>
                <p class="product-card__model">{{ item.modelCar.manufacturer.name }}, {{ item.modelCar.name }}</p>
            </main>
           </NuxtLink>
          
  
          <!-- Нижняя часть: город и дата -->
          <footer class="product-card__footer">
            <span>{{ item.warehouse?.city?.name ?? 'Шымкент' }}</span>
            <span class="product-card__footer-separator" aria-hidden="true" />
            <span>{{ formattedDate }}</span>
          </footer>
        </div>
      </article>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useDateFormat } from '@vueuse/core';
  import { NCarousel, NIcon, useMessage } from 'naive-ui';
  import { Heart, HeartOutline } from '@vicons/ionicons5';
  import type { ProductList } from '~/api/products';
  import { useFavoritesStore } from '~/storages/favorites-store';
  import { getPrice } from '~/utils/getPrice';
  
  // --- PROPS ---
  const props = defineProps<{
    item: ProductList;
  }>();
  
  // --- STATE & STORES ---
  const favoritesStore = useFavoritesStore();
  const message = useMessage();
  
  // --- COMPUTED ---
  // Создаем вычисляемое свойство для ссылки, чтобы шаблон был чище.
  const productLink = computed(() => ({
    name: 'product-id',
    params: {
      id: props.item.id,
    },
  }));
  
  // Вычисляемое свойство для статуса "в избранном"
  const isFavorite = computed(() => favoritesStore.checkInFavorites(props.item.id));
  
  // Форматируем дату. Переименовал для ясности.
  const formattedDate = useDateFormat(props.item.created_at, 'D MMMM', { locales: 'ru-RU' });
  
  // --- METHODS ---
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
  /* 
    Инкапсулируем стили карточки здесь. 
    Это делает шаблон намного чище и позволяет легко вносить изменения.
  */
  .product-card {
    @apply flex flex-col lg:flex-row bg-white rounded-lg border border-slate-200 
           p-3 lg:p-5 gap-4 transition-all duration-200 
           hover:shadow-md hover:border-slate-300;
  }
  
  .product-card__image-wrapper {
    /* Задаем фиксированный размер для контейнера карусели на больших экранах */
    @apply w-full lg:w-[160px] flex-shrink-0;
  }
  
  .product-card__image {
    @apply rounded-md border object-cover w-full h-[200px] lg:h-[120px];
  }
  
  .product-card__content {
    @apply flex flex-col w-full;
  }
  
  .product-card__header {
    @apply flex justify-between items-start w-full;
  }
  
  .product-card__price {
    @apply text-blue-900 font-bold text-xl;
  }
  
  .product-card__favorite-button {
    /* Стили для кнопки "в избранное" */
    @apply p-1 text-slate-500 hover:text-red-500 transition-colors duration-200;
  }
  /* Меняем цвет иконки при наведении на кнопку */
  .product-card__favorite-button .n-icon {
      @apply text-red-500;
  }
  
  
  .product-card__main {
    /* Основной контент растет, чтобы футер всегда был внизу */
    @apply flex-grow mt-1;
  }
  
  .product-card__title {
    @apply text-lg text-slate-800 font-semibold leading-tight;
  }
  
  .product-card__model {
    @apply text-sm text-slate-600 mt-1;
  }
  
  .product-card__footer {
    @apply flex items-center gap-2 text-sm text-slate-500 font-light mt-3;
  }
  
  /* Визуальный разделитель между городом и датой */
  .product-card__footer-separator::before {
    content: '•';
  }
  </style>