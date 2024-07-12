<template>
    <main class="max-w-7xl mx-auto p-3">
        <TabGroup :selected-index="selectedIndex" @change="changeTab">
            <TabList class="grid grid-cols-4 p-3 justify-center gap-2">
                <Tab :disabled="order" as="template" v-slot="{ selected }">
                    <button  :class="{'!bg-gray-400 opacity-50': order, 'focus:outline-none !bg-primary -translate-y-1': selected }"
                        class="bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg">
                        <MapIcon class="h-5 w-5"></MapIcon>
                        <div>Адрес</div>
                    </button>
                </Tab>
                <Tab :disabled="order" as="template" v-slot="{ selected }">
                    <button :class="{'!bg-gray-400 opacity-50': order,  'focus:outline-none -translate-y-1 !bg-primary': selected }"
                        class="bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg">
                        <TruckIcon class="w-5 h-5"></TruckIcon>
                        <div>Доставка</div>
                    </button>
                </Tab>
                <Tab :disabled="order" as="template" v-slot="{ selected }">
                    <button :class="{'!bg-gray-400 opacity-50': order,  'focus:outline-none -translate-y-1 !bg-primary': selected }"
                        class="bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg">
                        <BanknotesIcon class="w-5 h-5"></BanknotesIcon>
                        <div>Оплата</div>
                    </button>
                </Tab>
                <Tab :disabled="order" as="template" v-slot="{ selected }">
                    <button :class="{ 'focus:outline-none -translate-y-1 !bg-primary': selected }"
                        class="bg-white px-4 flex flex-col items-center gap-1 py-2 rounded-lg">
                        <CheckBadgeIcon class="w-5 h-5"></CheckBadgeIcon>
                        <div>Спасибо!</div>
                    </button>
                </Tab>
            </TabList>
            <div class="grid lg:grid-cols-[1fr_400px] gap-5">
                <div>
                    <TabPanels>
                        <TabPanel>
                            <form @submit="onSubmit" class="flex rounded-lg p-4 bg-white flex-col gap-3">
                                <div class="text-2xl font-bold">Адрес доставки</div>
                                <div class="flex flex-col lg:flex-row gap-3">
                                    <Input name="name" placeholder="Имя"></Input>
                                    <Input name="surname" placeholder="Фамилия"></Input>
                                </div>
                                <div class="flex flex-col lg:flex-row gap-3">
                                    <Input name="address" placeholder="Адрес"></Input>
                                    <div class="flex gap-3">
                                        <Input name="house" placeholder="Дом"></Input>
                                        <Input name="flat" placeholder="Квартира"></Input>
                                    </div>
                                </div>
                                <div class="flex  flex-col lg:flex-row gap-3">
                                    <div class="flex gap-3">
                                        <Input name="mail_index" placeholder="Почтовый индекс"></Input>
                                        <Input name="country" placeholder="Страна"></Input>
                                    </div>
                                    <Input name="city" placeholder="Город" />
                                </div>
                                <div class="flex  flex-col lg:flex-row gap-3">
                                    <Input name="email" placeholder="Email"></Input>
                                    <Input name="phone" placeholder="Телефон"></Input>
                                </div>
                                <button
                                    class="mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg">Продолжить</button>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <div class="flex p-4 rounded-lg bg-white flex-col gap-3">
                                <div class="text-2xl font-bold">Доставка</div>
                                <RadioGroup v-model="plan" class="flex flex-col gap-3">
                                    <RadioGroupOption v-slot="{ checked }" value="1">
                                        <div class="flex justify-between cursor-pointer p-3" :class="{
                                            'bg-slate-100': checked
                                        }">
                                            <div class="flex flex-col">
                                                <h3 class="font-bold text-lg">LP express</h3>
                                                <p class="text-gray-500 font-light">В следующем месяце, 2024 03 04</p>
                                            </div>
                                            <div>
                                                <div>42,40 €</div>
                                            </div>
                                        </div>
                                    </RadioGroupOption>
                                    <RadioGroupOption v-slot="{ checked }" value="2">
                                        <div class="flex justify-between cursor-pointer p-3" :class="{
                                            'bg-slate-100': checked
                                        }">
                                            <div class="flex flex-col">
                                                <h3 class="font-bold text-lg">Заберите сам</h3>
                                                <p class="text-gray-500 font-light"></p>
                                            </div>
                                            <div>
                                                <div>42,40 €</div>
                                            </div>
                                        </div>
                                    </RadioGroupOption>
                                    <RadioGroupOption v-slot="{ checked }" value="3">
                                        <div class="flex justify-between cursor-pointer p-3" :class="{
                                            'bg-slate-100': checked
                                        }">
                                            <div class="flex flex-col">
                                                <h3 class="font-bold text-lg">FedEx Plus</h3>
                                                <p class="text-gray-500 font-light">Сегодня, 2024 03 04</p>
                                            </div>
                                            <div>
                                                <div>42,40 €</div>
                                            </div>
                                        </div>
                                    </RadioGroupOption>

                                </RadioGroup>
                                <button @click="changeTab(2)"
                                    class="mt-3 bg-primary p-3 text-center cursor-pointer rounded-lg">Продолжить</button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div class="flex rounded-lg p-4 bg-white flex-col gap-3">
                                <div class="text-2xl font-bold">Оплата</div>
                                <RadioGroup v-model="pay" class="flex flex-col gap-3">
                                    <RadioGroupOption v-slot="{ checked }" value="1">
                                        <div class="flex justify-between cursor-pointer p-3" :class="{
                                            'bg-slate-100': checked
                                        }">
                                            <div class="flex flex-col">
                                                <h3 class="text-lg">Банковская карта</h3>
                                            </div>
                                            <div>
                                                <div><CreditCardIcon class="w-5 h-5"></CreditCardIcon></div>
                                            </div>
                                        </div>
                                    </RadioGroupOption>
                                    <RadioGroupOption v-slot="{ checked }" value="2">
                                        <div class="flex justify-between cursor-pointer p-3" :class="{
                                            'bg-slate-100': checked
                                        }">
                                            <div class="flex flex-col">
                                                <h3 class="text-lg">Наличные</h3>
                                            </div>
                                            <div>
                                                <div><BanknotesIcon class="w-5 h-5"></BanknotesIcon></div>
                                            </div>
                                        </div>
                                    </RadioGroupOption>
                                </RadioGroup>
                                <Button :isLoading="orderCreateLoading" @click="createOrder" name="Продолжить"></Button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div v-if="order" class="flex p-4 bg-white rounded-lg flex-col gap-3">
                               <h2>Спасибо #{{order.id}} ваш заказ создан !</h2>
                                <p>В скором времени вам позвонит наш менеджер</p>
                              <p>Спасибо за ваш заказ! Наш менеджер скоро свяжется с вами для дальнейшей информации.</p>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </div>
                <div class="bg-white rounded-lg p-4">
                    <h2 class="text-xl font-bold">Информация о заказе</h2>
                    <UserCard class="mt-3"></UserCard>
                </div>
            </div>

        </TabGroup>
    </main>
