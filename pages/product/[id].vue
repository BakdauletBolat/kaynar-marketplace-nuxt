<template>
    <div class="mx-auto relative max-w-7xl px-4">
        <BreadCrumb class="mt-6" :options="breadcrumbs"></BreadCrumb>
        <div v-if="product" class="mt-4 grid relative w-full grid-cols-1 lg:grid-cols-[500px_1fr] gap-5">
            <div class="order-2 lg:order-1">
                <div class="p-5 w-full bg-white rounded-lg hidden lg:block">
                    <ProductSlider :pictures="product?.pictures"></ProductSlider>
                </div>
                <div class="p-5 w-full lg:mt-5 bg-white rounded-lg">
                    <h2 class="font-bold text-lg">Машина</h2>
                    <div>
                        <ul>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Модификация
                                </div>
                                <p class="font-light">
                                    420 d (2015, 140kw, 2.00l)
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Год
                                </div>
                                <p class="font-light">
                                    2015
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Код двигателя
                                </div>
                                <p class="font-light">
                                    B47 D20 A
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Тип топлива
                                </div>
                                <p class="font-light">
                                    Дизель
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Объем двигателя
                                </div>
                                <p class="font-light">
                                    2.0 l
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Тип коробки передач
                                </div>
                                <p class="font-light">
                                    Ручная
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Ведущие колеса
                                </div>
                                <p class="font-light">
                                    Задний
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Цвет
                                </div>
                                <p class="font-light">
                                    Синий
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Тип кузова
                                </div>
                                <p class="font-light">
                                    Купе
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Пробег
                                </div>
                                <p class="font-light">
                                    99459
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Положение рулевого колеса
                                </div>
                                <p class="font-light">
                                    Правосторонний руль
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    OEM-коды
                                </div>
                                <p class="font-light">
                                    6792112
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Состояние
                                </div>
                                <p class="font-light">
                                    Использованная/-ый
                                </p>
                            </li>

                            <li class="flex py-3 justify-between -b">
                                <div class="font-light text-slate-500">
                                    Мощность двигателя
                                </div>
                                <p class="font-light">
                                    140 kW
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="order-1 lg:order-2">
                <div class="lg:sticky lg:top-20 z-10">
                    <div class=" bg-white rounded-lg p-5">
                        <ProductMobileSlider :pictures="product?.pictures" class="lg:hidden "></ProductMobileSlider>
                        <h1 class="text-lg lg:text-2xl font-bold mt-3">{{ product.modification.modelCar.name }} (
                            {{ product.modification.modelCar.startDate }} - {{ product.modification.modelCar.endDate }}
                        ) {{ product.name }}</h1>
                        <div class="flex justify-between flex-col lg:flex-row gap-2 lg:gap-0 lg:items-center mt-3">
                            <div class="text-xl lg:text-2xl font-bold">{{product.price}} ₸</div>
                                <button @click="cardStorage.isActive.value = true" v-if="cardStorage.checkInGoods(product.id)" class="rounded-lg flex p-3 gap-1  justify-center">
                                    <ShoppingCartIcon class="h-6 w-6"></ShoppingCartIcon> В корзину
                                </button>
                                <button v-else @click="addGoods" class="p-3 bg-primary rounded-lg flex gap-1 justify-center">
                                    <ShoppingCartIcon class="h-6 w-6"></ShoppingCartIcon> Добавить в корзину
                                </button>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-3 rounded-lg bg-white lg:gap-2 py-5 px-5 justify-between my-4 gap-5">
                        <div class="flex gap-2 flex-col items-center">
                            <TruckIcon class="w-12 h-12 text-sky-500"></TruckIcon>
                            <div class="flex flex-col justify-center items-center">
                                <h3>1-2 д.</h3>
                                <p class="text-sm text-gray-500">Расчетная дата доставки*</p>
                            </div>
                        </div>
                        <div class="flex gap-2 flex-col items-center">
                            <CheckBadgeIcon class="w-12 h-12 text-sky-500"></CheckBadgeIcon>
                            <div class="flex flex-col justify-center items-center">
                                <h3>14 д.</h3>
                                <p class="text-sm text-gray-500">Гарантия возврата</p>
                            </div>
                        </div>
                        <div class="flex gap-2 flex-col items-center">
                            <StarIcon class="w-12 h-12 text-sky-500"></StarIcon>
                            <div class="flex flex-col justify-center items-center">
                                <h3>4.6/5</h3>
                                <p class="text-sm text-gray-500">Оценка клиента</p>
                            </div>
                        </div>
                    </div>
                    <div class=" pt-5 bg-white rounded-lg p-3">
                        <h2 class="text-xl font-bold">Расчетная время доставки*</h2>
                        <SelectSingle class="mt-5" v-model="countryId" :options="countryOptions"
                            placeholder="Выберите страну"></SelectSingle>
                        <table class="table-auto mt-5 w-full">
                            <thead>
                                <tr class="text-left -b  text-gray-500 font-light">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { TruckIcon, CheckBadgeIcon, StarIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
import SelectSingle from "@/components/Select/single.vue";
import { type Option } from "@/components/Select";
import { ref } from "vue";
import ProductSlider from "@/components/product-slider.vue";
import { useRoute } from "vue-router";
import {type Product} from '@/api/products';
import ProductMobileSlider from '@/components/product-mobile.slider.vue';
import {customFetch} from "~/api";
import { CardStorage } from "@/storages/storage";

const cardStorage = CardStorage.getInstance();

const breadcrumbs = [
  {
    "text": "Главная",
    "link": null
  },
  {
    "text": "Каталог автомобилей",
    "link": null
  },
  {
    "text": "Audi",
    "link": null
  },
  {
    "text": "Audi 100 200 5000 C2 (100)",
    "link": null
  },
  {
    "text": "Дверь",
    "link": null
  },
  {
    "text": "Боковая раздвижная дверь",
    "link": null
  },
  {
    "text": "Внешняя ручка",
    "link": null
  }
]

const route = useRoute();

function getProduct(id: number) {
  return customFetch(`/api/product/${id}/`);
}


// const product = ref<Product | null>(null);
const {data: product} = useAsyncData('product', ()=>getProduct(parseInt(route.params.id.toString())));



function addGoods() {
    cardStorage.addGood({
        quantity: 1,
        id: product.value!.id,
        name: product.value!.name,
        price: product.value!.price,
        // @ts-ignore
        picture_url: product.value!.pictures.length > 0 ? product.value!.pictures[0].image : null
    });
    cardStorage.isActive.value = true;
}


const countryId = ref<Option | undefined>(undefined);

const countryOptions: Option[] = [{
    id: 1,
    name: 'Казахстан'
},
{
    id: 2,
    name: 'Россия'
},

{
    id: 3,
    name: 'Грузия'
}
]

</script>

