<template>
  <main class="bg-gray-100 dark:bg-black min-h-screen pb-40 lg:pb-12 font-sans text-[#242424] dark:text-[#ebebeb]">
    
    <!-- Functional Header (Sticky Address Selector) -->
    <div class="bg-white dark:bg-[#202022] sticky top-0 z-40 px-3 py-2 shadow-sm transition-colors">
       <div class="container mx-auto max-w-[800px] flex items-center gap-2">
           <div class="flex-1 flex flex-col justify-center cursor-pointer" @click="handleAddressClick">
              <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>Адрес</span>
                  <ChevronDownIcon class="w-3 h-3" />
              </div>
              <div class="text-sm font-bold leading-tight line-clamp-1">
                  {{ selectedAddress ? selectedAddress.address : 'Выберите адрес доставки' }}
              </div>
           </div>

           <button v-if="cardStorage.goods.value.length > 0" @click="isEditMode = !isEditMode" class="text-sm text-primary font-medium px-2">
               {{ isEditMode ? 'Готово' : 'Изменить' }}
           </button>
       </div>
    </div>

    <!-- Main Content -->
    <section class="container mx-auto px-0 lg:px-4 mt-2 max-w-[800px]">
      
      <!-- Empty State -->
      <div v-if="cardStorage.goods.value.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
        <div class="w-24 h-24 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center mb-4">
           <CartIcon class="w-10 h-10 text-gray-400" />
        </div>
        <h2 class="text-lg font-bold mb-2">В корзине пусто</h2>
        <p class="text-sm text-gray-500 mb-6 max-w-[250px] mx-auto">
          Исправьте это, выбрав что-нибудь из каталога
        </p>
        <n-button @click="routeToCatalog" type="primary" color="#F29F05" class="!px-8 !h-10 !rounded-lg !font-bold">
          В каталог
        </n-button>
      </div>

      <div v-else class="space-y-2">
        
        <!-- 1. Cart Items Group -->
        <div class="bg-white dark:bg-[#202022] lg:rounded-2xl p-3 pb-1">
           <div class="flex justify-between items-center mb-2 px-1">
              <h2 class="text-lg font-bold">Корзина <span class="text-gray-400 text-sm font-normal ml-1">{{ cardStorage.goods.value.length }} тов.</span></h2>
              <div class="text-xs text-gray-400" v-if="isEditMode">Выбрано: {{ selectedItemsCount }}</div>
           </div>
           
           <!-- Select All Checkbox (Optional logic placeholder) -->
           <!-- <div class="flex items-center gap-3 px-1 mb-3 pb-3 border-b border-gray-100 dark:border-white/5">
               <n-checkbox :checked="true">Выбрать все</n-checkbox>
           </div> -->

           <div class="space-y-3">
               <div v-for="item in cardStorage.goods.value" :key="item.id" class="relative group">
                   <!-- Custom Basket Item UI -->
                   <div class="flex gap-3">
                       <!-- Checkbox for edit mode -->
                       <div v-if="isEditMode" class="flex items-center">
                           <n-checkbox />
                       </div>

                       <!-- Image -->
                       <div class="w-20 h-24 flex-shrink-0 bg-gray-100 dark:bg-white/5 rounded-md overflow-hidden relative">
                           <img :src="item.picture_url ?? 'https://demofree.sirv.com/nope-not-here.jpg'" class="w-full h-full object-cover" />
                           <div v-if="item.quantity > 1" class="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1.5 rounded-md backdrop-blur-sm">
                               x{{ item.quantity }}
                           </div>
                       </div>

                       <!-- Details -->
                       <div class="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                           <div>
                               <div class="text-[10px] text-gray-400 mb-0.5">Бренд товара</div>
                               <h3 class="text-sm leading-4 font-normal text-black dark:text-white line-clamp-2 mb-1">
                                   {{ item.name }}
                               </h3>
                               <div class="text-xs text-gray-400">Арт: {{ item.id }}</div>
                           </div>
                           
                           <div class="flex items-end justify-between mt-2">
                               <div class="flex items-baseline gap-2">
                                   <span class="text-base font-bold">{{ getPrice(item.price) }}</span>
                                   <!-- <span class="text-xs text-gray-400 line-through decoration-red-500">{{ getPrice(item.price * 1.3) }}</span> -->
                               </div>
                               
                               <!-- Quantity Controls (Small) -->
                               <div class="flex items-center bg-gray-50 dark:bg-white/5 rounded-md h-7" v-if="!isEditMode">
                                    <button @click="cardStorage.decreaseGood(item.id)" class="w-7 h-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 rounded-l-md transition-colors">
                                        <RemoveIcon class="w-3 h-3 text-gray-600 dark:text-gray-300" />
                                    </button>
                                    <div class="w-6 text-center text-xs font-medium">{{ item.quantity }}</div>
                                    <button @click="cardStorage.increaseGood(item.id)" class="w-7 h-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 rounded-r-md transition-colors">
                                        <AddIcon class="w-3 h-3 text-gray-600 dark:text-gray-300" />
                                    </button>
                               </div>
                           </div>
                       </div>
                   </div>
                   
                   <div v-if="!isEditMode" class="border-b border-gray-100 dark:border-white/5 mt-3 last:border-0"></div>
               </div>
           </div>
        </div>

        <!-- 2. Personal Info Compact -->
        <div class="bg-white dark:bg-[#202022] lg:rounded-2xl p-4">
             <h3 class="font-bold text-base mb-3">Получатель</h3>
             <div class="grid grid-cols-1 gap-3">
                 <div class="bg-gray-50 dark:bg-white/5 rounded-xl px-3 py-2 border border-transparent focus-within:border-primary/50 transition-colors">
                     <label class="text-[10px] text-gray-400 block uppercase tracking-wide">Имя</label>
                     <input v-model="orderStore.userInfo.first_name" type="text" class="bg-transparent w-full text-base font-medium outline-none text-black dark:text-white placeholder-gray-300" placeholder="Введите имя">
                 </div>
                 <div class="bg-gray-50 dark:bg-white/5 rounded-xl px-3 py-2 border border-transparent focus-within:border-primary/50 transition-colors">
                     <label class="text-[10px] text-gray-400 block uppercase tracking-wide">Фамилия</label>
                     <input v-model="orderStore.userInfo.last_name" type="text" class="bg-transparent w-full text-base font-medium outline-none text-black dark:text-white placeholder-gray-300" placeholder="Введите фамилию">
                 </div>
                 <div class="bg-gray-50 dark:bg-white/5 rounded-xl px-3 py-2 border border-transparent focus-within:border-primary/50 transition-colors">
                     <label class="text-[10px] text-gray-400 block uppercase tracking-wide">Телефон</label>
                     <input v-model="orderStore.userInfo.phone_number" type="tel" class="bg-transparent w-full text-base font-medium outline-none text-black dark:text-white placeholder-gray-300" placeholder="+7 (___) ___-__-__">
                 </div>
             </div>
        </div>

        <!-- 3. Payment Method -->
        <div class="bg-white dark:bg-[#202022] lg:rounded-2xl p-4 flex justify-between items-center">
             <div class="flex items-center gap-3">
                 <div class="w-8 h-8 bg-gray-100 dark:bg-white/5 rounded-lg flex items-center justify-center text-lg">💳</div>
                 <div>
                     <div class="text-sm font-bold">Картой при получении</div>
                     <!-- <div class="text-xs text-gray-400">Спишем 3 500 ₸</div> -->
                 </div>
             </div>
             <ChevronForwardIcon class="w-4 h-4 text-gray-300" />
        </div>

      </div>
    </section>

    <!-- Sticky Bottom Bar -->
    <div v-if="cardStorage.goods.value.length > 0" class="fixed bottom-[56px] lg:bottom-0 left-0 w-full bg-white dark:bg-[#202022] border-t border-gray-100 dark:border-white/5 pb-6 pt-3 px-4 z-40 safe-area-bottom shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div class="container mx-auto max-w-[800px]">
            <div class="flex justify-between items-end mb-3">
                <span class="text-sm text-gray-500 font-medium">Итого</span>
                <span class="text-xl font-bold text-black dark:text-white">{{ getPrice(cardStorage.totalCost) }}</span>
            </div>
            <button 
                v-if="isAuthenticated"
                @click="handleOrder"
                :disabled="!isValidOrder || orderStore.isOrderCreateLoading"
                class="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold h-12 rounded-xl text-base shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                <span v-if="orderStore.isOrderCreateLoading"><n-spin size="small" stroke="#fff" /></span>
                <span v-else>Заказать</span>
            </button>
            <NuxtLink
                v-else
                :to="{ name: 'auth-selection' }"
                class="w-full bg-primary hover:bg-primary-hover text-white font-bold h-12 rounded-xl text-base shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
                Перейти к регистрации
            </NuxtLink>
            <div v-if="isAuthenticated" class="text-[10px] text-center text-gray-400 mt-2">
                Нажимая кнопку, вы соглашаетесь с условиями использования
            </div>
        </div>
    </div>

    <!-- Address Selection Modal -->
    <n-modal v-model:show="showAddressModal" class="!w-full !max-w-[500px] !bg-white dark:!bg-[#202022] !rounded-t-2xl lg:!rounded-2xl !mb-0 lg:!mb-auto fixed bottom-0 lg:relative lg:bottom-auto animation-slide-up">
        <div class="p-0 flex flex-col h-[80vh] lg:h-auto">
            <div class="p-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                <h3 class="text-lg font-bold">Способ доставки</h3>
                <button @click="showAddressModal = false" class="p-1 bg-gray-100 dark:bg-white/10 rounded-full">
                    <CloseIcon class="w-5 h-5 text-gray-500" />
                </button>
            </div>
            
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
                <!-- Add New Button -->
                <button @click="isCreatingAddress = true" class="w-full py-3 border-2 border-dashed border-primary/30 hover:bg-primary/5 rounded-xl flex items-center justify-center gap-2 text-primary font-bold transition-colors">
                    <AddIcon class="w-5 h-5" />
                    <span>Добавить новый адрес</span>
                </button>

                <!-- Address List -->
                <div v-if="isCreatingAddress" class="space-y-3 bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                     <div class="flex justify-between items-center mb-2">
                         <h4 class="font-bold text-sm">Новый адрес</h4>
                         <button @click="isCreatingAddress = false" class="text-xs text-red-500">Отмена</button>
                     </div>
                     <input v-model="newAddress.address" placeholder="Город, улица" class="w-full p-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-black text-base outline-none focus:border-primary">
                     <div class="grid grid-cols-3 gap-2">
                         <input v-model="newAddress.building" placeholder="Дом" class="w-full p-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-black text-base outline-none focus:border-primary">
                         <input v-model="newAddress.apartment" placeholder="Кв." class="w-full p-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-black text-base outline-none focus:border-primary">
                         <input v-model="newAddress.postal_code" placeholder="Индекс" class="w-full p-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-black text-base outline-none focus:border-primary">
                     </div>
                     <button @click="()=>createNewAddress(authStore.user?.id)" :disabled="!newAddress.address" class="w-full bg-primary text-white py-2 rounded-lg font-bold text-sm disabled:opacity-50">
                         Сохранить
                     </button>
                </div>

                <div v-else class="space-y-2">
                    <div v-if="orderStore.isAddressLoading" class="flex justify-center py-4">
                        <n-spin size="small" />
                    </div>
                    <div v-else-if="orderStore.addresses.length === 0" class="text-center text-gray-400 py-4 text-sm">
                        Нет сохраненных адресов
                    </div>
                    <div 
                        v-for="addr in orderStore.addresses" 
                        :key="addr.id"
                        @click="selectAddress(addr)"
                        class="p-3 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all"
                        :class="orderStore.selectedAddressId === addr.id ? 'border-primary bg-primary/5' : 'border-transparent bg-gray-50 dark:bg-white/5 hover:bg-gray-100'"
                    >
                         <div class="mt-0.5">
                             <div class="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                                 <div v-if="orderStore.selectedAddressId === addr.id" class="w-2.5 h-2.5 rounded-full bg-primary"></div>
                             </div>
                         </div>
                         <div>
                             <div class="font-bold text-sm">{{ addr.address }}</div>
                             <div class="text-xs text-gray-500">{{ [addr.building, addr.apartment ? `кв. ${addr.apartment}` : ''].filter(Boolean).join(', ') }}</div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </n-modal>

  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, reactive } from 'vue';
