<template>
    <div class="px-4 pt-16 mx-auto container md:px-24 lg:px-8">
        <div class="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <div class="sm:col-span-2">
                <div
                    aria-label="Домой"
                    title="Company"
                    class="inline-flex items-center"
                >
                    <n-image class="w-12 h-12 rounded-lg" :src="LogoKaynar" />
                    <span
                        class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase"
                        >Kaynar Avto</span
                    >
                </div>
                <div class="mt-6 lg:max-w-sm">
                    <p class="text-sm text-gray-800">
                        Мы предоставляем широкий ассортимент запчастей для
                        автомобилей различных марок и моделей.
                    </p>
                    <p class="mt-4 text-sm text-gray-800">
                        Наша цель — обеспечить качественные детали по доступным
                        ценам и надежное обслуживание.
                    </p>
                </div>
            </div>
            <div class="space-y-2 text-sm">
                <p class="text-base font-bold tracking-wide text-gray-900">
                    Контакты
                </p>
                <div class="flex">
                    <p class="mr-1 text-gray-800">Телефон:</p>
                    <a
                        href="tel:+7 777 523 88 88"
                        aria-label="Our phone"
                        title="Our phone"
                        class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >+7 777 523 88 88</a
                    >
                </div>
                <div class="flex">
                    <p class="mr-1 text-gray-800">Почта:</p>
                    <a
                        href="mailto:kaynaravto@mail.ru"
                        aria-label="Our email"
                        title="Our email"
                        class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >kaynaravto@mail.ru</a
                    >
                </div>
                <div class="flex">
                    <p class="mr-1 text-gray-800">Адрес:</p>
                    <a
                        href="https://www.google.com/maps"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Our address"
                        title="Our address"
                        class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        <span>г.Шымкент, ул. Сайрамская, 17А</span>
                        <br />
                        <span> г.Астана, ул. Кенжина, 8</span>
                    </a>
                </div>
            </div>
            <div>
                <span class="text-base font-bold tracking-wide text-gray-900"
                    >Социальные сети</span
                >
                <div class="flex items-center mt-1 space-x-3">
                    <a
                        href="https://www.instagram.com/kaynaravto/"
                        class="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                    >
                        <svg
                            viewBox="0 0 30 30"
                            fill="currentColor"
                            class="h-6"
                        >
                            <circle cx="15" cy="15" r="4"></circle>
                            <path
                                d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"
                            ></path>
                        </svg>
                    </a>
                </div>
                <p class="mt-4 text-sm text-gray-500">
                    Подпишитесь на нашу рассылку и будьте в курсе последних
                    новинок, акций и предложений
                </p>
            </div>
        </div>
        <div
            class="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row"
        >
            <p class="text-sm text-gray-600">
                © Copyright 2024 Kaynar Avto. Все права защищены.
            </p>
            <ul
                class="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row"
            >
                <li>
                    <a
                        href="/"
                        class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >Часто задаваемые вопросы (FAQ)</a
                    >
                </li>
                <li>
                    <a
                        href="/"
                        class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >Обратная связь</a
                    >
                </li>
                <li>
                    <a
                        href="/"
                        class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >Поиск по VIN коду</a
                    >
                </li>
                <li>
                    <a
                        href="/"
                        class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >Рекомендации по уходу</a
                    >
                </li>
                <li>
                    <a
                        href="/"
                        class="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >Вин код</a
                    >
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import LogoKaynar from "@/assets/images/logo.png";
import { NImage } from "naive-ui";
</script>
