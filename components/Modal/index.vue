<template>
    <TransitionRoot appear :show="model" as="template">
      <Dialog as="div" @close="closeModal" class="relative w-full z-[10000]">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full h-full items-center justify-end  text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="translate-y-0 translate-x-[500px]"
              enter-to="translate-y-0 translate-x-0"
              leave="duration-200 ease-in"
              leave-from="translate-y-0 translate-x-0"
              leave-to="translate-y-0 translate-x-[500px]"
            >
              <DialogPanel
                class="w-[500px] transform overflow-scroll rounded-none bg-white max-h-full h-full p-6 text-left shadow-xl transition-all"
              >
              <div class="mt-2">
                <slot></slot>
              </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup lang="ts">
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/vue';

  const model = defineModel<boolean>();

  function closeModal() {
    model.value = false
  }
  </script>
  