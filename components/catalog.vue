<script setup lang="ts">
import { ref, watch } from "vue";
import { FunnelIcon } from "@heroicons/vue/20/solid";
import { useRoute } from "vue-router";
import {
    NDrawer,
    NCard,
    NDrawerContent,
    NPageHeader,
    NButton,
    NIcon,
} from "naive-ui";
import FilterForm from "./filter-form.vue";
import Card from "./card.vue";
import { useProductStore } from "~/storages/product-store";
import { useFilterStore } from "~/storages/filter-store";
import {useCarModelsStore} from "~/storages/car-models-store";

const productStore = useProductStore();
const filterStore = useFilterStore();
const modelCarStore = useCarModelsStore();

const page = ref(1);

const breadcrumbs = ref([
    {
        text: "Главная",
        link: null,
    },
    {
        text: "Каталог автомобилей",
        link: null,
    },
]);

const sortOptions = [
    { label: "Самые популярные", key: 1 },
    { label: "Лучший рейтинг", key: 2 },
    { label: "Новинки", key: 3 },
    { label: "Цена: по возрастанию", key: 4 },
    { label: "Цена: по убыванию", key: 5 },
];

const route = useRoute();
const router = useRouter();
const props = defineProps(["category"]);

onMounted(() => {
    filterStore.clearValues();
    if (props.category != null) {
        filterStore.filterValues.category = props.category;
    }
    if (route.query.category != null) {
        filterStore.filterValues.category = route.query.category.toString();
    }
    if (route.query.modelCar != null) {
      filterStore.filterValues.modelCar = route.query.modelCar.toString().split(',')
    }
    if (route.query.search != null) {
        filterStore.filterValues.search = route.query.search.toString();
    }
    if (route.params.manufacturerId) {
        filterStore.filterValues.manufacturer = parseInt(
            route.params.manufacturerId.toString(),
        );
        modelCarStore.loadCarModelsByManufacturer(filterStore.filterValues.manufacturer);
    }
    productStore.loadProducts(filterStore.filterValues);
});

function handleBack() {
    router.back();
}


watch(route, (state) => {
  if (route.query.search != null) {
    filterStore.filterValues.search = route.query.search.toString();
  }
    productStore.loadProducts(filterStore.filterValues);
});

watch(page, (newState, _) => {
  productStore.loadProducts({...filterStore.filterValues, page: newState});
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
})

function submitFilter() {
  productStore.loadProducts(filterStore.filterValues);
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function clearFilter() {
  filterStore.clearValues();
  productStore.loadProducts(filterStore.filterValues);
}


const mobileFiltersOpen = ref(false);
</script>

<template>
    <div>
        <n-drawer :z-index="10000" v-model:show="mobileFiltersOpen" width="90%">
            <n-drawer-content title="Поиск запчестей" closable>
              <div class="relative">
                <div class="bottom-6 justify-center z-50 fixed flex gap-2">
                  <n-button @click="submitFilter" type="primary">Применить филтры</n-button>
                  <n-button @click="clearFilter" class="!bg-white">Очистить</n-button>
                </div>
                <filter-form></filter-form>
              </div>

            </n-drawer-content>
        </n-drawer>
        <main>
            <div
                class="z-[99] bg-white shadow sticky top-0 place-items-center w-full"
            >
                <div class="w-full">
                    <n-page-header
                        class="w-full container px-4 py-2 mx-auto"
                        @back="handleBack"
                    >
                        <template #title><span class="text-base">Поиск запчастей</span></template>
                        <template #extra>
                            <div class="flex gap-2">
                                <n-button
                                    tertiary
                                    round
                                    @click="
                                        mobileFiltersOpen = !mobileFiltersOpen
                                    "
                                >
                                    <template #icon>
                                        <n-icon
                                            ><FunnelIcon
                                                class="h-5 w-5"
                                                aria-hidden="true"
                                        /></n-icon>
                                    </template>
                                </n-button>
                            </div>
                        </template>
                    </n-page-header>
                </div>
            </div>
            <div class="mx-auto container px-4">
                <section aria-labelledby="products-heading" class="pb-24">
                    <div
                        class="grid grid-cols-1 relative gap-3 lg:mt-3 items-start lg:grid-cols-[450px_1fr]"
                    >
                      <div class="sticky top-[70px]">
                        <n-card class="hidden lg:block h-[600px] overflow-y-scroll ">
                          <filter-form></filter-form>
                        </n-card>
                        <div class="lg:flex w-full mt-4 hidden gap-2 flex-col">
                          <n-button @click="submitFilter" class="w-full" type="primary" size="large">Показать результаты</n-button>
                          <n-button @click="clearFilter" class="!bg-white" size="large">Очистить</n-button>
                        </div>
                      </div>
                        <div>
                            <div
                                class="grid gap-3"
                                v-if="
                                    productStore.isLoadingProducts &&
                                    productStore.products.length == 0
                                "
                            >
                                <product-loading-skeleton
                                    v-for="_ in Array.from(
                                        { length: 10 },
                                        (_, i) => i + 1,
                                    )"
                                ></product-loading-skeleton>
                            </div>
                            <div
                                :class="{
                                    'opacity-40':
                                        productStore.isLoadingProducts,
                                }"
                                v-if="productStore.products.length > 0"
                                class="relative grid gap-3"
                            >
                                <card
                                    :item="item"
                                    v-for="item in productStore.products"
                                ></card>
                            </div>
                            <div v-else>Запчастей не найдено</div>
                            <n-pagination :item-count="productStore.pageCount" size="small" class="mt-6 w-full"
                                          v-model:page="page"/>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>

<style scoped></style>
