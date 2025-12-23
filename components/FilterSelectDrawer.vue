<template>
  <n-drawer
    v-model:show="isOpen"
    :width="isMobile ? '100%' : 480"
    :placement="isMobile ? 'bottom' : 'right'"
    :height="isMobile ? '90%' : undefined"
    class="filter-select-drawer"
  >
    <n-drawer-content :title="title" :native-scrollbar="false">
      <!-- Search input -->
      <div class="filter-select-drawer__search">
        <n-input
          v-model:value="searchQuery"
          placeholder="Поиск"
          clearable
          size="large"
        >
          <template #prefix>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 16L12.65 12.65" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </n-input>
      </div>

      <!-- Selected count -->
      <div v-if="selectedCount > 0" class="filter-select-drawer__selected">
        Выбрано: {{ selectedCount }}
      </div>

      <!-- Virtual list -->
      <div class="filter-select-drawer__list">
        <n-virtual-list
          v-if="virtualListItems.length > 0"
          :items="virtualListItems"
          :item-size="52"
          key-field="key"
          class="filter-select-drawer__virtual-list"
        >
          <template #default="{ item }">
            <div :key="item.key">
              <!-- Group header -->
              <div v-if="item.type === 'group'" class="filter-select-drawer__group-title">
                {{ item.groupTitle }}
              </div>

              <!-- List item -->
              <label v-else class="filter-select-drawer__item">
                <n-checkbox
                  :checked="isSelected(item.value!)"
                  @update:checked="(checked: boolean) => toggleItem(item.value!, checked)"
                  size="large"
                >
                  <div class="filter-select-drawer__item-content">
                    <span class="filter-select-drawer__item-label">{{ item.label }}</span>
                    <span v-if="item.count != null" class="filter-select-drawer__item-count">
                      {{ item.count }}
                    </span>
                  </div>
                </n-checkbox>
              </label>
            </div>
          </template>
        </n-virtual-list>

        <div v-else class="filter-select-drawer__empty">
          Ничего не найдено
        </div>
      </div>

      <!-- Footer actions -->
      <template #footer>
        <div class="filter-select-drawer__footer">
          <n-button
            type="primary"
            size="large"
            block
            :disabled="selectedCount === 0"
            @click="handleConfirm"
          >
            Готово
          </n-button>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { NDrawer, NDrawerContent, NInput, NCheckbox, NButton, NVirtualList } from 'naive-ui';
import { useFilterChips } from '@/composables/useFilterChips';
import type { FilterChipOption } from '@/composables/useFilterChips';

interface VirtualListItem {
  type: 'group' | 'item';
  key: string;
  label?: string;
  value?: string | number;
  count?: number;
  groupTitle?: string;
}

interface Props {
  show: boolean;
  title: string;
  items: FilterChipOption[];
  modelValue: (string | number)[];
  enableGrouping?: boolean;
  multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  enableGrouping: true,
  multiple: true
});

const emit = defineEmits<{
  'update:show': [value: boolean];
  'update:modelValue': [value: (string | number)[]];
  'confirm': [value: (string | number)[]];
}>();

const { filterBySearch, groupByAlphabet } = useFilterChips();

const isOpen = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
});

const searchQuery = ref('');
const isMobile = ref(false);

// Temporary selection state (before confirmation)
const tempSelection = ref<(string | number)[]>([...props.modelValue]);

// Reset temp selection when drawer opens
watch(() => props.show, (newShow) => {
  if (newShow) {
    tempSelection.value = [...props.modelValue];
    searchQuery.value = '';
  }
});

// Check window size for mobile detection
if (typeof window !== 'undefined') {
  isMobile.value = window.innerWidth < 1024;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 1024;
  });
}

const filteredItems = computed(() => {
  return filterBySearch(props.items, searchQuery.value);
});

const groupedItems = computed(() => {
  if (!props.enableGrouping) {
    return new Map([['Все', filteredItems.value]]);
  }
  return groupByAlphabet(filteredItems.value);
});

// Flatten grouped items for virtual list
const virtualListItems = computed<VirtualListItem[]>(() => {
  const result: VirtualListItem[] = [];

  for (const [groupTitle, items] of groupedItems.value) {
    // Add group header
    result.push({
      type: 'group',
      key: `group-${groupTitle}`,
      groupTitle
    });

    // Add group items
    items.forEach(item => {
      result.push({
        type: 'item',
        key: `item-${item.value}`,
        label: item.label,
        value: item.value,
        count: item.count
      });
    });
  }

  return result;
});

const selectedCount = computed(() => tempSelection.value.length);

const isSelected = (value: string | number): boolean => {
  return tempSelection.value.includes(value);
};

const toggleItem = (value: string | number, checked: boolean) => {
  if (!props.multiple) {
    // Single selection mode
    if (checked) {
      tempSelection.value = [value];
    } else {
      tempSelection.value = [];
    }
  } else {
    // Multiple selection mode
    if (checked) {
      if (!tempSelection.value.includes(value)) {
        tempSelection.value = [...tempSelection.value, value];
      }
    } else {
      tempSelection.value = tempSelection.value.filter(v => v !== value);
    }
  }
};

const handleConfirm = () => {
  emit('update:modelValue', tempSelection.value);
  emit('confirm', tempSelection.value);
  isOpen.value = false;
};
</script>

<style scoped>
.filter-select-drawer__search {
  @apply sticky top-0 z-10 pb-3;
  @apply bg-white dark:bg-dark-card;
  @apply border-b border-slate-100 dark:border-white/5;
  margin: -16px -16px 0;
  padding: 16px 16px 12px;
}

.filter-select-drawer__selected {
  @apply text-sm font-medium py-3;
  @apply text-slate-700 dark:text-slate-300;
}

.filter-select-drawer__list {
  @apply flex flex-col;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.filter-select-drawer__virtual-list {
  height: calc(100vh - 250px);
  min-height: 300px;
}

.filter-select-drawer__group-title {
  @apply text-xs font-semibold uppercase tracking-wider;
  @apply text-slate-400 dark:text-slate-500;
  @apply sticky top-0 z-10 py-2 px-3 -mx-3;
  @apply bg-slate-50 dark:bg-white/5;
}

.filter-select-drawer__item {
  @apply flex items-center cursor-pointer;
  @apply py-3 px-3 -mx-3;
  @apply hover:bg-slate-50 dark:hover:bg-white/5;
  @apply active:bg-slate-100 dark:active:bg-white/10;
  @apply transition-colors rounded-lg;
  min-height: 52px;
  -webkit-tap-highlight-color: transparent;
}

.filter-select-drawer__item-content {
  @apply flex items-center justify-between flex-1 ml-2;
}

.filter-select-drawer__item-label {
  @apply text-sm font-medium;
  @apply text-slate-900 dark:text-white;
}

.filter-select-drawer__item-count {
  @apply text-xs;
  @apply text-slate-500 dark:text-slate-400;
}

.filter-select-drawer__empty {
  @apply text-center py-8;
  @apply text-slate-500 dark:text-slate-400;
}

.filter-select-drawer__footer {
  @apply sticky bottom-0 pt-3;
  @apply bg-white dark:bg-dark-card;
  @apply border-t border-slate-100 dark:border-white/5;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}
</style>
