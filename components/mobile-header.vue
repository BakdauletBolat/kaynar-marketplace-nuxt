<script setup lang="ts">
import { isOpenSidebar } from "~/storages/storage";
import { Search, ChevronForward } from "@vicons/ionicons5";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { NIcon } from "naive-ui";
import { useCategoryStore } from "@/storages/category-storage";

const router = useRouter();
const searchWord = ref("");
const categoryStore = useCategoryStore();
const isFocused = ref(false);

onMounted(() => {
  categoryStore.loadCategories();
});

const filteredCategories = computed(() => {
  if (!searchWord.value) return categoryStore.categories.slice(0, 5);
  const q = searchWord.value.toLowerCase();
  return categoryStore.categories.filter(c => c.name.toLowerCase().includes(q)).slice(0, 5);
});

function onSearch() {
  if (!searchWord.value) return;
  isFocused.value = false;
  router.push({
    name: "catalog",
    query: {
      search: searchWord.value,
    },
  });
}

function selectCategory(cat: any) {
  isFocused.value = false;
  searchWord.value = cat.name;
  router.push({
    name: "catalog",
    query: {
      category: String(cat.id),
    },
  });
}
</script>

<template>
  <header class="lg:hidden sticky top-0 z-40 bg-gradient-to-r from-primary to-yellow-600 shadow-md pb-2 pt-2 px-3">
    <div class="flex items-center gap-3 relative z-50">
      <!-- Search Input (Takes most space) -->
      <div class="flex-grow relative">
        <div class="relative flex items-center w-full bg-white rounded-xl overflow-hidden h-10 shadow-sm z-50">
           <div class="pl-3 text-gray-400">
             <n-icon :component="Search" size="20" />
           </div>
           <input 
             v-model="searchWord"
             type="text"
             class="w-full h-full px-2 text-sm text-black placeholder-gray-400 outline-none"
             placeholder="Поиск на Kaynar"
             @focus="isFocused = true"
             @blur="setTimeout(() => isFocused = false, 200)"
             @keyup.enter="onSearch"
           />
        </div>

        <!-- Mobile Dropdown -->
        <div 
           v-if="isFocused"
           class="absolute top-10 left-0 w-full bg-white rounded-b-xl shadow-xl border-t border-gray-100 overflow-hidden z-40"
        >
            <div v-if="filteredCategories.length > 0">
              <div 
                v-for="cat in filteredCategories" 
                :key="cat.id"
                @click="selectCategory(cat)"
                class="px-4 py-3 border-b border-gray-50 last:border-0 flex items-center justify-between active:bg-gray-100"
              >
                  <span class="text-sm text-gray-700">{{ cat.name }}</span>
                  <n-icon :component="ChevronForward" class="text-gray-300" />
              </div>
            </div>
             <div v-else class="px-4 py-3 text-center text-xs text-gray-500">
                Ничего не найдено
             </div>
        </div>
      </div>

      <!-- Notification / Menu (Optional actions) -->
      <button 
        @click="isOpenSidebar = true"
        class="text-white p-1 hover:bg-white/10 rounded-full transition-colors"
      >
         <Bars3Icon class="w-7 h-7" />
      </button>
    </div>
    
    <!-- Backdrop -->
    <div v-if="isFocused" class="fixed inset-0 bg-black/50 z-30" @click="isFocused = false"></div>
  </header>
</template>