<script setup lang="ts">
import {isOpenCart} from "~/storages/storage";
import UserCard from "~/components/user-card.vue";
import AppHeader from '~/components/header.vue';
import AppFooter from '~/components/footer.vue';
import {NDrawer, NDrawerContent, NButton} from 'naive-ui';
</script>

<template>
  <n-drawer  v-model:show="isOpenCart">
    <n-drawer-content title="Ваша корзина" closable>
      <user-card></user-card>
      <n-button class="w-full" type="primary">Оформить заказ</n-button>
    </n-drawer-content>
  </n-drawer>
  <div class="relative min-h-full bg-slate-100">
    <app-header></app-header>
    <div class="bg-slate-100">
      <slot></slot>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<style scoped>

</style>