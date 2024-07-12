<script setup lang="ts">
import {CardStorage, isOpenCart, isOpenSidebar} from '@/storages/storage';
import { useRoute, useRouter } from 'vue-router';
import {UserIcon, HeartIcon, Bars3Icon} from "@heroicons/vue/24/outline";
import Logo from '@/assets/images/logo.png';
import ShoppingCartIcon from "~/components/Icons/ShoppingCartIcon.vue";


const cardStorage = CardStorage.getInstance();

const router = useRouter();
const navigation = [
    { name: 'Автозапчасти', to: 'index' },
    { name: 'Колеса и шины', to: 'services' },
    { name: 'Запрос детали', to: 'services' },
  { name: 'Купить онлайн', to: 'services' },
]


function navigateToOrder() {
    cardStorage.isActive.value = false;
    router.push({
        name: 'order-create'
    })
}

function openSidebar() {
  isOpenSidebar.value = true;
}

function openCart() {
  isOpenCart.value = true;
}


const route = useRoute();

</script>

<template>
  <div class="fixed top-0 w-full z-[9999]">
    <div class="w-full bg-black z-[9999] lg:border-b border-b-slate-100 ">
      <div class="mx-auto justify-between bg-black items-center text-white flex max-w-7xl p-2">
        <div class="flex items-center gap-5">
          <NuxtLink class="flex gap-5" :to="{
            name: 'index'
          }">
            <div>
              <img class="w-[40px] h-[40px] md:w-[60px] md:h-[60px]" alt="Лого" :src="Logo" />
            </div>
<!--            <div class="text-lg"><span class="font-bold">Kaynar</span> Avto</div>-->
          </NuxtLink>
          <SearchInput></SearchInput>
        </div>
        <div class="flex gap-2">
          <div class="p-2 cursor-pointer hidden lg:block">
            <UserIcon class="w-6 h-6"></UserIcon>
          </div>
          <div class="p-2 cursor-pointer hidden lg:block">
            <HeartIcon class="w-6 h-6"></HeartIcon>
          </div>
          <div @click="openCart" class="p-2">
            <ShoppingCartIcon width="24" height="24" color="white"></ShoppingCartIcon>
          </div>
          <div @click="openSidebar" class="cursor-pointer p-2">
            <Bars3Icon class="w-6 h-6"></Bars3Icon>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white hidden lg:block w-full">
      <div class="mx-auto max-w-7xl">
        <div class="flex p-2 items-center justify-between">
          <div class="flex items-baseline">
            <RouterLink v-for="item in navigation" :key="item.name" :to="{ name: item.to }"
                        :class="[item.to == route.name ? 'underline underline-offset-2' : 'hover:black', 'rounded-sm px-3 py-2 text-sm']"
                        :aria-current="item.to == route.name ? 'page' : undefined">
              {{ item.name }}
            </RouterLink>
          </div>
          <ul class="flex gap-2 text-xs cursor-pointer">
            <li class="hover:underline">Доставка</li>
            <li class="hover:underline">Возврат</li>
            <li class="hover:underline">Оплата</li>
            <li class="hover:underline">Контакты</li>
            <li class="hover:underline">Продавайте</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="h-[76px] lg:h-[131px]"></div>
</template>

<style scoped></style>