<script setup lang="ts">
import {CardStorage, isOpenSidebar} from '@/storages/storage';
import { useRoute, useRouter } from 'vue-router';
import Dialog from './Dialog';
import {UserIcon, HeartIcon, Bars3Icon} from "@heroicons/vue/24/outline";
import UserCard from '@/components/UserCard.vue';
import Logo from '@/assets/images/logo.png';

const {$locally} = useNuxtApp();

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
  console.log('open', isOpenSidebar.value)
  isOpenSidebar.value = true;
}


const route = useRoute();

</script>

<template>
  <div>
    <Dialog title="Ваша корзина" v-model="cardStorage.isActive.value">
      <UserCard></UserCard>
      <button @click="navigateToOrder" class="mt-3 bg-primary w-full block p-3 text-center rounded-sm">Оформить заказ</button>
    </Dialog>
  </div>
  <div class="fixed top-0 w-full z-[9999]">
    <div class="w-full bg-black z-[9999] lg:border-b border-b-slate-100 ">
      <div class="mx-auto justify-between bg-black items-center text-white flex max-w-7xl px-6 py-4">
        <div class="flex items-center gap-5">
          <NuxtLink class="flex gap-5" :to="{
            name: 'index'
          }">
            <div>
              <img class="w-[60px] h-[60px]" alt="Лого" :src="Logo" />
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
          <div class="p-2">
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
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