<template>
  <div>
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