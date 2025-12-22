<script lang="ts" setup>
import { useManufacturerStore } from '@/storages/manufacturer-store';
import { useRouter } from 'vue-router';

const manufacturerStore = useManufacturerStore();
const router = useRouter();

onMounted(() => {
  manufacturerStore.loadManufacturers();
});

// We will use the "Popular" list + a "View All" link/button logic if needed.
// But for now, let's display popular ones prominently and the rest in a list or just the grouped list but styled better.
// The user asked for "display brands more beautifully".
// A grid of branded cards (even just text) is better than a text list.

</script>

<template>
  <div class="w-full">
    <!-- Popular Brands Grid -->
    <div v-if="manufacturerStore.popularManufacturers.length > 0" class="mb-8">
      <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Популярные</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <nuxt-link
          v-for="brand in manufacturerStore.popularManufacturers"
          :key="brand.id"
          :to="{ name: 'catalog-manufacturerId', params: { manufacturerId: brand.id } }"
          class="flex items-center justify-center h-16 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent hover:border-primary/50 hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all duration-200"
        >
          <span class="font-bold text-lg text-gray-700 dark:text-gray-200">{{ brand.name }}</span>
        </nuxt-link>
      </div>
    </div>

    <!-- Alphabetical List (Styled as Chips/Grid) -->
    <div class="space-y-6">
       <div v-for="(manufacturers, letter) in manufacturerStore.manufacturersByLetterGrouping" :key="letter">
          <h4 class="text-lg font-bold text-primary mb-3 sticky top-16 bg-white dark:bg-dark-card py-2 z-10">{{ letter }}</h4>
          <div class="flex flex-wrap gap-2">
             <nuxt-link
                v-for="brand in manufacturers"
                :key="brand.id"
                :to="{ name: 'catalog-manufacturerId', params: { manufacturerId: brand.id } }"
                class="px-3 py-1.5 text-sm bg-gray-100 dark:bg-white/5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
             >
                {{ brand.name }}
             </nuxt-link>
          </div>
       </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar for horizontal scrolling if we needed it, but we use wrap here */
</style>
