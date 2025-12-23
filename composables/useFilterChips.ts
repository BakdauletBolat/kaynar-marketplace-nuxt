import { ref, computed } from 'vue';
import type { SelectOption } from 'naive-ui';

export interface FilterChipOption {
  label: string;
  value: string | number;
  count?: number;
}

export function useFilterChips() {
  // Price range state
  const priceFrom = ref<number | null>(null);
  const priceTo = ref<number | null>(null);

  // Format price with thousands separator
  const formatPrice = (value: number | null): string => {
    if (value == null) return '';
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  // Parse price from formatted string
  const parsePrice = (value: string): number | null => {
    if (!value) return null;
    const cleaned = value.replace(/\s/g, '');
    const parsed = parseInt(cleaned, 10);
    return isNaN(parsed) ? null : parsed;
  };

  // Validate price range
  const isPriceRangeValid = computed(() => {
    if (priceFrom.value == null && priceTo.value == null) return true;
    if (priceFrom.value == null || priceTo.value == null) return true;
    return priceFrom.value <= priceTo.value;
  });

  // Get popular items (first N items)
  const getPopularItems = (items: FilterChipOption[], limit: number = 12): FilterChipOption[] => {
    return items.slice(0, limit);
  };

  // Filter items by search query
  const filterBySearch = (items: FilterChipOption[], query: string): FilterChipOption[] => {
    if (!query.trim()) return items;
    const normalized = query.toLowerCase();
    return items.filter(item => item.label.toLowerCase().includes(normalized));
  };

  // Group items alphabetically
  const groupByAlphabet = (items: FilterChipOption[]): Map<string, FilterChipOption[]> => {
    const groups = new Map<string, FilterChipOption[]>();

    items.forEach(item => {
      const firstChar = item.label[0]?.toUpperCase() || '#';
      const key = /[A-ZА-Я]/.test(firstChar) ? firstChar : '#';

      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(item);
    });

    return new Map([...groups.entries()].sort());
  };

  // Reset price range
  const resetPriceRange = () => {
    priceFrom.value = null;
    priceTo.value = null;
  };

  return {
    priceFrom,
    priceTo,
    formatPrice,
    parsePrice,
    isPriceRangeValid,
    getPopularItems,
    filterBySearch,
    groupByAlphabet,
    resetPriceRange
  };
}
