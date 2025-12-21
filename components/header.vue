<script setup lang="ts">
import { isOpenSidebar, CardStorage } from "@/storages/storage";
import {useRoute, useRouter} from "vue-router";
import {Bars3Icon} from "@heroicons/vue/24/outline";
import Logo from "@/assets/images/logo.png";
import { NInput, NIcon, NImage } from "naive-ui";
import {
  Search,
  PersonOutline,
  HeartOutline,
  BagOutline,
} from "@vicons/ionicons5";

const searchWord = ref();
const router = useRouter();
const cardStorage = CardStorage.getInstance();

const navigation = [
  {name: "Автозапчасти", to: "index"},
  {name: "Колеса и шины", to: "catalog-kolesa-and-shin"},
  {name: "Купить онлайн", to: "pay"},
  {name: "Помощь", to: 'feadback'}
];

function searchAndNavigateCatalog() {
  router.push({
    name: "catalog",
    query: {
      search: searchWord.value,
    },
  });
}

function openSidebar() {
  isOpenSidebar.value = true;
}

function openCart() {
  router.push({
    name: 'auth-cart'
  })
}

const route = useRoute();

const homeRoutes = ['index', 'catalog', 'catalog-manufacturerId'];
function isNavActive(routeName: string) {
  const currentName = String(route.name ?? '');
  if (routeName === 'index') return homeRoutes.includes(currentName);
  return currentName === routeName;
}
</script>

<template>
  <div class="hidden lg:block sticky top-0 z-30">
    <section class="w-full bg-slate-950 text-white border-b border-slate-800">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div class="flex items-center gap-4 min-w-0">
          <nuxt-link :to="{ name: 'index' }" class="flex items-center gap-3 shrink-0">
            <n-image preview-disabled class="w-11 h-11 rounded-lg" alt="Лого" :src="Logo" />
            <div class="leading-tight">
              <div class="text-base font-semibold">Kaynar Avto</div>
              <div class="text-xs text-slate-300">Б/у автозапчасти онлайн</div>
            </div>
          </nuxt-link>

          <div class="min-w-0 w-[520px] max-w-[42vw]">
            <n-input-group>
              <n-input
                v-model:value="searchWord"
                round
                type="text"
                size="large"
                placeholder="Поиск по названию или коду"
                @keyup.enter="searchAndNavigateCatalog"
              />
              <n-button
                @click="searchAndNavigateCatalog"
                size="large"
                round
                type="primary"
              >
                <n-icon :component="Search" />
              </n-button>
            </n-input-group>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <nuxt-link
            :to="{ name: 'auth-profile' }"
            class="header-action"
            aria-label="Профиль"
          >
            <PersonOutline class="w-6 h-6" />
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'auth-favorites' }"
            class="header-action"
            aria-label="Избранные"
          >
            <HeartOutline class="w-6 h-6" />
          </nuxt-link>

          <client-only>
            <button type="button" class="header-action" aria-label="Корзина" @click="openCart">
              <n-badge :value="cardStorage.goods.value.length" :max="10">
                <BagOutline class="w-6 h-6" />
              </n-badge>
            </button>
          </client-only>

          <button type="button" class="header-action" aria-label="Меню" @click="openSidebar">
            <Bars3Icon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>

    <section class="bg-white border-b border-slate-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between gap-6 py-2">
          <nav class="flex flex-wrap items-center gap-1">
            <nuxt-link
              v-for="item in navigation"
              :key="item.name"
              :to="{ name: item.to }"
              :class="[
                isNavActive(String(item.to))
                  ? 'bg-primary text-black'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                'rounded-full px-3 py-2 text-sm font-medium transition-colors',
              ]"
              :aria-current="isNavActive(String(item.to)) ? 'page' : undefined"
            >
              {{ item.name }}
            </nuxt-link>
          </nav>

          <ul class="flex items-center gap-4 text-xs text-slate-600">
            <nuxt-link :to="{ name: 'delivery' }" class="hover:text-slate-900 hover:underline">
              Доставка
            </nuxt-link>
            <nuxt-link :to="{ name: 'refund' }" class="hover:text-slate-900 hover:underline">
              Возврат
            </nuxt-link>
            <nuxt-link :to="{ name: 'pay' }" class="hover:text-slate-900 hover:underline">
              Оплата
            </nuxt-link>
            <nuxt-link :to="{ name: 'contacts' }" class="hover:text-slate-900 hover:underline">
              Контакты
            </nuxt-link>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.header-action {
  @apply inline-flex items-center justify-center rounded-full p-2 text-white/90
         hover:bg-white/10 hover:text-white transition-colors
         focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950;
}
</style>
