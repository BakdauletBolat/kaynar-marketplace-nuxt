<template>
  <n-modal
    v-model:show="show"
    class="!w-screen !h-screen !max-w-none !m-0 !self-stretch !rounded-none !shadow-none !p-0"
    :auto-focus="false"
    :trap-focus="false"
  >
    <div class="w-full h-full bg-black text-white flex flex-col">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="text-sm text-white/70">
          <span v-if="total">{{ currentIndex + 1 }} / {{ total }}</span>
          <span v-else>Нет фотографий</span>
        </div>
        <button
          type="button"
          class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          @click="show = false"
          aria-label="Закрыть"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
      <div class="relative flex-1 min-h-0">
        <Flicking
          v-if="total"
          ref="flicking"
          class="fullscreen-slider h-full"
          :options="{
            preventClickOnDrag: true,
            duration: 200,
            defaultIndex: startIndex ?? 0
          }"
          @changed="onChange"
        >
          <div
            v-for="(picture, index) in pictures"
            :key="picture.id"
            class="panel w-full h-full flex items-center justify-center"
          >
            <img
              :src="picture.image"
              :alt="`Фото ${index + 1}`"
              class="max-w-full max-h-full object-contain select-none"
              draggable="false"
            />
          </div>
        </Flicking>
        <div v-else class="w-full h-full flex items-center justify-center text-sm text-white/70">
          Нет фотографий
        </div>

        <button
          type="button"
          class="absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-40"
          :disabled="currentIndex === 0"
          @click="goPrev"
          aria-label="Предыдущее фото"
        >
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-40"
          :disabled="currentIndex >= total - 1"
          @click="goNext"
          aria-label="Следующее фото"
        >
          <ChevronRightIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import { ref, watch, nextTick, computed, toRefs } from "vue";
import { NModal } from "naive-ui";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { type Picture } from "~/api/products";

interface ChangedEvent {
  index: number;
}

const show = defineModel<boolean>("show");

const props = withDefaults(defineProps<{
  pictures?: Picture[];
  startIndex?: number;
}>(), {
  pictures: () => [],
  startIndex: 0
});

const { pictures, startIndex } = toRefs(props);
const flicking = ref<InstanceType<typeof Flicking> | null>(null);
const currentIndex = ref(0);
const total = computed(() => pictures.value.length);

function normalizeIndex(index: number) {
  if (!total.value) return 0;
  return Math.min(Math.max(index, 0), total.value - 1);
}

function syncTo(index: number, duration?: number) {
  if (!flicking.value) return;
  try {
    flicking.value.moveTo(index, duration);
  } catch (e) {
    // Ignore move errors when bounds shift
  }
}

function onChange(event: ChangedEvent) {
  currentIndex.value = event.index;
}

function goPrev() {
  if (currentIndex.value <= 0) return;
  syncTo(currentIndex.value - 1);
}

function goNext() {
  if (currentIndex.value >= total.value - 1) return;
  syncTo(currentIndex.value + 1);
}

watch(show, (value) => {
  if (!value) return;
  currentIndex.value = normalizeIndex(startIndex.value ?? 0);
  nextTick(() => syncTo(currentIndex.value, 0));
});

watch(startIndex, (value) => {
  if (!show.value) return;
  currentIndex.value = normalizeIndex(value ?? 0);
  nextTick(() => syncTo(currentIndex.value, 0));
});

watch(total, () => {
  if (!total.value) {
    currentIndex.value = 0;
    return;
  }
  currentIndex.value = normalizeIndex(currentIndex.value);
  if (show.value) {
    nextTick(() => syncTo(currentIndex.value, 0));
  }
});
</script>

<style scoped>
.fullscreen-slider :deep(.flicking-viewport) {
  height: 100%;
}

.fullscreen-slider :deep(.flicking-camera) {
  height: 100%;
}
</style>
