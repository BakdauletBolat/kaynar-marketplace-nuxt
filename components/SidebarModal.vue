<script setup lang="ts">
import {isOpenSidebar} from "~/storages/storage";
import Modal from '~/components/Modal';

</script>

<template>
<Modal v-model="isOpenSidebar">
  <div class="hello">
    Test
  </div>
</Modal>
</template>

<style scoped>

</style>