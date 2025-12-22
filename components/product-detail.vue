<script setup lang="ts">
import { 
  ArrowLeftIcon, 
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  HashtagIcon,
  CalendarIcon,
  CircleStackIcon,
  ChevronRightIcon
} from "@heroicons/vue/24/outline";
import { NButton, NTag, NDivider } from "naive-ui";
import { ref, computed } from "vue";

interface Picture {
  image: string;
}

interface Attribute {
  label: string;
  value: string | number;
}

interface Props {
  name: string;
  subtitle?: string;
  price?: string | number | null;
  statusLabel: string;
  statusType?: 'success' | 'warning' | 'error' | 'info' | 'default';
  pictures?: Picture[];
  attributes?: Attribute[];
  compatibility?: Attribute[];
  description?: string;
  warehouse?: string;
  city?: string;
  productId?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  statusType: 'default',
  pictures: () => [],
  attributes: () => [],
  compatibility: () => [],
});

const emit = defineEmits(['back', 'contact']);

const hasPrice = computed(() => {
  if (typeof props.price === 'number') return props.price > 0;
  return !!props.price && props.price !== 'По запросу' && props.price !== '0';
});

// Gallery Logic
const activeImageIndex = ref(0);
const onScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  activeImageIndex.value = Math.round(target.scrollLeft / target.clientWidth);
};

const scrollContainer = ref<HTMLElement | null>(null);
const scrollToImage = (index: number) => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      left: scrollContainer.value.clientWidth * index,
      behavior: 'smooth'
    });
  }
};
</script>

