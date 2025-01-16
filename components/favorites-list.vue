<template>
  <div class="grid lg:grid-cols-2 w-full gap-3">
    <card :item="item" v-for="item in items"></card>
  </div>
</template>
<script lang="ts" setup>
import {type ProductList} from '@/api/products';
import Card from '@/components/card.vue';
defineProps<{
  items: ProductList[]
}>()
</script>