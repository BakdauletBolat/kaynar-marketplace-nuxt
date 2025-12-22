import { computed } from 'vue';
import { useDateFormat } from '@vueuse/core';
import type { ProductDetail } from '@/api/products';
import { customFetch } from '~/api';

export function useProductPage(productId: Ref<number>) {
  // --- Data Fetching ---
  const { data: product, pending, error } = useAsyncData(
    `product-detail-${productId.value}`,
    () => customFetch<ProductDetail>(`/api/v2/product/${productId.value}/`),
    {
      watch: [productId]
    }
  );

  // --- Computed Helpers ---
  const productName = computed(() => product.value?.name ?? "");
  const productPrice = computed(() => product.value?.price ?? 0);
  const categoryName = computed(() => product.value?.category?.name ?? "Категория");

  // --- Car Attributes ---
  const carModelName = computed(() => product.value?.eav_attributes?.modelCar?.name ?? "");
  
  const formatYear = (value?: string | null) => {
    if (!value) return null;
    const match = String(value).match(/^(\d{4})/);
    return match ? match[1] : String(value);
  };

  const carYearRange = computed(() => {
    const start = formatYear(product.value?.eav_attributes?.modelCar?.startDate);
    const end = formatYear(product.value?.eav_attributes?.modelCar?.endDate);
    if (start && end) return `${start}–${end}`;
    return start ?? end ?? "";
  });

  const carSubtitle = computed(() => {
    const parts: string[] = [];
    if (carModelName.value) parts.push(carModelName.value);
    if (carYearRange.value) parts.push(carYearRange.value);

    const volume =
      product.value?.eav_attributes?.capacity ?? product.value?.eav_attributes?.engineDisplacement;
    if (volume) parts.push(`${volume} л`);

    return parts.join(" • ");
  });

  // --- Status & Availability ---
  const statusMeta = computed(() => {
    const raw = product.value?.status ?? "";
    const normalized = raw.toLowerCase();
    
    if (!raw) return { label: "Статус неизвестен", type: "default" as const, canBuy: false };
    if (normalized.includes("в наличии"))
      return { label: "В наличии", type: "success" as const, canBuy: true };
    if (normalized.includes("зарезерв"))
      return { label: "Зарезервирован", type: "warning" as const, canBuy: false };
    if (normalized.includes("продан"))
      return { label: "Продан", type: "error" as const, canBuy: false };
      
    return { label: raw, type: "info" as const, canBuy: false };
  });

  // --- Breadcrumbs ---
  const breadcrumbs = computed(() => {
    const base = [
      { text: "Главная", link: { name: "index" } },
      { text: "Каталог", link: { name: "catalog" } },
    ];

    if (!product.value) return base;

    return [
      ...base,
      {
        text: categoryName.value,
        link: {
          name: "catalog",
          query: { category: product.value.category?.id },
        },
      },
    ];
  });

  // --- Formatting ---
  const createdAtText = useDateFormat(computed(() => product.value?.created_at), 'D MMMM', { locales: 'ru-RU' });
  const updatedAtText = useDateFormat(computed(() => product.value?.updated_at), 'D MMMM', { locales: 'ru-RU' });

  const warehouseInfo = computed(() => ({
    city: product.value?.warehouse?.city?.name ?? "",
    name: product.value?.warehouse?.name ?? "",
  }));

  // --- Attributes Lists ---
  const codes = computed(() => {
    const list: string[] = [];
    const rawCodes = (product.value?.code ?? []) as any[];

    for (const item of rawCodes) {
      if (item == null) continue;
      if (typeof item === "string" || typeof item === "number") list.push(String(item));
      else if (typeof item === "object" && "code" in item) list.push(String((item as any).code));
    }

    const vin = product.value?.eav_attributes?.vinCode;
    if (vin) list.push(String(vin));

    return Array.from(new Set(list.map((s) => s.trim()).filter(Boolean)));
  });

  const descriptionText = computed(() => {
    const parts: string[] = [];
    if (product.value?.comment) parts.push(String(product.value.comment));
    if (product.value?.defect) parts.push(`Дефект: ${String(product.value.defect)}`);
    return parts.join("\n\n");
  });

  const specifications = computed(() => {
    if (!product.value) return [];
    const attrs = product.value.eav_attributes || {};
    const specs = [
        { label: 'Модель', value: carModelName.value },
        { label: 'Годы', value: carYearRange.value },
        { label: 'Топливо', value: attrs.fuelType },
        { label: 'КПП', value: attrs.gearType },
        { label: 'Привод', value: attrs.driveType },
        { label: 'Кузов', value: attrs.bodyType },
        { label: 'Руль', value: attrs.steeringType },
        { label: 'Мощность', value: attrs.power ? `${attrs.power} kW` : null },
        { label: 'Объём', value: (attrs.capacity ?? attrs.engineDisplacement) ? `${attrs.capacity ?? attrs.engineDisplacement} л` : null },
    ];
    return specs.filter(s => s.value);
  });
  
  const dimensions = computed(() => {
      if (!product.value?.detail) return [];
      const d = product.value.detail;
      const dims = [
          { label: 'Вес', value: d.weight ? `${d.weight} кг` : null },
          { label: 'Длина', value: d.length ? `${d.length} см` : null },
          { label: 'Ширина', value: d.width ? `${d.width} см` : null },
          { label: 'Высота', value: d.height ? `${d.height} см` : null },
      ];
      return dims.filter(s => s.value);
  });

  const showDimensions = computed(() => dimensions.value.length > 0);
  const showCodes = computed(() => codes.value.length > 0);
  const showDescription = computed(() => descriptionText.value.trim().length > 0);

  return {
    product,
    pending,
    error,
    productName,
    productPrice,
    categoryName,
    carSubtitle,
    statusMeta,
    breadcrumbs,
    createdAtText,
    updatedAtText,
    warehouseInfo,
    codes,
    descriptionText,
    specifications,
    dimensions,
    showDimensions,
    showCodes,
    showDescription
  };
}
