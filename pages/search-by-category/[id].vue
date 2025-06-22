<template>
  <div>
    <div
        class="z-[99] bg-white shadow sticky top-0 place-items-center w-full"
    >
      <div class="w-full h-[50px] flex items-center">
        <n-page-header
            class="w-full  container px-4 py-2 mx-auto"
            @back="router.back"
        >
          <template #title><span v-if="currentCategory" class="text-base">{{currentCategory.name}}</span></template>
        </n-page-header>
      </div>
    </div>
  </div>
  <div class="max-w-2xl mx-auto bg-white p-4">

    <!-- Если категория найдена, показываем ее имя как заголовок -->
    <div v-if="currentCategory">
      <!-- Используем наш компонент CategoryList для отображения ДОЧЕРНИХ элементов -->
      <CategoryList
          v-if="currentCategory.children && currentCategory.children.length > 0"
          :categories="currentCategory.children"
      />

      <!-- Если дочерних элементов нет - это конечная страница -->
      <div v-else class="text-gray-500">
        Это конечная категория. Здесь будет список товаров.
      </div>
    </div>

    <!-- Если категория по ID не найдена -->
    <div v-else class="text-red-500 font-bold">
      Категория не найдена!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {NButton, NIcon, NPageHeader} from 'naive-ui'
import { ArrowBackOutline } from '@vicons/ionicons5'

// Наш компонент для отображения списка
import CategoryList from '@/components/category-list.vue'
// Типы и данные
import type { Category } from '@/api/interfaces'
import {FunnelIcon} from "@heroicons/vue/20/solid";

const categoryStore = useCategoryStore()

const route = useRoute()
const router = useRouter()

const currentCategory = ref<Category | null>(null)

// Рекурсивная функция для поиска категории по ID во всем дереве данных
const findCategoryById = (id: number, categories: Category[]): Category | null => {
  for (const category of categories) {
    if (category.id === id) {
      return category
    }
    if (category.children.length > 0) {
      const found = findCategoryById(id, category.children)
      if (found) return found
    }
  }
  return null
}

// watchEffect будет автоматически перезапускаться при изменении route.params.id
watchEffect(() => {
  const categoryId = Number(route.params.id)
  if (categoryId) {
    // Имитируем поиск данных для этой страницы
    currentCategory.value = findCategoryById(categoryId, categoryStore.categoriesTree)
  }
})

onMounted(() => {
  if (!categoryStore.categoriesTree) {
    categoryStore.loadCategoriesTree();
  }
})
</script>