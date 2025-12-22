<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div 
        v-if="show" 
        class="fixed inset-0 z-[100] bg-white dark:bg-dark-bg flex flex-col"
      >
        <!-- Header -->
        <div class="px-4 py-3 flex items-center gap-3 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-dark-bg shadow-sm">
          <button @click="$emit('close')" class="p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          
          <div class="flex-1 relative">
             <input 
                ref="searchInput"
                v-model="searchQuery"
                type="text" 
                placeholder="Поиск по категориям..." 
                class="w-full h-10 bg-gray-100 dark:bg-white/5 border-none rounded-xl px-4 pl-10 text-sm font-medium focus:ring-2 focus:ring-primary/20 dark:text-white"
             />
             <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
             </div>
             <button 
                v-if="searchQuery" 
                @click="searchQuery = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
             </button>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-4">
           <div v-if="filteredCategories.length > 0" class="grid grid-cols-1 gap-2">
              <div 
                v-for="cat in filteredCategories" 
                :key="cat.id"
                @click="selectCategory(cat)"
                class="p-4 rounded-xl bg-gray-50 dark:bg-white/5 active:bg-gray-100 dark:active:bg-white/10 flex items-center justify-between cursor-pointer"
              >
                 <span class="font-medium text-light-text-main dark:text-dark-text-main">{{ cat.name }}</span>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                 </svg>
              </div>
           </div>
           
           <!-- Empty State -->
           <div v-else class="flex flex-col items-center justify-center h-64 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mb-4 opacity-50">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <p>Ничего не найдено</p>
           </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useCategoryStore } from '~/storages/category-storage';

const props = defineProps<{
  show: boolean
}>();

const emit = defineEmits(['close']);

const categoryStore = useCategoryStore();
const searchQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null);
const router = useRouter();

// Focus input when shown
watch(() => props.show, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInput.value?.focus();
    });
    // Ensure categories are loaded
    if (categoryStore.categories.length === 0) {
      categoryStore.loadCategories();
    }
  }
});

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categoryStore.categories.slice(0, 20); // Show top 20 initially
  const q = searchQuery.value.toLowerCase();
  return categoryStore.categories.filter(c => c.name.toLowerCase().includes(q));
});

function selectCategory(cat: any) {
  router.push({
    name: 'catalog',
    query: { category: cat.id } // Assuming simplified filter logic or adapting to what SearchBlock did
  });
  emit('close');
}
</script>
