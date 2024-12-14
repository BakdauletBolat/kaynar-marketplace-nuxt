<script setup lang="ts">
import { isOpenCart, isOpenSidebar, CardStorage } from "@/storages/storage";
import { useRoute, useRouter } from "vue-router";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import Logo from "@/assets/images/logo.png";
import { NInput, NIcon, NImage, NAffix } from "naive-ui";
import {
    Search,
    PersonOutline,
    HeartOutline,
    BagOutline,
} from "@vicons/ionicons5";

const searchWord = ref();
const router = useRouter();
const cardStorage = CardStorage.getInstance();
const containerRef = ref<HTMLElement | undefined>(undefined);

const navigation = [
    { name: "Автозапчасти", to: "index" },
    { name: "Колеса и шины", to: "catalog-kolesa-and-shin" },
    { name: "Купить онлайн", to: "pay" },
];

function searchAndNavigateCatalog() {
    router.push({
        name: "catalog",
        query: {
            search: searchWord.value,
        },
    });
}

function openSidebar() {
    isOpenSidebar.value = true;
}

function openCart() {
    isOpenCart.value = true;
}

const route = useRoute();
</script>

<template>
    <div class="w-full" ref="containerRef">
        <section
            id="testHeader"
            class="w-full bg-black z-[9999] lg:border-b border-b-slate-100"
        >
            <div
                class="mx-auto justify-between gap-2 bg-black items-center text-white flex container px-4 p-2"
            >
                <div class="flex items-center gap-5">
                    <nuxt-link
                        class="flex gap-5"
                        :to="{name: 'index'}"
                    >
                        <div>
                            <n-image
                                preview-disabled
                                class="w-12 h-12"
                                alt="Лого"
                                :src="Logo"
                            />
                        </div>
                    </nuxt-link>
                    <n-input-group>
                        <n-input
                            v-model:value="searchWord"
                            round
                            type="text"
                            size="large"
                            placeholder="Искать"
                        ></n-input>
                        <n-button
                            @click="searchAndNavigateCatalog"
                            size="large"
                            round
                            type="primary"
                        >
                            <n-icon :component="Search" />
                        </n-button>
                    </n-input-group>
                </div>
                <div class="flex gap-3">
                    <nuxt-link
                        :to="{name: 'auth-profile'}"
                        class="cursor-pointer hidden md:block"
                    >
                        <PersonOutline class="w-6 h-6"></PersonOutline>
                    </nuxt-link>
                    <nuxt-link
                        :to="{name: 'auth-favorites'}"
                        class="cursor-pointer hidden lg:block"
                    >
                        <HeartOutline class="w-6 h-6"></HeartOutline>
                    </nuxt-link>
                    <client-only>
                        <div class="cursor-pointer" @click="openCart">
                            <n-badge
                                :value="cardStorage.goods.value.length"
                                :max="10"
                            >
                                <BagOutline class="w-6 h-6"></BagOutline>
                            </n-badge>
                        </div>
                    </client-only>
                    <div @click="openSidebar" class="cursor-pointer">
                        <Bars3Icon class="w-6 h-6"></Bars3Icon>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white hidden lg:block w-full">
            <div class="mx-auto container px-4">
                <div class="flex p-2 items-center justify-between">
                    <div class="flex items-baseline">
                        <nuxt-link
                            v-for="item in navigation"
                            :key="item.name"
                            :to="{ name: item.to }"
                            :class="[
                                item.to == route.name
                                    ? 'underline underline-offset-2'
                                    : 'hover:black',
                                'rounded-sm px-3 py-2 text-sm',
                            ]"
                            :aria-current="
                                item.to == route.name ? 'page' : undefined
                            "
                        >
                            {{ item.name }}
                        </nuxt-link>
                    </div>
                    <ul class="flex gap-2 text-xs cursor-pointer">
                        <nuxt-link
                            :to="{name: 'delivery'}"
                            class="hover:underline"
                            >Доставка</nuxt-link
                        >
                        <nuxt-link
                            :to="{name: 'refund'}"
                            class="hover:underline"
                            >Возврат</nuxt-link
                        >
                        <nuxt-link
                            :to="{name: 'pay'}"
                            class="hover:underline"
                            >Оплата</nuxt-link
                        >
                        <nuxt-link
                            :to="{ name: 'contacts' }"
                            class="hover:underline"
                            >Контакты</nuxt-link
                        >
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped></style>
