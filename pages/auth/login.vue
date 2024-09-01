<template>
    <div class="flex flex-col justify-center items-center">
        <div>
            <h2 class="text-2xl pb-3 mt-3">Авторизация</h2>
        </div>
        <user-authorization-form></user-authorization-form>
    </div>
</template>

<script setup lang="ts">
import UserAuthorizationForm from "~/components/user-authorization-form.vue";
</script>
