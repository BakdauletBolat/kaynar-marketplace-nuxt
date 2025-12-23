<script setup lang="ts">
import { isOpenSidebar, CardStorage } from "@/storages/storage";
import { useRoute, useRouter } from "vue-router";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import Logo from "@/assets/images/logo.png";
import { NImage, NIcon } from "naive-ui";
import {
  Search as SearchIcon,
  PersonOutline,
  HeartOutline,
  BagOutline,
  LocationOutline,
  WalletOutline,
  ChevronForward
} from "@vicons/ionicons5";
import { useCategoryStore } from "@/storages/category-storage";

const searchWord = ref("");
const router = useRouter();
const cardStorage = CardStorage.getInstance();
const isSearchFocused = ref(false);
const categoryStore = useCategoryStore();

// Load categories for suggestions
onMounted(() => {
  categoryStore.loadCategories();
});

const filteredCategories = computed(() => {
  if (!searchWord.value) return categoryStore.categories.slice(0, 8); // Top 8 by default
  const q = searchWord.value.toLowerCase();
  return categoryStore.categories.filter(c => c.name.toLowerCase().includes(q)).slice(0, 8);
});

function searchAndNavigateCatalog() {
  if (!searchWord.value) return;
  isSearchFocused.value = false;
  router.push({
    name: "catalog",
    query: {
      search: searchWord.value,
    },
  });
}

function selectCategory(cat: any) {
  isSearchFocused.value = false;
  searchWord.value = cat.name;
  router.push({
    name: "catalog",
    query: {
      category: String(cat.id), // Ensure string for consistency
    },
  });
}

function openSidebar() {
  isOpenSidebar.value = true;
}

function openCart() {
  router.push({ name: 'auth-cart' });
}
</script>

<template>
  <div class="hidden lg:block sticky top-0 z-40 font-sans">
    <!-- Top Tiny Bar (Service Links) -->
    <div class="bg-[#290e26] dark:bg-[#0d0d0e] text-white/80 text-xs py-1.5 border-b border-white/10">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
           <span class="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
             <n-icon :component="LocationOutline" />
             Алматы
           </span>
        </div>
        <div class="flex gap-6">
          <nuxt-link to="/delivery" class="hover:text-white transition-colors">Доставка</nuxt-link>
          <nuxt-link to="/pay" class="hover:text-white transition-colors">Способы оплаты</nuxt-link>
          <nuxt-link to="/refund" class="hover:text-white transition-colors">Возврат товара</nuxt-link>
          <nuxt-link to="/contacts" class="hover:text-white transition-colors">Контакты</nuxt-link>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="bg-gradient-to-r from-primary via-primary to-yellow-600 dark:from-dark-card dark:via-dark-card dark:to-dark-card text-white py-4 shadow-lg dark:shadow-none dark:border-b dark:border-white/5 relative">
      <div class="container mx-auto flex items-center justify-between gap-6 relative">
        
        <!-- Logo -->
        <nuxt-link :to="{ name: 'index' }" class="flex-shrink-0 flex items-center gap-2 group">
           <n-image preview-disabled class="w-10 h-10 rounded-lg bg-white p-0.5" alt="Logo" :src="Logo" />
           <div class="leading-none flex flex-col">
             <span class="font-black text-2xl tracking-tighter uppercase italic group-hover:scale-105 transition-transform">KAYNAR</span>
             <span class="text-[10px] font-medium tracking-widest opacity-80 uppercase">Marketplace</span>
           </div>
        </nuxt-link>

        <!-- Catalog Button -->
        <button 
          @click="openSidebar"
          class="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all duration-200 backdrop-blur-sm group"
        >
          <div class="relative w-6 h-6 flex flex-col justify-center gap-1.5 overflow-hidden">
             <span class="w-full h-0.5 bg-white rounded-full group-hover:w-3/4 transition-all"></span>
             <span class="w-full h-0.5 bg-white rounded-full"></span>
             <span class="w-full h-0.5 bg-white rounded-full group-hover:w-1/2 transition-all"></span>
          </div>
          <span class="font-bold text-lg tracking-wide">Каталог</span>
        </button>

        <!-- Search Bar -->
        <div class="flex-grow max-w-2xl relative z-50">
           <div
             class="relative flex items-center w-full rounded-3xl transition-all duration-300"
             :class="isSearchFocused ? 'bg-white dark:bg-dark-bg shadow-2xl rounded-b-none' : 'bg-white/20 hover:bg-white/30'"
           >
             <input
               v-model="searchWord"
               type="text"
               class="w-full bg-transparent py-3 px-6 pr-14 text-lg outline-none transition-colors placeholder:text-white/60"
               :class="isSearchFocused ? 'text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500' : 'text-white'"
               placeholder="Найти на Kaynar..."
               @focus="isSearchFocused = true"
               @blur="setTimeout(() => isSearchFocused = false, 200)"
               @keyup.enter="searchAndNavigateCatalog"
             />
             <button
               @click="searchAndNavigateCatalog"
               class="absolute right-2 p-2 rounded-full transition-colors"
               :class="isSearchFocused ? 'text-primary hover:bg-gray-100 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'"
             >
               <n-icon :component="SearchIcon" size="24" />
             </button>
           </div>

           <!-- Search Dropdown (Categories) -->
           <div
             v-if="isSearchFocused"
             class="absolute top-full left-0 w-full bg-white dark:bg-dark-bg shadow-xl rounded-b-3xl overflow-hidden border-t border-gray-100 dark:border-white/5 animate-in fade-in slide-in-from-top-1 duration-200"
           >
              <div class="py-2">
                 <div v-if="filteredCategories.length > 0">
                    <div
                      v-for="cat in filteredCategories"
                      :key="cat.id"
                      @click="selectCategory(cat)"
                      class="px-6 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center justify-between cursor-pointer group"
                    >
                       <span class="text-gray-700 dark:text-gray-200 font-medium group-hover:text-primary transition-colors">{{ cat.name }}</span>
                       <n-icon :component="ChevronForward" class="text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors" />
                    </div>
                 </div>
                 <div v-else class="px-6 py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                    Ничего не найдено
                 </div>
              </div>
           </div>
           <!-- Backdrop for focus -->
           <div v-if="isSearchFocused" class="fixed inset-0 bg-black/50 z-[-1] backdrop-blur-sm" @click="isSearchFocused = false"></div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-6">
          <nuxt-link :to="{ name: 'auth-profile' }" class="flex flex-col items-center gap-1 group opacity-90 hover:opacity-100 transition-opacity">
            <n-icon :component="PersonOutline" size="26" class="group-hover:-translate-y-1 transition-transform" />
            <span class="text-xs font-medium">Профиль</span>
          </nuxt-link>

          <nuxt-link :to="{ name: 'auth-favorites' }" class="flex flex-col items-center gap-1 group opacity-90 hover:opacity-100 transition-opacity">
            <n-icon :component="HeartOutline" size="26" class="group-hover:-translate-y-1 transition-transform" />
            <span class="text-xs font-medium">Избранное</span>
          </nuxt-link>

          <client-only>
            <button @click="openCart" class="flex flex-col items-center gap-1 group opacity-90 hover:opacity-100 transition-opacity relative">
               <div v-if="cardStorage.goods.value.length" class="absolute -top-1 right-1 bg-wb-red border-2 border-primary text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow-sm z-10">
                 {{ cardStorage.goods.value.length }}
               </div>
               <n-icon :component="BagOutline" size="26" class="group-hover:-translate-y-1 transition-transform" />
               <span class="text-xs font-medium">Корзина</span>
            </button>
          </client-only>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles are minimal now as we use Tailwind */
</style>