<template>
  <footer class="bg-[#19191a] text-gray-400 font-sans border-t border-white/5 pb-20 lg:pb-0">
    <div class="container mx-auto px-4 py-12">
      <div class="grid gap-10 lg:grid-cols-4">
        
        <!-- Column 1: Links -->
        <div>
          <h3 class="text-white font-bold mb-4">Покупателям</h3>
          <ul class="space-y-3 text-sm">
            <li><nuxt-link :to="{ name: 'catalog' }" class="hover:text-primary transition-colors">Как сделать заказ</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'pay' }" class="hover:text-primary transition-colors">Способы оплаты</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'delivery' }" class="hover:text-primary transition-colors">Доставка</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'refund' }" class="hover:text-primary transition-colors">Возврат товара</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'refund' }" class="hover:text-primary transition-colors">Возврат денежных средств</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'contacts' }" class="hover:text-primary transition-colors">Правила продажи</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'feadback' }" class="hover:text-primary transition-colors">Вопросы и ответы</nuxt-link></li>
          </ul>
        </div>

        <!-- Column 2: Company -->
        <div>
          <h3 class="text-white font-bold mb-4">Компания</h3>
          <ul class="space-y-3 text-sm">
            <li><nuxt-link :to="{ name: 'contacts' }" class="hover:text-primary transition-colors">О нас</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'contacts' }" class="hover:text-primary transition-colors">Реквизиты</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'contacts' }" class="hover:text-primary transition-colors">Контакты</nuxt-link></li>
            <li><a href="#" class="hover:text-primary transition-colors">Пресс-центр</a></li>
          </ul>
        </div>

        <!-- Column 3: Social & Contacts -->
        <div>
          <h3 class="text-white font-bold mb-4">Мы в соцсетях</h3>
          <div class="flex gap-4 mb-6">
            <a href="https://www.instagram.com/kaynaravto/" target="_blank" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <n-icon :component="LogoInstagram" size="20" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
               <n-icon :component="LogoVk" size="20" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
               <n-icon :component="LogoYoutube" size="20" />
            </a>
          </div>
          
          <h3 class="text-white font-bold mb-4">Контакты</h3>
          <div class="space-y-2 text-sm">
             <a href="tel:+77775238888" class="block hover:text-white transition-colors">+7 777 523 88 88</a>
             <a href="mailto:kaynaravto@mail.ru" class="block hover:text-white transition-colors">kaynaravto@mail.ru</a>
          </div>
        </div>

        <!-- Column 4: App -->
        <div>
           <h3 class="text-white font-bold mb-4">Мобильное приложение</h3>
           <p class="text-xs mb-4 leading-relaxed">Скачивайте приложение, чтобы покупать товары быстрее и удобнее</p>
           <div class="flex flex-col gap-3">
              <button class="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors text-left group">
                 <div class="bg-white text-black p-1 rounded">
                   <n-icon :component="LogoApple" size="20" />
                 </div>
                 <div>
                    <div class="text-[10px] text-gray-500 group-hover:text-gray-300">Загрузите в</div>
                    <div class="text-sm font-bold text-white">App Store</div>
                 </div>
              </button>
              <button class="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-2 rounded-lg transition-colors text-left group">
                 <div class="bg-white text-black p-1 rounded">
                   <n-icon :component="LogoGoogle" size="20" />
                 </div>
                 <div>
                    <div class="text-[10px] text-gray-500 group-hover:text-gray-300">Доступно в</div>
                    <div class="text-sm font-bold text-white">Google Play</div>
                 </div>
              </button>
           </div>
           
           <div class="mt-6 flex items-center gap-4">
              <n-image preview-disabled class="w-16 h-16 rounded-lg bg-white p-1" :src="LogoKaynar" alt="QR" />
              <div class="text-xs text-gray-500">
                 Наведите камеру,<br>чтобы скачать
              </div>
           </div>
        </div>

      </div>

      <div class="mt-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2004-{{ new Date().getFullYear() }} Kaynar Avto — модный маркетплейс одежды, обуви и аксессуаров.</p>
        <p>Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>
<script lang="ts" setup>
import LogoKaynar from "@/assets/images/logo.png";
import { NImage, NIcon } from "naive-ui";
import { LogoInstagram, LogoVk, LogoYoutube, LogoApple, LogoGoogle } from "@vicons/ionicons5";
</script>
