<script setup lang="ts">
import { isOpenCart, isOpenSidebar } from "~/storages/storage";
import UserCard from "~/components/user-card.vue";
import AppFooter from "~/components/footer.vue";
import AppHeader from '~/components/header.vue';
import { NDrawer, NDrawerContent, NButton, NDivider } from "naive-ui";
import {
    HelpCircle,
    PersonOutline,
    HeartOutline,
} from "@vicons/ionicons5";
const widthRef = ref(0);
const router = useRouter();
const route = useRoute();

const deliveryRoute = {
  name: 'delivery'
}

const isMobile = computed<boolean>(() => {
    return widthRef.value <= 500;
});

function navigateToOrder() {
    isOpenCart.value = false;
    router.push({
        name: "order-create",
    });
}

function closeCart() {
  isOpenCart.value = false;
}

const showFooter = computed(() => String(route.name ?? '') === 'index');

onMounted(() => {
    widthRef.value = window.innerWidth;
    function reportWindowSize() {
        widthRef.value = window.innerWidth;
    }
    window.onresize = reportWindowSize;
});
</script>

<template>
    <client-only>
      <bottom-app-bar></bottom-app-bar>
    </client-only>
    <n-drawer :width="isMobile ? '80%' : '400px'" v-model:show="isOpenSidebar">
        <n-drawer-content title="Меню" closable>
            <div>
                <div class="mb-4">
                    <ul class="flex gap-2 flex-col text-xs cursor-pointer">
                        <nuxt-link
                            @click="closeCart"
                            :to="deliveryRoute"
                            class="hover:underline">
                          Доставка
                        </nuxt-link>
                        <nuxt-link
                            @click="closeCart"
                            :to="{
                                name: 'refund',
                            }"
                            class="hover:underline"
                            >Возврат</nuxt-link
                        >
                        <nuxt-link
                            @click="closeCart"
                            :to="{
                                name: 'pay',
                            }"
                            class="hover:underline"
                            >Оплата</nuxt-link
                        >
                        <nuxt-link
                            @click="closeCart"
                            :to="{ name: 'contacts' }"
                            class="hover:underline"
                            >Контакты</nuxt-link
                        >
                    </ul>
                </div>
                <n-divider></n-divider>
                <div class="flex flex-col gap-2">
                    <nuxt-link
                        @click="closeCart"
                        :to="{
                            name: 'auth-profile',
                        }"
                        class="cursor-pointer flex gap-2"
                    >
                        <PersonOutline
                            class="w-6 text-black h-6"
                        ></PersonOutline>
                        <div>Профиль</div>
                    </nuxt-link>
                    <nuxt-link
                        @click="closeCart"
                        :to="{
                            name: 'auth-favorites',
                        }"
                        class="cursor-pointer flex gap-2"
                    >
                        <HeartOutline class="w-6 text-black h-6"></HeartOutline>
                        <div>Избранные</div>
                    </nuxt-link>
                    <nuxt-link
                        @click="closeCart"
                        :to="{
                            name: 'feadback',
                        }"
                        class="cursor-pointer flex gap-2"
                    >
                        <HelpCircle class="w-6 text-black h-6"></HelpCircle>
                        <div>Покупка в один клик</div>
                    </nuxt-link>
                </div>
            </div>
        </n-drawer-content>
    </n-drawer>
    <div class="relative min-h-full">
        <app-header></app-header>
        <div>
            <slot></slot>
        </div>
        <app-footer v-if="showFooter"></app-footer>
    </div>
</template>

<style>
</style>
