<template>
    <client-only>
        <main class="container px-4 mx-auto p-3">
            <tab-group :selected-index="selectedIndex" @change="changeTab">
                <tab-list
                    class="grid grid-cols-2 lg:grid-cols-4 p-3 justify-center gap-2"
                >
                    <tab :disabled="order" v-slot="{ selected }">
                        <n-button
                            class="w-full"
                            :type="selected ? 'primary' : 'default'"
                        >
                            <template #icon>
                                <map-icon class="h-5 w-5"></map-icon>
                            </template>
                            <div>Адрес</div>
                        </n-button>
                    </tab>
                    <tab :disabled="order" v-slot="{ selected }">
                        <n-button
                            class="w-full"
                            :type="selected ? 'primary' : 'default'"
                        >
                            <template #icon>
                                <truck-icon class="w-5 h-5"></truck-icon>
                            </template>
                            <div>Доставка</div>
                        </n-button>
                    </tab>
                    <tab :disabled="order" v-slot="{ selected }">
                        <n-button
                            class="w-full"
                            :type="selected ? 'primary' : 'default'"
                        >
                            <template #icon>
                                <banknotes-icon
                                    class="w-5 h-5"
                                ></banknotes-icon>
                            </template>
                            <div>Оплата</div>
                        </n-button>
                    </tab>
                    <tab :disabled="order" v-slot="{ selected }">
                        <n-button
                            class="w-full"
                            :type="selected ? 'primary' : 'default'"
                        >
                            <template #icon>
                                <check-badge-icon
                                    class="w-5 h-5"
                                ></check-badge-icon>
                            </template>
                            <div>Спасибо!</div>
                        </n-button>
                    </tab>
                </tab-list>
                <div class="grid lg:grid-cols-[1fr_400px] gap-5">
                    <div>
                        <tab-panels>
                            <tab-panel>
                                <form
                                    @submit="onSubmit"
                                    class="flex rounded-lg p-4 bg-white flex-col gap-3"
                                >
                                    <div class="text-2xl font-bold">
                                        Адрес доставки
                                    </div>
                                    <div
                                        class="flex flex-col lg:flex-row gap-3"
                                    >
                                        <n-input
                                            name="name"
                                            placeholder="Имя"
                                        ></n-input>
                                        <n-input
                                            name="surname"
                                            placeholder="Фамилия"
                                        ></n-input>
                                    </div>
                                    <div
                                        class="flex flex-col lg:flex-row gap-3"
                                    >
                                        <n-input
                                            name="address"
                                            placeholder="Адрес"
                                        ></n-input>
                                        <div class="flex gap-3">
                                            <n-input
                                                name="house"
                                                placeholder="Дом"
                                            ></n-input>
                                            <n-input
                                                name="flat"
                                                placeholder="Квартира"
                                            ></n-input>
                                        </div>
                                    </div>
                                    <div
                                        class="flex flex-col lg:flex-row gap-3"
                                    >
                                        <div class="flex gap-3">
                                            <n-input
                                                name="mail_index"
                                                placeholder="Почтовый индекс"
                                            ></n-input>
                                            <n-input
                                                name="country"
                                                placeholder="Страна"
                                            ></n-input>
                                        </div>
                                        <n-input
                                            name="city"
                                            placeholder="Город"
                                        />
                                    </div>
                                    <div
                                        class="flex flex-col lg:flex-row gap-3"
                                    >
                                        <n-input
                                            name="email"
                                            placeholder="Email"
                                        ></n-input>
                                        <n-input
                                            name="phone"
                                            placeholder="Телефон"
                                        ></n-input>
                                    </div>
                                    <n-button
                                        @click="() => changeTab(1)"
                                        class="mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg"
                                        >Продолжить</n-button
                                    >
                                </form>
                            </tab-panel>
                            <tab-panel>
                                <div
                                    class="flex p-4 rounded-lg bg-white flex-col gap-3"
                                >
                                    <div class="text-2xl font-bold">
                                        Доставка
                                    </div>
                                    <radio-group
                                        v-model="plan"
                                        class="flex flex-col gap-3"
                                    >
                                        <radio-group-option
                                            v-slot="{ checked }"
                                            value="1"
                                        >
                                            <div
                                                class="flex justify-between cursor-pointer p-3"
                                                :class="{
                                                    'bg-slate-100': checked,
                                                }"
                                            >
                                                <div class="flex flex-col">
                                                    <h3
                                                        class="font-bold text-lg"
                                                    >
                                                        LP express
                                                    </h3>
                                                    <p
                                                        class="text-gray-500 font-light"
                                                    >
                                                        В следующем месяце, 2024
                                                        03 04
                                                    </p>
                                                </div>
                                                <div>
                                                    <div>42,40 €</div>
                                                </div>
                                            </div>
                                        </radio-group-option>
                                        <radio-group-option
                                            v-slot="{ checked }"
                                            value="2"
                                        >
                                            <div
                                                class="flex justify-between cursor-pointer p-3"
                                                :class="{
                                                    'bg-slate-100': checked,
                                                }"
                                            >
                                                <div class="flex flex-col">
                                                    <h3
                                                        class="font-bold text-lg"
                                                    >
                                                        Заберите сам
                                                    </h3>
                                                    <p
                                                        class="text-gray-500 font-light"
                                                    ></p>
                                                </div>
                                                <div>
                                                    <div>42,40 €</div>
                                                </div>
                                            </div>
                                        </radio-group-option>
                                        <radio-group-option
                                            v-slot="{ checked }"
                                            value="3"
                                        >
                                            <div
                                                class="flex justify-between cursor-pointer p-3"
                                                :class="{
                                                    'bg-slate-100': checked,
                                                }"
                                            >
                                                <div class="flex flex-col">
                                                    <h3
                                                        class="font-bold text-lg"
                                                    >
                                                        FedEx Plus
                                                    </h3>
                                                    <p
                                                        class="text-gray-500 font-light"
                                                    >
                                                        Сегодня, 2024 03 04
                                                    </p>
                                                </div>
                                                <div>
                                                    <div>42,40 €</div>
                                                </div>
                                            </div>
                                        </radio-group-option>
                                    </radio-group>
                                    <n-button
                                        type="primary"
                                        round
                                        @click="changeTab(2)"
                                        class="mt-3"
                                        >Продолжить</n-button
                                    >
                                </div>
                            </tab-panel>
                            <tab-panel>
                                <div
                                    class="flex rounded-lg p-4 bg-white flex-col gap-3"
                                >
                                    <div class="text-2xl font-bold">Оплата</div>
                                    <radio-group
                                        v-model="pay"
                                        class="flex flex-col gap-3"
                                    >
                                        <radio-group-option
                                            v-slot="{ checked }"
                                            value="1"
                                        >
                                            <div
                                                class="flex justify-between cursor-pointer p-3"
                                                :class="{
                                                    'bg-slate-100': checked,
                                                }"
                                            >
                                                <div class="flex flex-col">
                                                    <h3 class="text-lg">
                                                        Банковская карта
                                                    </h3>
                                                </div>
                                                <div>
                                                    <div>
                                                        <credit-card-icon
                                                            class="w-5 h-5"
                                                        ></credit-card-icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </radio-group-option>
                                        <radio-group-option
                                            v-slot="{ checked }"
                                            value="2"
                                        >
                                            <div
                                                class="flex justify-between cursor-pointer p-3"
                                                :class="{
                                                    'bg-slate-100': checked,
                                                }"
                                            >
                                                <div class="flex flex-col">
                                                    <h3 class="text-lg">
                                                        Наличные
                                                    </h3>
                                                </div>
                                                <div>
                                                    <div>
                                                        <banknotes-icon
                                                            class="w-5 h-5"
                                                        ></banknotes-icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </radio-group-option>
                                    </radio-group>
                                    <n-button
                                        :isLoading="orderCreateLoading"
                                        @click="createOrder"
                                        type="primary"
                                        round
                                        >Продолжить</n-button
                                    >
                                </div>
                            </tab-panel>
                            <tab-panel>
                                <div
                                    v-if="order"
                                    class="flex p-4 bg-white rounded-lg flex-col gap-3"
                                >
                                    <h2>
                                        Спасибо #{{ order.id }} ваш заказ создан
                                        !
                                    </h2>
                                    <p>
                                        В скором времени вам позвонит наш
                                        менеджер
                                    </p>
                                    <p>
                                        Спасибо за ваш заказ! Наш менеджер скоро
                                        свяжется с вами для дальнейшей
                                        информации.
                                    </p>
                                </div>
                            </tab-panel>
                        </tab-panels>
                    </div>
                    <div class="bg-white rounded-lg p-4">
                        <h2 class="text-xl font-bold">Информация о заказе</h2>
                        <client-only>
                            <user-card class="mt-3"></user-card>
                        </client-only>
                    </div>
                </div>
            </tab-group>
        </main>
    </client-only>
