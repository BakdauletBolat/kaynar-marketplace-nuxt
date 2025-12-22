<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4 w-full">
    <ProductCard :item="item" v-for="item in items" :key="item.id"></ProductCard>
  </div>
</template>
<script lang="ts" setup>
import { type ProductList } from '@/api/products';
import ProductCard from '@/components/ProductCard.vue';
defineProps<{
  items: ProductList[]
}>()
</script>