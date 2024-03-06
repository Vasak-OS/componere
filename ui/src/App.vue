<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { WindowFrame } from '@vasakgroup/vue-libvasak';
import HelloWorld from './components/HelloWorld.vue';

const $vsk: any = inject('vsk');
const icon = ref('');

const setIcon = async() => {
  icon.value = await $vsk.getIcon('calamares');
};

onMounted(() => {
  $vsk.loadUIConfig();
  setIcon();
});
</script>

<template>
  <WindowFrame title="componere" v-bind:image="icon">
    <div class="flex">
      <HelloWorld />
    </div>
  </WindowFrame>
</template>
