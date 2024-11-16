<script setup lang="ts">
import { TruckIcon, CheckBadgeIcon, StarIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import ProductSlider from "@/components/product-slider.vue";
import { useRoute } from "vue-router";
import { type ProductDetail } from "@/api/products";
import ProductMobileSlider from "@/components/product-mobile.slider.vue";
import { customFetch } from "~/api";
import { CardStorage, isOpenCart } from "@/storages/storage";
import { NSelect, NButton, NBreadcrumb, NBreadcrumbItem } from "naive-ui";

function getProduct(id: number) {
    return customFetch<ProductDetail>(`/api/v2/product/${id}/`);
}

const route = useRoute();
const {
    data: product,
    status,
    error,
} = await useAsyncData("product-detail", () =>
    getProduct(parseInt(route.params.id.toString())),
);

const cardStorage = CardStorage.getInstance();

const countryId = ref<any | undefined>(null);

const breadcrumbs = ref<{ text: string; link: any }[]>([
    {
        text: "Главная",
        link: {
            name: "index",
        },
    },
    {
        text: "Каталог автомобилей",
        link: {
            name: "catalog",
        },
    },
]);

const countryOptions: any[] = [
    {
        value: 1,
        label: "Казахстан",
    },
    {
        value: 2,
        label: "Россия",
    },

    {
        value: 3,
        label: "Грузия",
    },
];

onMounted(() => {
    if (product.value != null) {
        // addBreadCrumbs(product.value!);
    }
});

watch(product, (value) => {
    if (value != null) {
        // addBreadCrumbs(value!);
    }
});

function addBreadCrumbs(value: ProductDetail) {
    breadcrumbs.value.push({
        link: {
            name: "catalog",
            query: {
                category: value.category.id,
            },
        },
        text: value.category.name.toString(),
    });
}

function addGoods() {
    cardStorage.addGood({
        quantity: 1,
        id: product.value!.id,
        name: product.value!.name,
        // @ts-ignore
        price: product.value!.price,
        // @ts-ignore
        picture_url:
            product.value!.pictures.length > 0
                ? product.value!.pictures[0].image
                : null,
    });
    cardStorage.isActive.value = true;
}
</script>
<template>
    <div class="mx-auto container px-4 mt-4">
        <n-breadcrumb>
            <n-breadcrumb-item v-for="option in breadcrumbs">
                <nuxt-link :to="option.link">{{ option.text }}</nuxt-link>
            </n-breadcrumb-item>
        </n-breadcrumb>
    </div>
    <div class="mx-auto relative container px-4">
        <div
            v-if="product"
            class="mt-4 grid relative w-full grid-cols-1 lg:grid-cols-[500px_1fr] gap-5"
        >
            <div class="order-2 lg:order-1 gap-5 flex flex-col">
                <n-card class="w-full hidden lg:block">
                    <ProductSlider
                        :pictures="product?.pictures"
                    ></ProductSlider>
                </n-card>
                <n-card class="w-full text-sm">
                    <h2 class="font-bold text-lg">Машина</h2>
                    <div>
                        <ul>
                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Модификация
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.modelCar?.name }}
                                    (2015,
                                    {{ product.eav_attributes?.power }}kw,
                                    {{ product.eav_attributes?.capacity }}l)
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">Год</div>
                                <p class="font-light">
                                    {{
                                        product.eav_attributes?.modelCar
                                            ?.startDate
                                    }}
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Тип топлива
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.fuelType }}
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Объем двигателя
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.capacity }} l
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Тип коробки передач
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.gearType }}
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Ведущие колеса
                                </div>
                                <p class="font-light">
                                    {{
                                        product.eav_attributes
                                            ?.axleConfiguration
                                    }}
                                </p>
                            </li>
                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Тип кузова
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.bodyType }}
                                </p>
                            </li>
                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Положение рулевого колеса
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.steeringType }}
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    OEM-коды
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.vinCode }}
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Состояние
                                </div>
                                <p class="font-light">Использованная/-ый</p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Мощность двигателя
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.power }} kW
                                </p>
                            </li>
                        </ul>
                    </div>
                </n-card>
            </div>
            <div class="order-1 lg:order-2">
                <div class="lg:sticky z-10">
                    <n-card>
                        <h1
                            class="text-lg block lg:hidden lg:text-2xl font-bold"
                        >
                            {{ product.eav_attributes?.modelCar?.name }} (
                            {{ product.eav_attributes?.modelCar?.startDate }} -
                            {{ product.eav_attributes?.modelCar?.endDate }} )
                            {{ product.name }}
                        </h1>
                        <ProductMobileSlider
                            :pictures="product?.pictures"
                            class="lg:hidden mt-3"
                        ></ProductMobileSlider>
                        <h1
                            class="text-lg hidden lg:block lg:text-2xl font-bold"
                        >
                            {{ product.eav_attributes?.modelCar?.name }} (
                            {{ product.eav_attributes?.modelCar?.startDate }} -
                            {{ product.eav_attributes?.modelCar?.endDate }} )
                            {{ product.name }}
                        </h1>
                        <div class="mt-2">
                            <span>Код товара в системе: </span
                            ><span
                                class="text-blue-600 hover:underline cursor-pointer"
                                >{{ product.id }}</span
                            >
                        </div>
                        <div
                            class="flex justify-between flex-col lg:flex-row gap-2 lg:gap-0 lg:items-center mt-3"
                        >
                            <div class="text-2xl font-bold">
                                {{ product.price }} ₸
                            </div>
                            <n-button
                                size="large"
                                @click="isOpenCart = true"
                                v-if="cardStorage.checkInGoods(product.id)"
                            >
                                Товар в корзине
                            </n-button>
                            <n-button
                                size="large"
                                type="primary"
                                v-else
                                @click="addGoods"
                            >
                                Купить
                            </n-button>
                        </div>
                    </n-card>
                    <n-card class="my-4 gap-5">
                        <div
                            class="grid grid-cols-1 lg:grid-cols-3 lg:gap-2 justify-between"
                        >
                            <div class="flex gap-2 flex-col items-center">
                                <TruckIcon
                                    class="w-12 h-12 text-sky-500"
                                ></TruckIcon>
                                <div
                                    class="flex flex-col justify-center items-center"
                                >
                                    <h3>1-2 д.</h3>
                                    <p class="text-sm text-gray-500">
                                        Расчетная дата доставки*
                                    </p>
                                </div>
                            </div>
                            <div class="flex gap-2 flex-col items-center">
                                <CheckBadgeIcon
                                    class="w-12 h-12 text-sky-500"
                                ></CheckBadgeIcon>
                                <div
                                    class="flex flex-col justify-center items-center"
                                >
                                    <h3>14 д.</h3>
                                    <p class="text-sm text-gray-500">
                                        Гарантия возврата
                                    </p>
                                </div>
                            </div>
                            <div class="flex gap-2 flex-col items-center">
                                <StarIcon
                                    class="w-12 h-12 text-sky-500"
                                ></StarIcon>
                                <div
                                    class="flex flex-col justify-center items-center"
                                >
                                    <h3>4.6/5</h3>
                                    <p class="text-sm text-gray-500">
                                        Оценка клиента
                                    </p>
                                </div>
                            </div>
                        </div>
                    </n-card>
                    <n-card>
                        <h2 class="text-xl font-bold">
                            Расчетная время доставки*
                        </h2>
                        <n-select
                            class="mt-5"
                            v-model:value="countryId"
                            :options="countryOptions"
                            placeholder="Выберите страну"
                        ></n-select>
                        <table class="table-auto text-sm mt-5 w-full">
                            <thead>
                                <tr
                                    class="text-left -b text-gray-500 font-light"
                                >
                                    <th class="font-light py-2">Курьер</th>
                                    <th class="font-light py-2">Цена от</th>
                                    <th class="font-light py-2">Доставка</th>
                                </tr>
                            </thead>
                            <tbody class="font-light">
                                <tr>
                                    <td class="py-2">FedEx Plus</td>
                                    <td class="py-2">1290 ₸</td>
                                    <td class="py-2">26 Февраля</td>
                                </tr>
                                <tr>
                                    <td class="py-2">FedEx Priority</td>
                                    <td class="py-2">1400 ₸</td>
                                    <td class="py-2">2 Марта</td>
                                </tr>
                            </tbody>
                        </table>
                    </n-card>
                </div>
            </div>
        </div>
    </div>
</template>
