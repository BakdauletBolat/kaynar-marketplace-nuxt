<template>
  <div class="product-mobile-gallery">
    <!-- Main Image Slider -->
    <div v-if="pictures.length > 0" class="relative">
      <Flicking
        ref="flicking"
        class="main-slider"
        :options="{
          preventClickOnDrag: true,
          duration: 200,
          moveType: 'snap'
        }"
        @changed="onChange"
        @click="emit('open', currentValue)"
      >
        <div
          v-for="picture in pictures"
          :key="picture.id"
          class="panel w-full"
        >
          <img
            :src="picture.image"
            :alt="'Фото товара'"
            class="main-image pointer-events-none"
          />
        </div>
      </Flicking>

      <!-- Image Counter Badge -->
      <div class="absolute bottom-4 left-4 z-10 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
        <span class="text-white text-sm font-medium">
          {{ currentValue + 1 }} из {{ pictures.length }}
        </span>
      </div>

      <!-- Progress Bar -->
      <div class="progress-bar-container">
        <div
          class="progress-bar"
          :style="{ width: progressPercent + '%' }"
        />
      </div>
    </div>

    <!-- Thumbnail Preview Strip -->
    <div v-if="pictures.length > 1" class="thumbnails-container">
      <div
        ref="thumbnailsRef"
        class="thumbnails-scroll"
      >
        <div class="thumbnails-track">
          <button
            v-for="(picture, index) in pictures"
            :key="picture.id"
            :ref="el => setThumbnailRef(el, index)"
            class="thumbnail-item"
            :class="{ 'thumbnail-active': currentValue === index }"
            @click="goToSlide(index)"
          >
            <img
              :src="picture.image"
              :alt="`Фото ${index + 1}`"
              class="thumbnail-image"
            />
            <div class="thumbnail-overlay" />
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!pictures.length" class="empty-state">
      <div class="empty-icon">📷</div>
      <span>Нет фотографий</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { type Picture } from "@/api/products";

interface ChangedEvent {
  index: number;
}

const props = withDefaults(defineProps<{
  pictures?: Picture[]
}>(), {
  pictures: () => []
});

const currentValue = ref(0);
const emit = defineEmits<{
  (e: "open", index: number): void;
}>();
const flicking = ref<InstanceType<typeof Flicking> | null>(null);
const thumbnailsRef = ref<HTMLDivElement | null>(null);
const thumbnailRefs = ref<Map<number, HTMLButtonElement>>(new Map());

// Progress percentage
const progressPercent = computed(() => {
  if (props.pictures.length <= 1) return 100;
  return ((currentValue.value + 1) / props.pictures.length) * 100;
});

function setThumbnailRef(el: any, index: number) {
  if (el) {
    thumbnailRefs.value.set(index, el as HTMLButtonElement);
  }
}

function onChange(event: ChangedEvent) {
  currentValue.value = event.index;
  scrollThumbnailIntoView(event.index);
}

function goToSlide(index: number) {
  if (flicking.value) {
    try {
      flicking.value.moveTo(index);
    } catch (e) {
      // Ignore animation errors
    }
  }
}

function scrollThumbnailIntoView(index: number) {
  nextTick(() => {
    const thumbnail = thumbnailRefs.value.get(index);
    const container = thumbnailsRef.value;

    if (thumbnail && container) {
      const containerRect = container.getBoundingClientRect();
      const scrollLeft = thumbnail.offsetLeft - (containerRect.width / 2) + (thumbnail.offsetWidth / 2);

      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth'
      });
    }
  });
}

// Reset to first slide when pictures change
watch(() => props.pictures, (newPics, oldPics) => {
  if (newPics !== oldPics) {
    currentValue.value = 0;
    thumbnailRefs.value.clear();
    nextTick(() => {
      if (flicking.value) {
        try {
          flicking.value.moveTo(0, 0);
        } catch (e) {}
      }
    });
  }
}, { deep: true });

// Initial scroll to first thumbnail
onMounted(() => {
  nextTick(() => {
    scrollThumbnailIntoView(0);
  });
});
</script>

<style scoped>
.product-mobile-gallery {
  @apply w-full bg-white dark:bg-dark-card;
}

.main-slider {
  @apply w-full;
}

.main-slider :deep(.flicking-viewport) {
  @apply w-full overflow-hidden;
}

.main-slider :deep(.flicking-camera) {
  @apply flex;
}

.main-image {
  @apply w-full object-cover select-none;
  height: 320px;
  -webkit-user-drag: none;
}

/* Progress Bar */
.progress-bar-container {
  @apply absolute bottom-0 left-0 right-0 h-1 bg-black/20;
}

.progress-bar {
  @apply h-full bg-primary transition-all duration-300 ease-out;
}

/* Thumbnails */
.thumbnails-container {
  @apply bg-white dark:bg-dark-card px-3 py-3;
}

.thumbnails-scroll {
  @apply overflow-x-auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.thumbnails-scroll::-webkit-scrollbar {
  display: none;
}

.thumbnails-track {
  @apply flex gap-2;
  width: max-content;
  padding: 2px;
}

.thumbnail-item {
  @apply relative flex-shrink-0 rounded-lg overflow-hidden;
  @apply transition-all duration-200 ease-out;
  @apply focus:outline-none;
  width: 60px;
  height: 60px;
  border: 2px solid transparent;
}

.thumbnail-item:active {
  transform: scale(0.95);
}

.thumbnail-active {
  @apply border-primary;
}

.thumbnail-image {
  @apply w-full h-full object-cover;
}

.thumbnail-overlay {
  @apply absolute inset-0 transition-colors duration-200;
  background: rgba(0, 0, 0, 0.15);
}

.thumbnail-active .thumbnail-overlay {
  background: transparent;
}

/* Empty State */
.empty-state {
  @apply flex flex-col items-center justify-center py-16;
  @apply text-slate-400 dark:text-slate-500;
}

.empty-icon {
  @apply text-4xl mb-2;
}
</style>