import { NButton, NModal, NCheckbox, NSpin, useMessage } from "naive-ui";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { 
    CartOutline as CartIcon, 
    ChevronDownOutline as ChevronDownIcon,
    ChevronForwardOutline as ChevronForwardIcon,
    AddOutline as AddIcon,
    RemoveOutline as RemoveIcon,
    CloseOutline as CloseIcon
} from "@vicons/ionicons5";
import { CardStorage } from "@/storages/storage";
import { useOrderStore, type Address } from "~/storages/order-store";
import { useAuthStore } from "~/storages/auth-store";
import { getPrice } from "~/utils/getPrice";

const router = useRouter();
const message = useMessage();
const cardStorage = CardStorage.getInstance();
const orderStore = useOrderStore();
const authStore = useAuthStore();

const showAddressModal = ref(false);
const isEditMode = ref(false);
const isCreatingAddress = ref(false);
const isAuthenticated = computed(() => Boolean(authStore.user?.id));

const newAddress = reactive<Address>({
    address: '',
    postal_code: '',
    apartment: '',
    building: '',
    user_id: undefined
});

onMounted(async () => {
    const user = await authStore.loadUser();
    if (user) {
        orderStore.updateUserInfo({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            phone_number: user.phone || '',
        });
        if (user.id) {
            await orderStore.loadAddresses(user.id);
        }
    }
});

