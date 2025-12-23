<template>
  <div class="filter-chips">
    <div class="filter-chips__header" v-if="title">
      <div class="filter-chips__title">{{ title }}</div>
    </div>

    <div class="filter-chips__grid">
      <button
        v-for="item in displayItems"
        :key="item.value"
        type="button"
        class="filter-chip"
        :class="{ 'filter-chip--active': isSelected(item.value) }"
        @click="toggleSelection(item.value)"
      >
        <span class="filter-chip__label">{{ item.label }}</span>
        <span v-if="item.count != null" class="filter-chip__count">{{ item.count }}</span>
      </button>
    </div>

    <button
      v-if="showViewAll"
      type="button"
      class="filter-chips__view-all"
      @click="emit('view-all')"
    >
      <span>{{ viewAllLabel }}</span>
      <svg class="filter-chips__chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FilterChipOption } from '@/composables/useFilterChips';

interface Props {
  title?: string;
  items: FilterChipOption[];
  modelValue: (string | number)[];
  maxDisplay?: number;
  multiple?: boolean;
  viewAllLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxDisplay: 12,
  multiple: true,
  viewAllLabel: 'Показать все'
});

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]];
  'view-all': [];
}>();

const displayItems = computed(() => {
  // Take first maxDisplay items
  const topItems = props.items.slice(0, props.maxDisplay);

  // Check if all selected items are already in topItems
  const allSelectedInTop = props.modelValue.every(value =>
    topItems.some(item => item.value === value)
  );

  // If all selected are already visible, keep original order
  if (allSelectedInTop) {
    return topItems;
  }

  // Otherwise, add missing selected items to the beginning
  const selectedNotInTop: FilterChipOption[] = [];
  const topItemValues = new Set(topItems.map(item => item.value));

  props.items.forEach(item => {
    if (props.modelValue.includes(item.value) && !topItemValues.has(item.value)) {
      selectedNotInTop.push(item);
    }
  });

  // Remove from end to make space for selected items
  const itemsToShow = topItems.slice(0, props.maxDisplay - selectedNotInTop.length);
  return [...selectedNotInTop, ...itemsToShow];
});

const showViewAll = computed(() => {
  return props.items.length > props.maxDisplay;
});

const isSelected = (value: string | number): boolean => {
  return props.modelValue.includes(value);
};

const toggleSelection = (value: string | number) => {
  if (!props.multiple) {
    // Single selection with toggle
    const isCurrentlySelected = props.modelValue.includes(value);
    if (isCurrentlySelected) {
      // Deselect
      emit('update:modelValue', []);
    } else {
      // Select
      emit('update:modelValue', [value]);
    }
    return;
  }

  // Multiple selection
  const index = props.modelValue.indexOf(value);
  if (index > -1) {
    const newValue = [...props.modelValue];
    newValue.splice(index, 1);
    emit('update:modelValue', newValue);
  } else {
    emit('update:modelValue', [...props.modelValue, value]);
  }
};
</script>

<style scoped>
.filter-chips {
  @apply flex flex-col gap-4;
}

.filter-chips__header {
  @apply flex items-center justify-between;
}

.filter-chips__title {
  @apply text-xs font-semibold tracking-wide uppercase;
  @apply text-slate-500 dark:text-slate-400;
}

.filter-chips__grid {
  @apply flex flex-wrap gap-2;
}

.filter-chip {
  @apply inline-flex items-center gap-1.5 px-4 py-2 rounded-full;
  @apply text-sm font-medium transition-all duration-200;
  @apply bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200;
  @apply hover:bg-slate-200 dark:hover:bg-white/20;
  @apply active:scale-[0.97];
  @apply focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary dark:focus:ring-offset-dark-card;
  min-height: 38px;
  -webkit-tap-highlight-color: transparent;
}

.filter-chip--active {
  @apply bg-primary text-white;
  @apply hover:bg-primary-hover;
  @apply shadow-sm;
}

.filter-chip__label {
  @apply leading-none;
}

.filter-chip__count {
  @apply text-xs opacity-60;
}

.filter-chips__view-all {
  @apply inline-flex items-center gap-1.5 text-sm font-medium;
  @apply text-slate-600 dark:text-slate-400;
  @apply hover:text-slate-900 dark:hover:text-white transition-colors;
  @apply focus:outline-none focus:text-primary;
  @apply mt-1;
}

.filter-chips__chevron {
  @apply transition-transform;
}

.filter-chips__view-all:hover .filter-chips__chevron {
  @apply translate-x-0.5;
}
</style>
