<script setup lang="ts">
</script>

<template>
  <SidebarModal></SidebarModal>
  <div class="relative min-h-full bg-slate-100">
    <Header></Header>
    <div class="bg-slate-100">
      <Errors></Errors>
      <slot></slot>
    </div>
    <div class="flex flex-col items-center lg:flex-row p-3bg-slate-100 max-w-7xl mx-auto mt-[200px] gap-3 justify-end">
      <div>О нас</div>
      <div>Условия использования</div>
      <div>Покупка</div>
      <div>Политика конфиденциальности</div>
      <div>ЧЗВ</div>
      <div>Контакты</div>
    </div>
    <div class="mx-auto items-center flex justify-center max-w-7xl py-5">
      2024 Все права защищены
    </div>
  </div>
</template>

<style scoped>

</style>