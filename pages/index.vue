<script setup lang="ts">
import SearchBlock from "~/components/search-block.vue";
import Card from "~/components/card.vue";
import ProductLoadingSkeleton from "~/components/product-loading-skeleton.vue";
import {useProductStore} from "@/storages/product-store";
import ManufacturersList from "~/components/manufacturers-list.vue";
import {NImage, NPageHeader} from "naive-ui";
import Logo from "assets/images/logo.png";
import {useCarModelsStore} from "~/storages/car-models-store";
import {useManufacturerStore} from "~/storages/manufacturer-store";
import {HelpCircle} from "@vicons/ionicons5";

const productStore = useProductStore();
const modelCarStore = useCarModelsStore();
const manufacturerStore = useManufacturerStore();
const router = useRouter();
const popularLoaded = ref(false);

onMounted(() => {
  productStore.loadPopularProducts({});
  manufacturerStore.loadManufacturers();
  modelCarStore.loadCarModels();
});

watch(
  () => productStore.popularProducts,
  () => {
    popularLoaded.value = true;
  },
  { deep: false },
);

function toTopScroll() {
  window.scrollTo(0, 0);
}

function routeToFeedback() {
  router.push({
    name: 'feadback'
  })
}

</script>

<template>
  <main class="bg-slate-50">
    <mobile-only-component>
      <n-page-header
        class="fixed w-full z-20 top-0 bg-slate-950/90 backdrop-blur px-4 py-2 border-b border-slate-800"
      >
        <template #title>
          <span class="flex items-center text-white gap-2">
                <n-image
                    @click="toTopScroll"
                    preview-disabled
                    class="w-10 h-10 rounded"
                    alt="Лого"
                    :src="Logo"
                />
          </span>
        </template>
        <template #extra>
          <n-button
            @click="routeToFeedback"
            class="rounded-full !text-white"
            text
          >
            <span class="text-sm font-medium">Покупка в один клик</span>
            <template #icon>
              <n-icon size="25" class="text-white">
                <HelpCircle></HelpCircle>
              </n-icon>
            </template>

          </n-button>
        </template>
      </n-page-header>
    </mobile-only-component>
    <section class="relative pt-14 lg:pt-0">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{
          backgroundImage: `url('https://kartinki.pics/uploads/posts/2021-07/1626725529_6-kartinkin-com-p-zapchasti-fon-krasivo-7.jpg')`,
        }"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" aria-hidden="true" />

      <div class="relative z-10 mx-auto container px-4">
        <search-block></search-block>
      </div>
    </section>

    <section class="mx-auto container px-4 py-10 lg:py-14">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h3 class="text-lg lg:text-2xl font-bold text-slate-900">
            Лучшие предложения
          </h3>
          <p class="mt-1 text-sm text-slate-600">
            Популярные товары — выбирайте и переходите к деталям.
          </p>
        </div>

        <nuxt-link
          :to="{ name: 'catalog' }"
          class="hidden sm:inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors"
        >
          Смотреть все
        </nuxt-link>
      </div>

      <div class="mt-6 grid gap-3 md:grid-cols-2">
        <template v-if="!popularLoaded">
          <product-loading-skeleton v-for="i in 4" :key="i" />
        </template>
        <template v-else-if="productStore.popularProducts.length > 0">
          <card
            :item="item"
            v-for="item in productStore.popularProducts"
            :key="item.id"
          />
        </template>
        <div v-else class="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
          <div class="text-sm font-medium text-slate-900">Пока нет популярных товаров</div>
          <div class="mt-1 text-sm text-slate-600">
            Перейдите в каталог, чтобы посмотреть все предложения.
          </div>
          <nuxt-link
            :to="{ name: 'catalog' }"
            class="mt-4 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black hover:bg-primary-hover transition-colors"
          >
            Открыть каталог
          </nuxt-link>
        </div>
      </div>
    </section>

    <section class="mx-auto container px-4 pb-10 lg:pb-14">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h3 class="text-lg lg:text-2xl font-bold text-slate-900">Поиск по марке</h3>
          <p class="mt-1 text-sm text-slate-600">
            Быстро переходите к каталогу нужного производителя.
          </p>
        </div>
      </div>

      <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-4 lg:p-6">
        <manufacturers-list></manufacturers-list>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
