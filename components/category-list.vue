<!-- src/components/CategoryList.vue -->
<template>
  <div class="w-full space-y-4"> <!-- Увеличил отступ для поля поиска -->
    <!-- Поле для поиска теперь является частью этого компонента -->
    <n-input
        v-model:value="searchQuery"
        placeholder="Поиск..."
        clearable
    />

    <!-- Отображаем список, если он не пустой -->
    <div v-if="filteredCategories.length > 0" class="w-full space-y-2">
      <!-- Перебираем уже ОТФИЛЬТРОВАННЫЕ категории -->
      <div v-for="category in filteredCategories" :key="category.id">
        <div
            @click="goTo(category)"
            class="flex items-center justify-between w-full p-3 bg-white border rounded-md cursor-pointer hover:border-primary transition-all duration-200"
        >
          <span class="font-medium text-gray-700">{{ category.name }}</span>
          <n-icon :component="ChevronForwardOutline" class="text-gray-500" />
        </div>
      </div>
    </div>

    <!-- Показываем сообщение, если ничего не найдено -->
    <n-empty v-else description="Ничего не найдено" />

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NIcon, NInput, NEmpty } from 'naive-ui'
import { ChevronForwardOutline } from '@vicons/ionicons5'
import type { Category } from '@/api/interfaces'

// Props остаются такими же
const props = defineProps<{
  categories: Category[]
}>()

const router = useRouter()

// --- Новая логика поиска ---

// 1. Состояние для поискового запроса
const searchQuery = ref('');

// 2. Computed-свойство, которое фильтрует props.categories
const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    // Если поиск пуст, возвращаем все категории из props
    return props.categories
  }

  const lowerCaseQuery = searchQuery.value.toLowerCase()

  return props.categories.filter(category =>
      category.name.toLowerCase().includes(lowerCaseQuery)
  )
})
// --- Конец новой логики ---

const goTo = (category: Category) => {
  if (category.children.length == 0) {
    router.push({
      name: "catalog",
      query: {
        category: category.id
      }
    })
    return;
  }
  router.push(`/search-by-category/${category.id}`)
}
</script>