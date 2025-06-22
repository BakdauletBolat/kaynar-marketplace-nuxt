<template>
  <div>
    <div
        class="z-[99] bg-white shadow sticky top-0 place-items-center w-full"
    >
      <div class="w-full h-[50px] flex items-center">
        <n-page-header
            class="w-full  container px-4 py-2 mx-auto"
        >
          <template #title><span class="text-base">Запчасти</span></template>
        </n-page-header>
      </div>
    </div>
  </div>
  <div class="max-w-2xl mx-auto bg-white p-4">
      <CategoryList
          v-if="categoryStore.categoriesTree"
          :categories="categoryStore.categoriesTree"
      />
  </div>
</template>

<script setup lang="ts">
import CategoryList from '@/components/category-list.vue'
import {NPageHeader} from "naive-ui";
const categoryStore = useCategoryStore()


onMounted(() => {
  if (categoryStore.categoriesTree.length <= 0) {
    categoryStore.loadCategoriesTree();
  }
})
</script>