const selectedAddress = computed(() => {
    return orderStore.addresses.find(a => a.id === orderStore.selectedAddressId);
});

const selectedItemsCount = computed(() => {
    return 0; // Placeholder logic for checkbox selection
});

const isValidOrder = computed(() => {
    return (
        orderStore.selectedAddressId !== undefined &&
        orderStore.userInfo.first_name &&
        orderStore.userInfo.phone_number &&
        cardStorage.goods.value.length > 0
    );
});

function routeToCatalog() {
  router.push({ name: "catalog" });
}

function handleAddressClick() {
    if (!isAuthenticated.value) {
        router.push({ name: "auth-selection" });
        return;
    }
    showAddressModal.value = true;
}

function selectAddress(addr: any) {
    orderStore.selectedAddressId = addr.id;
    showAddressModal.value = false;
}

async function createNewAddress(userId?: number) {
    try {
        await orderStore.createAddress({ ...newAddress, user_id: userId });
        message.success("Адрес добавлен");
        isCreatingAddress.value = false;
        // Reset
        newAddress.address = '';
        newAddress.building = '';
        newAddress.apartment = '';
        newAddress.postal_code = '';
    } catch (e) {
        message.error("Не удалось добавить адрес");
    }
}

async function handleOrder() {
    try {
        await orderStore.createOrder();
        message.success("Заказ успешно оформлен!");
        router.push({ name: 'auth-orders' });
    } catch (e) {
        message.error("Ошибка при оформлении заказа");
        console.error(e);
    }
}
</script>

<style scoped>
/* Disable native inputs styling for cleaner look */
input {
    -webkit-appearance: none;
    appearance: none;
}
</style>
