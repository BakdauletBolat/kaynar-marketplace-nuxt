<script setup lang="ts">
import { isOpenSidebar } from "~/storages/storage";
import { Search, ChevronForward, Close } from "@vicons/ionicons5";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { NIcon } from "naive-ui";
import { useCategoryStore } from "@/storages/category-storage";
import Logo from "@/assets/images/logo.png";

const router = useRouter();
const searchWord = ref("");
const categoryStore = useCategoryStore();
const isFocused = ref(false);

onMounted(() => {
  categoryStore.loadCategories();
});

const filteredCategories = computed(() => {
  if (!searchWord.value) return categoryStore.categories.slice(0, 6);
  const q = searchWord.value.toLowerCase();
  return categoryStore.categories.filter(c => c.name.toLowerCase().includes(q)).slice(0, 6);
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

function clearSearch() {
  searchWord.value = "";
}
</script>

<template>
  <header class="lg:hidden sticky top-0 z-40">
    <!-- Main Header Bar -->
    <div class="bg-primary dark:bg-dark-card px-4 py-3 safe-area-top">
      <div class="flex items-center gap-3">
        <!-- Logo -->
        <nuxt-link :to="{ name: 'index' }" class="flex-shrink-0">
          <img :src="Logo" alt="Kaynar" class="w-9 h-9 rounded-lg bg-white p-0.5" />
        </nuxt-link>

        <!-- Search Bar -->
        <div class="flex-grow relative">
          <div
            class="flex items-center w-full bg-white dark:bg-white/10 rounded-xl h-11 transition-all"
            :class="{ 'ring-2 ring-white/50': isFocused }"
          >
            <div class="pl-3.5 text-gray-400 dark:text-white/60">
              <n-icon :component="Search" size="20" />
            </div>
            <input
              v-model="searchWord"
              type="text"
              class="w-full h-full px-3 text-base bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/50"
              placeholder="Поиск запчастей..."
              @focus="isFocused = true"
              @blur="window.setTimeout(() => isFocused = false, 200)"
              @keyup.enter="onSearch"
            />
            <button
              v-if="searchWord"
              @click="clearSearch"
              class="pr-3 text-gray-400 dark:text-white/60"
            >
              <n-icon :component="Close" size="18" />
            </button>
          </div>
        </div>

        <!-- Menu Button -->
        <button
          @click="isOpenSidebar = true"
          class="flex-shrink-0 w-11 h-11 flex items-center justify-center text-white bg-white/20 dark:bg-white/10 rounded-xl active:scale-95 transition-transform"
        >
          <Bars3Icon class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Search Overlay -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isFocused"
          class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          @click="isFocused = false"
        />
      </Transition>

      <Transition name="slide-down">
        <div
          v-if="isFocused"
          class="fixed top-0 left-0 right-0 z-[101] bg-white dark:bg-dark-card shadow-2xl safe-area-top"
        >
          <!-- Search Input in Overlay -->
          <div class="px-4 py-3 border-b border-gray-100 dark:border-white/5">
            <div class="flex items-center gap-3">
              <button
                @click="isFocused = false"
                class="text-gray-500 dark:text-gray-400"
              >
                <n-icon :component="Close" size="24" />
              </button>
              <div class="flex-grow flex items-center bg-gray-100 dark:bg-white/10 rounded-xl h-11 px-4">
                <n-icon :component="Search" size="20" class="text-gray-400 dark:text-white/60 mr-2" />
                <input
                  v-model="searchWord"
                  type="text"
                  class="w-full h-full text-base bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
                  placeholder="Поиск запчастей..."
                  @keyup.enter="onSearch"
                  autofocus
                />
                <button
                  v-if="searchWord"
                  @click="clearSearch"
                  class="text-gray-400"
                >
                  <n-icon :component="Close" size="18" />
                </button>
              </div>
            </div>
          </div>

          <!-- Quick Categories -->
          <div class="max-h-[60vh] overflow-y-auto">
            <div class="px-4 py-2">
              <div class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                {{ searchWord ? 'Результаты' : 'Популярные категории' }}
              </div>
            </div>

            <div v-if="filteredCategories.length > 0">
              <button
                v-for="cat in filteredCategories"
                :key="cat.id"
                @click="selectCategory(cat)"
                class="w-full px-4 py-3.5 flex items-center justify-between active:bg-gray-50 dark:active:bg-white/5 transition-colors"
              >
                <span class="text-sm font-medium text-gray-800 dark:text-white">{{ cat.name }}</span>
                <n-icon :component="ChevronForward" class="text-gray-300 dark:text-gray-600" size="18" />
              </button>
            </div>

            <div v-else class="px-4 py-8 text-center">
              <div class="text-4xl mb-2">🔍</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">Ничего не найдено</div>
            </div>

            <!-- Search Button -->
            <div v-if="searchWord" class="p-4 border-t border-gray-100 dark:border-white/5">
              <button
                @click="onSearch"
                class="w-full py-3.5 bg-primary text-white font-bold rounded-xl active:scale-[0.98] transition-transform"
              >
                Найти "{{ searchWord }}"
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.safe-area-top {
  padding-top: max(12px, env(safe-area-inset-top));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.25s ease, opacity 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
