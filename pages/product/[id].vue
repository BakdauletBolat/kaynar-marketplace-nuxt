<script setup lang="ts">
import {
  TruckIcon,
  CheckBadgeIcon,
  StarIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/24/outline";
import { computed, h } from "vue";
import ProductSlider from "@/components/product-slider.vue";
import ProductMobileSlider from "@/components/product-mobile.slider.vue";
import { customFetch } from "~/api";
import { CardStorage } from "@/storages/storage";
import type { ProductDetail } from "@/api/products";
import { NButton } from "naive-ui";
import { getPrice } from "#imports";

function getProduct(id: number) {
  return customFetch<ProductDetail>(`/api/v2/product/${id}/`);
}

const route = useRoute();
const router = useRouter();
const notification = useNotification();

const productId = computed(() => parseInt(route.params.id.toString(), 10));
const { data: product } = await useAsyncData(`product-detail-${route.params.id}`, () =>
  getProduct(productId.value)
);

const cardStorage = CardStorage.getInstance();

function formatYear(value?: string | null) {
  if (!value) return null;
  const match = String(value).match(/^(\d{4})/);
  return match ? match[1] : String(value);
}

const productName = computed(() => product.value?.name ?? "");

const carModelName = computed(() => product.value?.eav_attributes?.modelCar?.name ?? "");
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

const breadcrumbs = computed(() => {
  const base: { text: string; link: any }[] = [
    { text: "Главная", link: { name: "index" } },
    { text: "Каталог", link: { name: "catalog" } },
  ];

  if (!product.value) return base;

  return [
    ...base,
    {
      text: product.value.category?.name ?? "Категория",
      link: {
        name: "catalog",
        query: { category: product.value.category?.id },
      },
    },
  ];
});

const categoryLink = computed(() => {
  if (!product.value?.category?.id) return { name: "catalog" };
  return { name: "catalog", query: { category: product.value.category.id } };
});

const warehouseCity = computed(() => product.value?.warehouse?.city?.name ?? "");
const warehouseName = computed(() => product.value?.warehouse?.name ?? "");

const createdAtText = computed(() => {
  const raw = product.value?.created_at;
  if (!raw) return "";
  try {
    return new Date(raw).toLocaleDateString("ru-RU");
  } catch {
    return String(raw);
  }
});

const updatedAtText = computed(() => {
  const raw = product.value?.updated_at;
  if (!raw) return "";
  try {
    return new Date(raw).toLocaleDateString("ru-RU");
  } catch {
    return String(raw);
  }
});

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

const showDimensions = computed(() => {
  const d = product.value?.detail;
  return Boolean(d && (d.weight || d.length || d.width || d.height));
});

const showCodes = computed(() => codes.value.length > 0);
const showDescription = computed(() => descriptionText.value.trim().length > 0);

const isInCart = computed(() => {
  if (!product.value) return false;
  return cardStorage.checkInGoods(product.value.id);
});

const showBuyButton = computed(() => statusMeta.value.canBuy);
const mobileCanInteract = computed(() => showBuyButton.value || isInCart.value);
const mobileCtaType = computed(() =>
  showBuyButton.value && !isInCart.value ? "primary" : "default"
);

const mobileCtaText = computed(() => {
  if (isInCart.value) return "Товар в корзине";
  if (!showBuyButton.value) return statusMeta.value.label;
  return "Добавить в корзину";
});

const bottomBarPrice = computed(() => (product.value ? getPrice(product.value.price) : ""));
const bottomBarSubtitle = computed(() => statusMeta.value.label);

function goBack() {
  router.back();
}

function goToCart() {
  router.push({ name: "auth-cart" });
}

function addGoods() {
  if (!product.value) return;

  cardStorage.addGood({
    quantity: 1,
    id: product.value.id,
    name: product.value.name,
    // @ts-ignore
    price: product.value.price,
    // @ts-ignore
    picture_url: product.value.pictures?.length ? product.value.pictures[0].image : null,
  });

  cardStorage.isActive.value = true;

  const n = notification.create({
    title: "Товар добавлен в корзину",
    content: "Вы можете продолжить покупки или перейти в корзину для оформления заказа.",
    action: () =>
      h(
        NButton,
        {
          onClick: () => {
            goToCart();
            n.destroy();
          },
        },
        { default: () => "Перейти в корзину" }
      ),
  });
}

function addOrGoToCart() {
  if (!product.value) return;
  if (isInCart.value) {
    goToCart();
    return;
  }
  addGoods();
}

const pageTitle = computed(() => {
  const parts: string[] = [];
  if (productName.value) parts.push(productName.value);
  if (carSubtitle.value) parts.push(carSubtitle.value);
  return parts.join(" — ");
});

useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageTitle }],
});
</script>

