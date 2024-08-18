<script lang="ts" setup>
import {useCategoryStore} from '@/storages/category-storage';
import {NImage, NCard} from 'naive-ui';

const categoryStore = useCategoryStore();

onMounted(()=>{
  categoryStore.loadCategoriesTree()
})

</script>
<template>
  <div class="grid grid-cols-4 gap-3">
    <n-card class="rounded-lg" v-for="category in categoryStore.categoriesTree">
      <n-image :src="category.name" :alt="category.name"></n-image>
      <div class="text-center font-medium ">{{category.name}}</div>
    </n-card>
  </div>
</template>
<style></style>