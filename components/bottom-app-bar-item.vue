<template>
  <button @click="routeTo" 
          class="flex flex-col items-center justify-center w-full py-1 text-slate-500 transition-all duration-200 active:scale-90"
          :class="{
            '!text-slate-900 font-medium': isActive
          }">
    <component class="w-6 h-6 mb-0.5" :is="isActive ? activeIcon : baseIcon"></component>
    <span class="text-[10px] leading-none">{{ title }}</span>
  </button>
</template>
<script lang="ts" setup>
const props = defineProps(['baseIcon', 'activeIcon', 'routeName', 'isActive', 'title']);

const router = useRouter();

function routeTo() {
  if ("vibrate" in navigator) {
    navigator.vibrate(10); // Уменьшил вибрацию до более приятной
  }
  router.push({
    name: props.routeName
  })
}
</script>