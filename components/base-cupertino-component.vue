<template>
  <div class="panes-component">
    <h1>Panes Demo</h1>
    <p hide-on-bottom>Content</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { CupertinoPane, type CupertinoSettings } from 'cupertino-pane';

const model = defineModel();
const props = defineProps<{
  settings: CupertinoSettings;
}>();

onMounted(() => {
  if (model.value) {
    return;
  }
  model.value = new CupertinoPane('.panes-component', props.settings);
})

</script>