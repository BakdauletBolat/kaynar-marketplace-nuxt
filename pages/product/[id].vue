<script setup lang="ts">
import { TruckIcon, CheckBadgeIcon, StarIcon, ArrowLeftIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import ProductSlider from "@/components/product-slider.vue";
import { useRoute } from "vue-router";
import { type ProductDetail } from "@/api/products";
import ProductMobileSlider from "@/components/product-mobile.slider.vue";
import { customFetch } from "~/api";
import { CardStorage } from "@/storages/storage";
import { NButton, NBreadcrumb, NBreadcrumbItem } from "naive-ui";
import { getPrice } from "#imports";


function getProduct(id: number) {
    return customFetch<ProductDetail>(`/api/v2/product/${id}/`);
}

const route = useRoute();
const router = useRouter();
const notification = useNotification()

const {
    data: product,
} = await useAsyncData("product-detail", () =>
    getProduct(parseInt(route.params.id.toString())),
);

const cardStorage = CardStorage.getInstance();

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
        addBreadCrumbs(product.value!);
    }
});

watch(product, (value) => {
    if (value != null) {
        addBreadCrumbs(value!);
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
    const n = notification.create({
          title: 'Товар добавлен в корзину! 🛒',
          content: `Вы можете продолжить покупки или перейти в корзину для оформления заказа.`,
          action: () =>
            h(
              NButton,
              {
                onClick: () => {
                  router.push({
                    name: 'auth-cart'
                  })
                  n.destroy()
                }
              },
              {
                default: () => 'Перейти в корзину'
              }
            ),
        })
}

const title = `${ product.value?.eav_attributes?.modelCar?.name } (${ product.value?.eav_attributes?.modelCar?.startDate } - ${ product.value?.eav_attributes?.modelCar?.endDate } )${ product.value?.name }`

useHead({
  title: title || 'Загрузка...',
  meta: [
    { name: 'description', content: `${title}` || 'Описание по умолчанию' }
  ]
})
</script>
<template>
    <div class="relative lg:hidden">
        <div @click="router.back" class="w-full cursor-pointer flex gap-2 p-4 absolute top-0 z-10">
            <ArrowLeftIcon class="w-6 h-6"></ArrowLeftIcon>
        </div>
        <ProductMobileSlider :pictures="product?.pictures">
        </ProductMobileSlider>
    </div>

    <div class="mx-auto hidden lg:block container px-4 mt-4">
        <n-breadcrumb class="!whitespace-normal"  >
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

                            <li v-if="product.eav_attributes?.fuelType" class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Тип топлива
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.fuelType }}
                                </p>
                            </li>

                            <li v-if="product.eav_attributes?.capacity" class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Объем двигателя
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.capacity }} l
                                </p>
                            </li>

                            <li v-if="product.eav_attributes?.gearType" class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Тип коробки передач
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.gearType }}
                                </p>
                            </li>

                            <li v-if="product.eav_attributes?.axleConfiguration" class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Ведущие колеса
                                </div>
                                <p class="font-light">
                                    {{product.eav_attributes?.axleConfiguration}}
                                </p>
                            </li>
                            <li v-if="product.eav_attributes?.bodyType" class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Тип кузова
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.bodyType }}
                                </p>
                            </li>
                            <li v-if="product.eav_attributes?.steeringType" class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Положение рулевого колеса
                                </div>
                                <p class="font-light">
                                    {{ product.eav_attributes?.steeringType }}
                                </p>
                            </li>

                            <li v-if="product.eav_attributes?.vinCode" class="flex py-3 justify-between -b">
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

                            <li v-if="product.eav_attributes?.power" class="flex py-3 justify-between -b">
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
                                {{ getPrice(product.price) }}
                            </div>
                            <n-button
                                size="large"
                                @click="()=>router.push({
                                name: 'auth-cart'
                                })"
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
                                <template #icon>
                                  <n-icon size="20"><ShoppingCartIcon></ShoppingCartIcon></n-icon>
                                </template>
                                Добавить в корзину
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
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.black-bg {
    background-color: #0000002c;
}
</style>