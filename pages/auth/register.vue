<template>
    <div class="flex flex-col justify-center items-center px-4">
        <div>
            <h2 class="text-2xl pb-3 mt-3">Регистрация</h2>
        </div>
        <user-registration-form></user-registration-form>
    </div>
</template>

<script setup lang="ts">
import userRegistrationForm from "~/components/user-registration-form.vue";
</script>
