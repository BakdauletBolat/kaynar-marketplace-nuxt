<template>
  <button @click="routeTo" class="flex flex-col items-center text-gray-600 "
          :class="{
            '!text-gray-900': isActive
          }">
    <component class="w-6 h-6" :is="isActive ? activeIcon : baseIcon"></component>
    <span class="text-xs mt-1">{{ title }}</span>
  </button>
</template>
<script lang="ts" setup>
const props = defineProps(['baseIcon', 'activeIcon', 'routeName', 'isActive', 'title']);

const router = useRouter();

function routeTo() {
  navigator.vibrate(40);
  router.push({
    name: props.routeName
  })
}
</script>