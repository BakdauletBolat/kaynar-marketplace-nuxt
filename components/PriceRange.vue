<template>
  <div class="price-range">
    <div class="price-range__inputs">
      <div class="price-range__input-wrapper">
        <label class="price-range__label">От</label>
        <n-input
          :value="formattedFrom"
          @update:value="handleFromInput"
          size="large"
          placeholder="0"
          :status="isRangeValid ? undefined : 'error'"
        >
          <template #suffix>
            <span class="price-range__currency">₸</span>
          </template>
        </n-input>
      </div>

      <div class="price-range__separator">—</div>

      <div class="price-range__input-wrapper">
        <label class="price-range__label">До</label>
        <n-input
          :value="formattedTo"
          @update:value="handleToInput"
          size="large"
          placeholder="1 000 000"
          :status="isRangeValid ? undefined : 'error'"
        >
          <template #suffix>
            <span class="price-range__currency">₸</span>
          </template>
        </n-input>
      </div>
    </div>

    <div v-if="!isRangeValid" class="price-range__error">
      Минимальная цена не может быть больше максимальной
    </div>

    <div class="price-range__slider">
      <n-slider
        v-model:value="sliderValue"
        :min="min"
        :max="max"
        :step="step"
        range
        :tooltip="true"
        :format-tooltip="formatTooltip"
        @update:value="handleSliderChange"
      />
    </div>

    <div class="price-range__bounds">
      <span class="price-range__bound">{{ formatPrice(min) }} ₸</span>
      <span class="price-range__bound">{{ formatPrice(max) }} ₸</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { NInput, NSlider } from 'naive-ui';
import { useFilterChips } from '@/composables/useFilterChips';

interface Props {
  min?: number;
  max?: number;
  step?: number;
  priceFrom?: number | null;
  priceTo?: number | null;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 1000000,
  step: 1000
});

const emit = defineEmits<{
  'update:priceFrom': [value: number | null];
  'update:priceTo': [value: number | null];
}>();

const { formatPrice, parsePrice } = useFilterChips();

// Local state for inputs (formatted strings)
const formattedFrom = ref('');
const formattedTo = ref('');

// Slider value (always a number range)
const sliderValue = ref<[number, number]>([props.min, props.max]);

// Initialize from props
watch(
  () => [props.priceFrom, props.priceTo],
  ([from, to]) => {
    if (from != null) {
      formattedFrom.value = formatPrice(from);
      sliderValue.value[0] = from;
    } else {
      formattedFrom.value = '';
      sliderValue.value[0] = props.min;
    }

    if (to != null) {
      formattedTo.value = formatPrice(to);
      sliderValue.value[1] = to;
    } else {
      formattedTo.value = '';
      sliderValue.value[1] = props.max;
    }
  },
  { immediate: true }
);

const isRangeValid = computed(() => {
  const from = parsePrice(formattedFrom.value);
  const to = parsePrice(formattedTo.value);

  if (from == null || to == null) return true;
  return from <= to;
});

const handleFromInput = (value: string) => {
  formattedFrom.value = value;
  const parsed = parsePrice(value);

  if (parsed != null && parsed >= props.min) {
    emit('update:priceFrom', parsed);
    sliderValue.value = [parsed, sliderValue.value[1]];
  } else if (!value) {
    emit('update:priceFrom', null);
    sliderValue.value = [props.min, sliderValue.value[1]];
  }
};

const handleToInput = (value: string) => {
  formattedTo.value = value;
  const parsed = parsePrice(value);

  if (parsed != null && parsed <= props.max) {
    emit('update:priceTo', parsed);
    sliderValue.value = [sliderValue.value[0], parsed];
  } else if (!value) {
    emit('update:priceTo', null);
    sliderValue.value = [sliderValue.value[0], props.max];
  }
};

const handleSliderChange = (value: [number, number]) => {
  const [from, to] = value;

  // Update inputs
  formattedFrom.value = formatPrice(from);
  formattedTo.value = formatPrice(to);

  // Emit events
  emit('update:priceFrom', from === props.min ? null : from);
  emit('update:priceTo', to === props.max ? null : to);
};

const formatTooltip = (value: number) => {
  return `${formatPrice(value)} ₸`;
};
</script>

<style scoped>
.price-range {
  @apply flex flex-col gap-5;
}

.price-range__inputs {
  @apply grid grid-cols-[1fr_auto_1fr] gap-3 items-end;
}

.price-range__input-wrapper {
  @apply flex flex-col gap-2;
}

.price-range__label {
  @apply text-xs font-semibold uppercase tracking-wide;
  @apply text-slate-600 dark:text-slate-400;
}

.price-range__separator {
  @apply text-lg pb-2 font-light;
  @apply text-slate-400 dark:text-slate-500;
}

.price-range__currency {
  @apply font-semibold text-base;
  @apply text-slate-500 dark:text-slate-400;
}

.price-range__error {
  @apply text-xs font-medium mt-1;
  @apply text-red-600 dark:text-red-400;
}

.price-range__slider {
  @apply px-1 py-2 mt-2;
}

.price-range__bounds {
  @apply flex items-center justify-between text-xs mt-1;
  @apply text-slate-500 dark:text-slate-400;
}

.price-range__bound {
  @apply font-medium;
}
</style>