</template>
<script lang="ts" setup>
import {
    TabGroup, TabList, Tab, TabPanels, TabPanel, RadioGroup,
    RadioGroupOption,
} from '@headlessui/vue';
import { MapIcon, TruckIcon, BanknotesIcon, CheckBadgeIcon,CreditCardIcon } from '@heroicons/vue/24/outline';
import Input from '@/components/Input/index.vue';
import { useForm } from 'vee-validate';
import UserCard from '@/components/UserCard.vue';
import { ref } from 'vue';
import { CardStorage } from '@/storages/storage';
import * as yup from 'yup';
import axiosInstance from '@/api';
import {addError} from '@/components/Errors';
import Button from '@/components/Button';
const order = ref<any>(null);

const plan = ref('2');
const pay = ref('1');

const cardStorage = CardStorage.getInstance();

const selectedIndex = ref(0);
const orderCreateLoading = ref(false);



const { handleSubmit } = useForm({
    validationSchema: yup.object({
        name: yup.string().required('Имя обязательно'),
        surname: yup.string().required('Фамилия обязательно'),
        address: yup.string().required('Адрес обязательно'),
        house: yup.string(),
        flat: yup.string(),
        mail_index: yup.string().required('Почтовой индекс обязательно'),
        country: yup.string(),
        city: yup.string().required('Город обязательно'),
        email: yup.string().required('Почта обязательно').email('Почта неправильный'),
        phone: yup.string().required('Телефон обязательно')
    })
});



function changeTab(index: number) {
    window.scrollTo({
        top: 0
    })
    selectedIndex.value = index;
}



function createOrder() {
    
    const body = {
    "warehouse_id":2,
    "payment_type_id": pay.value,
    "delivery_type_id": plan.value,
    "comment": null,
    "client": "Гость",
    "goods": cardStorage.goods.value.map(item=>{
        return {
            "product_id": item.id,
            "quantity": item.quantity,
            "quality_id": 1
        }
    }) 
    }
    orderCreateLoading.value = true;
    axiosInstance.post('/api/orders/', body).then((res)=>{
        selectedIndex.value = 3; 
        order.value = res.data;
        cardStorage.resetCard();
    }).catch(e=>{
        addError({
            timeout: 5,
            message: e.toString(),
        });
    }).finally(()=>{
        orderCreateLoading.value = false;
    });
}

const onSubmit = handleSubmit(values => {
    console.log(values);
    changeTab(1);
});

</script>