<template>
    <div
        class="bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
        <div class="max-w-4xl w-full space-y-6">
            <div class="text-center">
                <h2 class="text-3xl font-extrabold text-gray-900">Контакты</h2>
                <p class="mt-2 text-lg text-gray-600">
                    Мы будем рады вашему обращению! Вы можете связаться с нами
                    через форму ниже или с помощью наших контактных данных.
                </p>
            </div>

            <div class="grid grid-cols-1 gap-8">
                <!-- Contact Details -->
                <div
                    class="bg-white shadow rounded-lg p-6 flex flex-col space-y-4"
                >
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900">
                            Адрес
                        </h3>
                        <p class="mt-2 text-gray-600">
                            г.Шымкент, ул. Сайрамская, 17А <br />
                            г.Астана, ул. Кенжина, 8
                        </p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-gray-900">
                            Телефон
                        </h3>
                        <p class="mt-2 text-gray-600">+7 (777) 523 88 88</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-gray-900">
                            Почта
                        </h3>
                        <p class="mt-2 text-gray-600">kaynaravto@mail.ru</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-gray-900">
                            Следите за нами
                        </h3>
                        <div class="mt-2 flex space-x-4">
                            <a
                                href="https://www.instagram.com/kaynaravto/"
                                class="text-indigo-600 hover:text-indigo-800"
                                >Instagram</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup></script>