</template>
<script lang="ts" setup>
import {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    RadioGroup,
    RadioGroupOption,
} from "@headlessui/vue";
import { NButton } from "naive-ui";
import {
    MapIcon,
    TruckIcon,
    BanknotesIcon,
    CheckBadgeIcon,
    CreditCardIcon,
} from "@heroicons/vue/24/outline";
import { useForm } from "vee-validate";
import UserCard from "~/components/user-card.vue";
import { ref } from "vue";
import { CardStorage } from "@/storages/storage";
import * as yup from "yup";
import axiosInstance from "@/api";

const order = ref<any>(null);

const plan = ref("2");
const pay = ref("1");

const cardStorage = CardStorage.getInstance();

const selectedIndex = ref(0);
const orderCreateLoading = ref(false);

const { handleSubmit } = useForm({
    validationSchema: yup.object({
        name: yup.string().required("Имя обязательно"),
        surname: yup.string().required("Фамилия обязательно"),
        address: yup.string().required("Адрес обязательно"),
        house: yup.string(),
        flat: yup.string(),
        mail_index: yup.string().required("Почтовой индекс обязательно"),
        country: yup.string(),
        city: yup.string().required("Город обязательно"),
        email: yup
            .string()
            .required("Почта обязательно")
            .email("Почта неправильный"),
        phone: yup.string().required("Телефон обязательно"),
    }),
});

function changeTab(index: number) {
    window.scrollTo({
        top: 0,
    });
    selectedIndex.value = index;
}

function createOrder() {
    const body = {
        warehouse_id: 2,
        payment_type_id: pay.value,
        delivery_type_id: plan.value,
        comment: null,
        client: "Гость",
        goods: cardStorage.goods.value.map((item) => {
            return {
                product_id: item.id,
                quantity: item.quantity,
                quality_id: 1,
            };
        }),
    };
    orderCreateLoading.value = true;
    axiosInstance
        .post("/api/orders/", body)
        .then((res) => {
            selectedIndex.value = 3;
            order.value = res.data;
            cardStorage.resetCard();
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => {
            orderCreateLoading.value = false;
        });
}

const onSubmit = handleSubmit((values) => {
    changeTab(1);
});
</script>
