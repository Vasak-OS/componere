<script lang="ts" setup>
import { inject } from 'vue';
import { installationConfigStore } from '@/stores/installationConfig';
import type { VSK } from '@/types/VSK';

const config = installationConfigStore();
const $vsk = inject('vsk') as VSK;

const install = async () => {
  const installData = JSON.stringify(config.config);
  const userData = JSON.stringify(config.userConfig);
  await $vsk.save(installData, 'config.json');
  await $vsk.save(userData, 'user.json')
  await $vsk.install();
};
</script>

<template>
  <h1>Confirm</h1>

  <pre><code>{{ config.config }}</code></pre>
  <div class="componere-cta-section">
    <button @click="$emit('prevSection')"><font-awesome-icon icon="fa-angle-left"/></button>
    <button @click="install"><font-awesome-icon icon="fa-download"/></button>
  </div>
</template>
