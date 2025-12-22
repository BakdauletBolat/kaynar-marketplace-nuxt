<script setup lang="ts">
import { isOpenSidebar } from "~/storages/storage";
import AppFooter from "~/components/footer.vue";
import AppHeader from '~/components/header.vue';
import MobileHeader from "~/components/mobile-header.vue";
import BottomAppBar from "~/components/bottom-app-bar.vue";
import AppDrawerContent from "~/components/app-drawer-content.vue";
import { NDrawer, NDrawerContent } from "naive-ui";
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

const route = useRoute();
const breakpoints = useBreakpoints(breakpointsTailwind);

// Используем lg (1024px) как границу, так же как в header.vue
const isMobile = breakpoints.smaller('lg');

// Футер показываем только на главной (сохранение старой логики)
const showFooter = computed(() => route.name === 'index');
// Хедер показываем только на главной, так как на других страницах свои заголовки
const showHeader = computed(() => route.name === 'index');
</script>

<template>
    <!-- Нижняя навигация (Скрыта на Desktop через CSS внутри компонента) -->
    <bottom-app-bar />

    <!-- Боковое меню (Drawer) -->
    <n-drawer 
        v-model:show="isOpenSidebar" 
        :width="isMobile ? '85%' : '400px'" 
        placement="right"
        :trap-focus="false"
        :block-scroll="isMobile"
    >
        <n-drawer-content title="Меню" closable>
            <app-drawer-content />
        </n-drawer-content>
    </n-drawer>

    <div class="relative min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50 pb-[80px] lg:pb-0">
        <!-- Desktop Header (Скрыт на Mobile через CSS внутри компонента) -->
        <app-header/>

        <!-- Mobile Header (Скрыт на Desktop через CSS внутри компонента) -->
        <mobile-header v-if="showHeader" />

        <!-- Main Content -->
        <main class="flex-grow w-full">
            <slot></slot>
        </main>

        <global-request-button />

        <!-- Footer -->
        <app-footer v-if="showFooter"></app-footer>
    </div>
</template>

<style>
/* Глобальные стили если нужны, но стараемся использовать Tailwind */
</style>
