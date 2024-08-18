<script setup lang="ts">
import {CardStorage, isOpenCart, isOpenSidebar} from '@/storages/storage';
import {useRoute, useRouter} from 'vue-router';
import {Bars3Icon} from "@heroicons/vue/24/outline";
import Logo from '@/assets/images/logo.png';
import {NInput, NIcon, NImage} from 'naive-ui';
import {Search, PersonOutline, HeartOutline, BagOutline} from '@vicons/ionicons5';

const cardStorage = CardStorage.getInstance();

const router = useRouter();
const navigation = [
  {name: 'Автозапчасти', to: 'index'},
  {name: 'Колеса и шины', to: 'services'},
  {name: 'Запрос детали', to: 'services'},
  {name: 'Купить онлайн', to: 'services'},
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
  <div class="w-full z-[9999]">
    <div class="w-full bg-black z-[9999] lg:border-b border-b-slate-100 ">
      <div class="mx-auto justify-between bg-black items-center text-white flex container px-4 p-2">
        <div class="flex items-center gap-5">
          <nuxt-link class="flex gap-5" :to="{
            name: 'index'
          }">
            <div>
              <n-image preview-disabled class="w-12 h-12" alt="Лого" :src="Logo"/>
            </div>
          </nuxt-link>
          <n-input round type="text" size="large" placeholder="Искать">
            <template #prefix>
              <n-icon :component="Search" />
            </template>
          </n-input>
        </div>
        <div class="flex gap-3">
          <div class="cursor-pointer hidden lg:block">
            <PersonOutline class="w-6 h-6"></PersonOutline>
          </div>
          <div class="cursor-pointer hidden lg:block">
            <HeartOutline class="w-6 h-6"></HeartOutline>
          </div>
          <div class="cursor-pointer hidden lg:block" @click="openCart">
            <BagOutline class="w-6 h-6"></BagOutline>
          </div>
          <div @click="openSidebar" class="cursor-pointer">
            <Bars3Icon class="w-6 h-6"></Bars3Icon>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white hidden lg:block w-full">
      <div class="mx-auto container px-4">
        <div class="flex p-2 items-center justify-between">
          <div class="flex items-baseline">
            <nuxt-link v-for="item in navigation" :key="item.name" :to="{ name: item.to }"
                        :class="[item.to == route.name ? 'underline underline-offset-2' : 'hover:black', 'rounded-sm px-3 py-2 text-sm']"
                        :aria-current="item.to == route.name ? 'page' : undefined">
              {{ item.name }}
            </nuxt-link>
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
</template>

<style scoped></style>