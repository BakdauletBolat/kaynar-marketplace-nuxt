<script setup lang="ts">
import {TruckIcon, CheckBadgeIcon, StarIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";
import ProductSlider from "@/components/product-slider.vue";
import {useRoute} from "vue-router";
import {type Product} from '@/api/products';
import ProductMobileSlider from '@/components/product-mobile.slider.vue';
import {customFetch} from "~/api";
import {CardStorage, isOpenCart} from "@/storages/storage";
import {NSelect, NButton} from 'naive-ui';

function getProduct(id: number) {
  console.log('asdas')
  return customFetch<Product>(`/api/product/${id}/`);
}

const {data: product} = await useAsyncData('product', () => getProduct(parseInt(route.params.id.toString())));

const cardStorage = CardStorage.getInstance();
const route = useRoute();
const countryId = ref<any | undefined>(null);

const breadcrumbs = ref([
  {
    "text": "Главная",
    "link": null
  },
  {
    "text": "Каталог автомобилей",
    "link": null
  }
]);

const countryOptions: any[] = [{
  value: 1,
  label: 'Казахстан'
},
  {
    value: 2,
    label: 'Россия'
  },

  {
    value: 3,
    label: 'Грузия'
  }
]


onMounted(() => {
  if (product.value != null) {
    addBreadCrumbs(product.value!);
  }

})

watch(product, (value) => {
  if (value != null) {
    addBreadCrumbs(value!);
  }
})



function addBreadCrumbs(value: Product) {
  breadcrumbs.value.push({
    link: null,
    text: value.modification.modelCar.name.toString()
  })
  breadcrumbs.value.push({
    link: null,
    text: value.category.toString()
  })
}



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




</script>
<template>
  <div class="mx-auto relative container px-4">

    {{product }} asdasd {{data}}
    <div v-if="product" class="mt-4 grid relative w-full grid-cols-1 lg:grid-cols-[500px_1fr] gap-5">
      <div class="order-2 lg:order-1">
        <div class="p-5 w-full bg-white rounded-lg hidden lg:block">
          <ProductSlider :pictures="product?.pictures"></ProductSlider>
        </div>
        <div class="p-5 w-full text-sm lg:mt-5 bg-white rounded-lg">
          <h2 class="font-bold text-lg">Машина</h2>
          <div>
            <ul>
              <li class="flex py-3 justify-between -b">
                <div class="font-light text-slate-500">
                  Модификация
                </div>
                <p class="font-light">
                  {{ product.modification.modelCar.name }} (2015, {{ product.modification.power }}kw,
                  {{ product.modification.capacity }}l)
                </p>
              </li>

              <li class="flex py-3 justify-between -b">
                <div class="font-light text-slate-500">
                  Год
                </div>
                <p class="font-light">
                  {{ product.modification.modelCar.startDate }}
                </p>
              </li>

              <li class="flex py-3 justify-between -b">
                <div class="font-light text-slate-500">
                  Тип топлива
                </div>
                <p class="font-light">
                  {{ product.modification.fuelType }}
                </p>
              </li>

              <li class="flex py-3 justify-between -b">
                <div class="font-light text-slate-500">
                  Объем двигателя
                </div>
                <p class="font-light">
                  {{ product.modification.capacity }} l
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
                  Тип кузова
                </div>
                <p class="font-light">
                  {{ product.modification.bodyType }}
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
                  {{ product.modification.power }} kW
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="order-1 lg:order-2">
        <div class="lg:sticky lg:top-20 z-10">
          <div class=" bg-white rounded-lg p-5">
            <h1 class="text-lg block lg:hidden lg:text-2xl font-bold">{{ product.modification.modelCar.name }} (
              {{ product.modification.modelCar.startDate }} - {{ product.modification.modelCar.endDate }}
              ) {{ product.name }}</h1>
            <ProductMobileSlider :pictures="product?.pictures" class="lg:hidden mt-3"></ProductMobileSlider>
            <h1 class="text-lg hidden lg:block lg:text-2xl font-bold">{{ product.modification.modelCar.name }} (
              {{ product.modification.modelCar.startDate }} - {{ product.modification.modelCar.endDate }}
              ) {{ product.name }}</h1>
            <div class="mt-2">
              <span>Код товара в системе: </span><span
                class="text-blue-600 hover:underline cursor-pointer">{{ product.id }}</span>
            </div>
            <div class="flex justify-between flex-col lg:flex-row gap-2 lg:gap-0 lg:items-center mt-3">
              <div class="text-2xl font-bold">{{ product.price }} ₸</div>
              <n-button @click="isOpenCart = true" v-if="cardStorage.checkInGoods(product.id)">
                Товар в корзине
              </n-button>
              <n-button type="primary" v-else @click="addGoods">
                Купить
              </n-button>
            </div>
          </div>
          <div
              class="grid grid-cols-1 lg:grid-cols-3 rounded-lg bg-white lg:gap-2 py-5 px-5 justify-between my-4 gap-5">
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
            <n-select class="mt-5" v-model:value="countryId" :options="countryOptions"
                      placeholder="Выберите страну"></n-select>
            <table class="table-auto text-sm mt-5 w-full">
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