<template>
  <main>
    <!-- MOBILE: галерея сверху -->
    <div class="relative lg:hidden">
      <button
        type="button"
        @click="goBack"
        class="absolute left-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur"
        aria-label="Назад"
      >
        <ArrowLeftIcon class="h-5 w-5" />
      </button>
      <ProductMobileSlider :pictures="product?.pictures" />
    </div>

    <div class="container mx-auto px-4 pb-36 lg:pb-10">
      <!-- DESKTOP: хлебные крошки -->
      <div class="mx-auto hidden lg:block mt-4">
        <n-breadcrumb class="!whitespace-normal">
          <n-breadcrumb-item v-for="option in breadcrumbs" :key="option.text">
            <nuxt-link :to="option.link">{{ option.text }}</nuxt-link>
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>

      <!-- Пустое состояние -->
      <div v-if="!product" class="py-10">
        <n-result
          status="404"
          title="Товар не найден"
          description="Попробуйте вернуться в каталог и выбрать другой товар."
        />
        <div class="mt-4">
          <n-button @click="router.push({ name: 'catalog' })" type="primary">
            Перейти в каталог
          </n-button>
        </div>
      </div>

      <!-- Контент -->
      <div
        v-else
        class="mt-4 grid w-full grid-cols-1 gap-6 lg:grid-cols-[560px_1fr] lg:items-start"
      >
        <!-- Галерея (desktop) -->
        <div class="hidden lg:block">
          <n-card class="overflow-hidden">
            <ProductSlider :pictures="product.pictures" />
          </n-card>
        </div>

        <!-- Карточка покупки -->
        <div class="space-y-4 lg:sticky lg:top-6 z-[1000]">
          <n-card>
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <h1 class="text-xl lg:text-2xl font-bold leading-snug break-words">
                  {{ productName }}
                </h1>
                <div v-if="carSubtitle" class="mt-1 text-sm text-slate-500">
                  {{ carSubtitle }}
                </div>
              </div>
              <n-tag size="small" :type="statusMeta.type">{{ statusMeta.label }}</n-tag>
            </div>

            <div class="mt-4 flex items-end justify-between gap-3">
              <div class="text-2xl font-bold">
                {{ getPrice(product.price) }}
              </div>
              <div class="text-xs text-slate-500">
                ID: <span class="font-semibold text-slate-700">{{ product.id }}</span>
              </div>
            </div>

            <client-only>
              <div class="mt-4 hidden lg:block">
                <n-button
                  size="large"
                  class="w-full"
                  :type="mobileCtaType"
                  :disabled="!mobileCanInteract"
                  @click="addOrGoToCart"
                >
                  <template #icon v-if="showBuyButton && !isInCart">
                    <n-icon size="20"><ShoppingCartIcon /></n-icon>
                  </template>
                  {{ mobileCtaText }}
                </n-button>
              </div>
            </client-only>

            <div class="mt-4 grid grid-cols-2 gap-3">
              <div class="product-kpi">
                <div class="product-kpi__label">Категория</div>
                <nuxt-link
                  :to="categoryLink"
                  class="product-kpi__value text-primary hover:underline"
                >
                  {{ product.category?.name }}
                </nuxt-link>
              </div>
              <div class="product-kpi">
                <div class="product-kpi__label">Город</div>
                <div class="product-kpi__value">{{ warehouseCity || "—" }}</div>
              </div>
              <div class="product-kpi">
                <div class="product-kpi__label">Склад</div>
                <div class="product-kpi__value">{{ warehouseName || "—" }}</div>
              </div>
              <div class="product-kpi">
                <div class="product-kpi__label">Состояние</div>
                <div class="product-kpi__value">Б/у</div>
              </div>
            </div>
          </n-card>

          <!-- Доверие/доставка -->
          <n-card>
            <div class="grid grid-cols-3 gap-2">
              <div class="flex flex-col items-center text-center gap-2">
                <TruckIcon class="h-10 w-10 text-sky-500" />
                <div>
                  <div class="font-semibold">1–2 дня</div>
                  <div class="text-xs text-slate-500">доставка</div>
                </div>
              </div>
              <div class="flex flex-col items-center text-center gap-2">
                <CheckBadgeIcon class="h-10 w-10 text-sky-500" />
                <div>
                  <div class="font-semibold">14 дней</div>
                  <div class="text-xs text-slate-500">возврат</div>
                </div>
              </div>
              <div class="flex flex-col items-center text-center gap-2">
                <StarIcon class="h-10 w-10 text-sky-500" />
                <div>
                  <div class="font-semibold">4.6/5</div>
                  <div class="text-xs text-slate-500">оценка</div>
                </div>
              </div>
            </div>
          </n-card>
        </div>

        <!-- Детали -->
        <div class="lg:col-span-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <!-- О товаре -->
          <n-card>
            <div class="product-card__title">О товаре</div>
            <dl class="product-dl">
              <div class="product-row">
                <dt>Категория</dt>
                <dd class="text-right">
                  <nuxt-link :to="categoryLink" class="text-primary hover:underline">
                    {{ product.category?.name }}
                  </nuxt-link>
                </dd>
              </div>
              <div class="product-row" v-if="warehouseCity">
                <dt>Город</dt>
                <dd class="text-right">{{ warehouseCity }}</dd>
              </div>
              <div class="product-row" v-if="warehouseName">
                <dt>Склад</dt>
                <dd class="text-right">{{ warehouseName }}</dd>
              </div>
              <div class="product-row" v-if="product.color">
                <dt>Цвет</dt>
                <dd class="text-right break-words">{{ product.color }}</dd>
              </div>
              <div class="product-row" v-if="product.mileage != null">
                <dt>Пробег</dt>
                <dd class="text-right">{{ product.mileage }}</dd>
              </div>
              <div class="product-row" v-if="createdAtText">
                <dt>Добавлен</dt>
                <dd class="text-right">{{ createdAtText }}</dd>
              </div>
              <div class="product-row" v-if="updatedAtText">
                <dt>Обновлён</dt>
                <dd class="text-right">{{ updatedAtText }}</dd>
              </div>
            </dl>
          </n-card>

          <!-- Совместимость -->
          <n-card>
            <div class="product-card__title">Совместимость с авто</div>
            <dl class="product-dl">
              <div class="product-row" v-if="carModelName">
                <dt>Модель</dt>
                <dd class="text-right break-words">{{ carModelName }}</dd>
              </div>
              <div class="product-row" v-if="carYearRange">
                <dt>Годы</dt>
                <dd class="text-right">{{ carYearRange }}</dd>
              </div>
              <div class="product-row" v-if="product.eav_attributes?.fuelType">
                <dt>Топливо</dt>
                <dd class="text-right break-words">{{ product.eav_attributes.fuelType }}</dd>
              </div>
              <div class="product-row" v-if="product.eav_attributes?.gearType">
                <dt>КПП</dt>
                <dd class="text-right break-words">{{ product.eav_attributes.gearType }}</dd>
              </div>
              <div class="product-row" v-if="product.eav_attributes?.driveType">
                <dt>Привод</dt>
                <dd class="text-right break-words">{{ product.eav_attributes.driveType }}</dd>
              </div>
              <div class="product-row" v-if="product.eav_attributes?.bodyType">
                <dt>Кузов</dt>
                <dd class="text-right break-words">{{ product.eav_attributes.bodyType }}</dd>
              </div>
              <div class="product-row" v-if="product.eav_attributes?.steeringType">
                <dt>Руль</dt>
                <dd class="text-right break-words">{{ product.eav_attributes.steeringType }}</dd>
              </div>
              <div class="product-row" v-if="product.eav_attributes?.power">
                <dt>Мощность</dt>
                <dd class="text-right">{{ product.eav_attributes.power }} kW</dd>
              </div>
              <div
                class="product-row"
                v-if="product.eav_attributes?.capacity || product.eav_attributes?.engineDisplacement"
              >
                <dt>Объём</dt>
                <dd class="text-right">
                  {{ product.eav_attributes.capacity ?? product.eav_attributes.engineDisplacement }} л
                </dd>
              </div>
            </dl>
          </n-card>

          <!-- Габариты -->
          <n-card v-if="showDimensions">
            <div class="product-card__title">Габариты</div>
            <dl class="product-dl">
              <div class="product-row" v-if="product.detail?.weight">
                <dt>Вес</dt>
                <dd class="text-right">{{ product.detail.weight }} кг</dd>
              </div>
              <div class="product-row" v-if="product.detail?.length">
                <dt>Длина</dt>
                <dd class="text-right">{{ product.detail.length }} см</dd>
              </div>
              <div class="product-row" v-if="product.detail?.width">
                <dt>Ширина</dt>
                <dd class="text-right">{{ product.detail.width }} см</dd>
              </div>
              <div class="product-row" v-if="product.detail?.height">
                <dt>Высота</dt>
                <dd class="text-right">{{ product.detail.height }} см</dd>
              </div>
            </dl>
          </n-card>

          <!-- Коды -->
          <n-card v-if="showCodes" class="lg:col-span-2">
            <div class="product-card__title">Коды</div>
            <div class="flex flex-wrap gap-2">
              <n-tag v-for="code in codes" :key="code" size="small">
                {{ code }}
              </n-tag>
            </div>
          </n-card>

          <!-- Описание -->
          <n-card v-if="showDescription" class="lg:col-span-2">
            <div class="product-card__title">Комментарий</div>
            <p class="whitespace-pre-line text-sm text-slate-700">
              {{ descriptionText }}
            </p>
          </n-card>
        </div>
      </div>
    </div>

    <!-- MOBILE: фиксированная CTA-панель (над нижним меню) -->
    <client-only>
      <div
        v-if="product"
        class="product-mobile-cta lg:hidden fixed left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur"
      >
        <div class="container mx-auto px-4 py-3 flex items-center gap-3">
          <div class="min-w-0 flex-1">
            <div class="text-lg font-bold leading-none">
              {{ bottomBarPrice }}
            </div>
            <div class="text-xs text-slate-500 truncate">
              {{ bottomBarSubtitle }}
            </div>
          </div>
          <n-button
            size="large"
            :type="mobileCtaType"
            :disabled="!mobileCanInteract"
            @click="addOrGoToCart"
          >
            <template #icon v-if="showBuyButton && !isInCart">
              <n-icon size="20"><ShoppingCartIcon /></n-icon>
            </template>
            {{ mobileCtaText }}
          </n-button>
        </div>
      </div>
    </client-only>
  </main>
</template>

<style scoped>
.product-card__title {
  @apply text-sm font-semibold text-slate-900 mb-3;
}

.product-dl {
  @apply flex flex-col gap-2;
}

.product-row {
  @apply flex items-start justify-between gap-3 py-2 border-b border-slate-100 last:border-b-0;
}

.product-row dt {
  @apply text-xs font-medium text-slate-500;
}

.product-row dd {
  @apply text-sm text-slate-900;
}

.product-kpi {
  @apply min-w-0 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2;
}

.product-kpi__label {
  @apply text-[11px] font-medium text-slate-500;
}

.product-kpi__value {
  @apply mt-0.5 text-sm font-semibold text-slate-900 break-words;
}

/* Высота нижнего меню (bottom-app-bar) + safe-area. */
.product-mobile-cta {
  bottom: calc(3.5rem + env(safe-area-inset-bottom));
}
</style>
