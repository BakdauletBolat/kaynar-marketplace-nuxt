<template>
  <footer class="bg-slate-950 text-slate-200">
    <div class="container mx-auto px-4 py-12">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <nuxt-link
            :to="{ name: 'index' }"
            class="inline-flex items-center gap-3"
            aria-label="На главную"
          >
            <n-image preview-disabled class="w-12 h-12 rounded-xl" :src="LogoKaynar" alt="Kaynar Avto" />
            <div class="leading-tight">
              <div class="text-lg font-semibold tracking-wide">Kaynar Avto</div>
              <div class="text-xs text-slate-400">Маркетплейс б/у автозапчастей</div>
            </div>
          </nuxt-link>

          <p class="mt-5 text-sm text-slate-300 leading-relaxed max-w-[52ch]">
            Широкий ассортимент запчастей для автомобилей разных марок и моделей.
            Помогаем быстро найти нужную деталь и оформить заказ.
          </p>

          <div class="mt-5 flex flex-wrap gap-2">
            <a href="tel:+77775238888" class="footer-badge">+7 777 523 88 88</a>
            <a href="mailto:kaynaravto@mail.ru" class="footer-badge">kaynaravto@mail.ru</a>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div class="footer-title">Контакты</div>
          <div class="mt-4 space-y-3 text-sm text-slate-300">
            <div>
              <div class="text-xs text-slate-400">Шымкент</div>
              <div class="mt-1">ул. Сайрамская, 17А</div>
            </div>
            <div>
              <div class="text-xs text-slate-400">Астана</div>
              <div class="mt-1">ул. Кенжина, 8</div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="footer-title">Покупателям</div>
          <ul class="mt-4 space-y-2 text-sm">
            <li><nuxt-link class="footer-link" :to="{ name: 'catalog' }">Каталог</nuxt-link></li>
            <li><nuxt-link class="footer-link" :to="{ name: 'delivery' }">Доставка</nuxt-link></li>
            <li><nuxt-link class="footer-link" :to="{ name: 'refund' }">Возврат</nuxt-link></li>
            <li><nuxt-link class="footer-link" :to="{ name: 'pay' }">Оплата</nuxt-link></li>
            <li><nuxt-link class="footer-link" :to="{ name: 'contacts' }">Контакты</nuxt-link></li>
          </ul>
        </div>

        <div class="lg:col-span-2">
          <div class="footer-title">Соцсети</div>
          <div class="mt-4 flex items-center gap-3">
            <a
              href="https://www.instagram.com/kaynaravto/"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-social"
              aria-label="Instagram Kaynar Avto"
              title="Instagram"
            >
              <svg viewBox="0 0 30 30" fill="currentColor" class="h-6 w-6">
                <circle cx="15" cy="15" r="4" />
                <path
                  d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"
                />
              </svg>
            </a>
          </div>
          <p class="mt-4 text-sm text-slate-400 leading-relaxed">
            Подписывайтесь — рассказываем про новинки, акции и полезные подборки.
          </p>
        </div>
      </div>

      <div class="mt-10 border-t border-slate-800 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-slate-400">
          © {{ new Date().getFullYear() }} Kaynar Avto. Все права защищены.
        </p>
        <div class="flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <nuxt-link class="footer-link" :to="{ name: 'feadback' }">Покупка в один клик</nuxt-link>
          <nuxt-link class="footer-link" :to="{ name: 'services' }">Услуги</nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>
<script lang="ts" setup>
import LogoKaynar from "@/assets/images/logo.png";
import { NImage } from "naive-ui";
</script>

<style scoped>
.footer-title {
  @apply text-sm font-semibold text-white;
}

.footer-link {
  @apply text-slate-300 hover:text-white transition-colors;
}

.footer-badge {
  @apply inline-flex items-center rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-xs text-slate-200
         hover:border-slate-700 hover:text-white transition-colors;
}

.footer-social {
  @apply inline-flex items-center justify-center rounded-full border border-slate-800 bg-slate-900/40 p-2
         hover:border-slate-700 hover:text-white transition-colors;
}
</style>
