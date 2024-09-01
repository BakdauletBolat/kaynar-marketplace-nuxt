<script setup lang="ts">
import { ref, watch } from "vue";
import { FunnelIcon } from "@heroicons/vue/20/solid";
import { useRoute } from "vue-router";
import { type ProductList } from "~/api/products";
import {
    NBreadcrumb,
    NBreadcrumbItem,
    NDrawer,
    NCard,
    NDrawerContent,
    NPageHeader,
    NButton,
    NDropdown,
    NIcon,
} from "naive-ui";
import FilterForm from "./filter-form.vue";
import Card from "./card.vue";
import { useProductStore } from "~/storages/product-store";
import { useFilterStore } from "~/storages/filter-store";

const productStore = useProductStore();
const filterStore = useFilterStore();

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

onMounted(() => {
    filterStore.clearValues();
    if (route.query.category != null) {
        filterStore.filterValues.category = route.query.category.toString();
    }
    if (route.query.modification != null) {
        filterStore.filterValues.modification =
            route.query.modification.toString();
    }
    if (route.query.search != null) {
        filterStore.filterValues.search = route.query.search.toString();
    }
    if (route.params.manufacturerId) {
        filterStore.filterValues.manufacturer = parseInt(
            route.params.manufacturerId.toString(),
        );
    }

    productStore.loadProducts(filterStore.filterValues);
});

function handleBack() {
    router.back();
}

watch(filterStore.filterValues, (state) => {
    console.log(state);
    productStore.loadProducts(state);
});

watch(route, (state) => {
    productStore.loadProducts(filterStore.filterValues);
});

const mobileFiltersOpen = ref(false);
</script>

<template>
    <div>
        <n-drawer :z-index="10000" v-model:show="mobileFiltersOpen" width="90%">
            <n-drawer-content title="Поиск запчестей" closable>
                <filter-form></filter-form>
            </n-drawer-content>
        </n-drawer>
        <main>
            <div
                class="z-[99] bg-white shadow sticky top-0 place-items-center p-4 w-full"
            >
                <div>
                    <n-page-header
                        class="container px-4 mx-auto"
                        @back="handleBack"
                    >
                        <template #title> Поиск запчастей </template>
                        <template #header>
                            <n-breadcrumb id="breadcrumbsb">
                                <n-breadcrumb-item
                                    v-for="option in breadcrumbs"
                                    >{{ option.text }}</n-breadcrumb-item
                                >
                            </n-breadcrumb>
                        </template>
                        <template #extra>
                            <div class="flex gap-2">
                                <n-dropdown
                                    trigger="hover"
                                    :options="sortOptions"
                                    placement="bottom-start"
                                >
                                    <n-button
                                        :bordered="false"
                                        style="padding: 0 4px"
                                    >
                                        Сортировка
                                    </n-button>
                                </n-dropdown>
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
                <section aria-labelledby="products-heading" class="pb-24 mt-4">
                    <div
                        class="grid grid-cols-1 relative gap-3 lg:mt-3 items-start lg:grid-cols-[450px_1fr]"
                    >
                        <n-card class="hidden lg:block sticky -top-[500px]">
                            <filter-form></filter-form>
                        </n-card>
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
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>

<style scoped></style>