<template>
  <div class="min-h-screen bg-white pb-32 lg:pb-12">
    <!-- Mobile Header (Floating) -->
    <div class="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md lg:hidden">
      <button 
        @click="emit('back')" 
        class="p-2 -ml-2 rounded-full active:bg-slate-100 transition-colors"
      >
        <ArrowLeftIcon class="w-6 h-6 text-slate-900" />
      </button>
      <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        Детали товара
      </div>
      <div class="w-10 flex justify-end">
        <span class="text-[10px] font-mono text-slate-400">#{{ productId }}</span>
      </div>
    </div>

    <div class="container mx-auto max-w-6xl lg:pt-8 lg:px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 lg:gap-10">
        
        <!-- Left: Gallery -->
        <div class="lg:col-span-7">
          <div class="relative w-full aspect-[4/3] bg-slate-50 lg:rounded-3xl lg:overflow-hidden mt-12 lg:mt-0 shadow-sm">
            <div 
              v-if="pictures.length"
              ref="scrollContainer"
              class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full"
              @scroll="onScroll"
            >
              <div 
                v-for="(pic, idx) in pictures" 
                :key="idx"
                class="flex-shrink-0 w-full h-full snap-center"
              >
                <img 
                  :src="pic.image" 
                  class="w-full h-full object-contain p-2"
                  :alt="name"
                />
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center h-full text-slate-300">
              <CircleStackIcon class="w-16 h-16 opacity-10 mb-2" />
              <span class="text-xs font-medium opacity-40">Нет фото</span>
            </div>

            <!-- Custom Pagination Dots -->
            <div 
              v-if="pictures.length > 1" 
              class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 bg-black/10 backdrop-blur-md rounded-full"
            >
              <button 
                v-for="(_, idx) in pictures" 
                :key="idx"
                @click="scrollToImage(idx)"
                class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                :class="idx === activeImageIndex ? 'bg-white w-4' : 'bg-white/40'"
              ></button>
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="lg:col-span-5 px-4 lg:px-0 mt-6 lg:mt-0">
          <div class="space-y-6">
            <!-- Title & Status -->
            <div class="space-y-3">
              <div class="flex flex-wrap items-center gap-2">
                <n-tag 
                  :type="statusType" 
                  size="small" 
                  round 
                  :bordered="false"
                  class="!font-bold !text-[10px] !px-2.5"
                >
                  {{ statusLabel.toUpperCase() }}
                </n-tag>
                <span class="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Б/У ОРИГИНАЛ</span>
              </div>
              
              <h1 class="text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {{ name }}
              </h1>
              
              <p v-if="subtitle" class="text-sm text-slate-500 font-medium leading-relaxed">
                {{ subtitle }}
              </p>
            </div>

            <!-- Price Box -->
            <div class="py-6 border-y border-slate-100">
              <div class="flex items-baseline gap-2">
                <template v-if="hasPrice">
                  <span class="text-3xl font-black text-slate-900 tracking-tighter">{{ price }}</span>
                </template>
                <template v-else>
                  <div class="space-y-1">
                    <span class="text-xl font-bold text-slate-700">Цена по запросу</span>
                    <p class="text-[11px] text-slate-400 font-medium">Свяжитесь с менеджером для актуализации</p>
                  </div>
                </template>
              </div>
            </div>

            <!-- Quick Specs -->
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl">
                  <MapPinIcon class="w-5 h-5 text-slate-400" />
                </div>
                <div class="min-w-0">
                  <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Склад</div>
                  <div class="text-xs font-bold text-slate-800 truncate">{{ city || 'Не указан' }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl">
                  <HashtagIcon class="w-5 h-5 text-slate-400" />
                </div>
                <div class="min-w-0">
                  <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Артикул</div>
                  <div class="text-xs font-bold text-slate-800 truncate">{{ productId }}</div>
                </div>
              </div>
            </div>

            <!-- Desktop CTA -->
            <div class="hidden lg:block pt-4">
              <n-button 
                type="primary" 
                size="large" 
                block 
                class="!h-16 !rounded-2xl !text-base !font-bold shadow-xl shadow-blue-500/10"
                @click="emit('contact')"
              >
                Связаться с продавцом
              </n-button>
            </div>
          </div>
        </div>

        <!-- Tabs/Details Sections -->
        <div class="lg:col-span-12 px-4 lg:px-0 mt-10 space-y-8">
          <!-- Compatibility -->
          <div v-if="compatibility.length" class="space-y-4">
            <h2 class="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Совместимость</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              <div 
                v-for="item in compatibility" 
                :key="item.label" 
                class="flex justify-between items-center py-3 border-b border-slate-50"
              >
                <span class="text-sm font-medium text-slate-400">{{ item.label }}</span>
                <span class="text-sm font-bold text-slate-900">{{ item.value }}</span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div v-if="description" class="space-y-4 bg-slate-50 rounded-3xl p-6 lg:p-8">
            <h2 class="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Комментарий продавца</h2>
            <p class="text-sm lg:text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {{ description }}
            </p>
          </div>

          <!-- Attributes Grid -->
          <div v-if="attributes.length" class="space-y-4">
            <h2 class="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Характеристики</h2>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="attr in attributes" 
                :key="attr.label"
                class="px-4 py-2 bg-white border border-slate-100 rounded-full shadow-sm"
              >
                <span class="text-[11px] font-bold text-slate-400 mr-2">{{ attr.label }}:</span>
                <span class="text-[11px] font-black text-slate-900">{{ attr.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Sticky Footer CTA -->
    <div class="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] z-[90] lg:hidden">
      <div class="flex items-center gap-4">
        <div class="flex-1 min-w-0">
          <div class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Цена сегодня</div>
          <div class="text-lg font-black text-slate-900 truncate">
            {{ hasPrice ? price : 'Уточняйте' }}
          </div>
        </div>
        <n-button 
          type="primary" 
          size="large" 
          class="!h-14 !px-8 !rounded-2xl !text-sm !font-bold shadow-lg shadow-blue-600/20"
          @click="emit('contact')"
        >
          <template #icon>
            <ChatBubbleLeftRightIcon class="w-5 h-5" />
          </template>
          Написать
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Smooth scroll for snap gallery */
.snap-x {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
</style>
