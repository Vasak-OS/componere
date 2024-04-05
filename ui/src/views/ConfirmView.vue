<script lang="ts" setup>
import { inject } from 'vue';
import { installationConfigStore } from '@/stores/installationConfig';
import type { VSK } from '@/types/VSK';

const config = installationConfigStore();
const $vsk = inject('vsk') as VSK;

const install = async () => {
  const jsonData = JSON.stringify(config.config);
  await $vsk.save(jsonData, 'config.json');
  // $vsk.save(jsonData, 'user.json')
  await $vsk.install();
};
</script>

<template>
  <h1>Confirm</h1>

  <pre><code>{{ config.config }}</code></pre>

  <button @click="install">Install</button>

  <button @click="$emit('prevSection')">🢘</button>
</template>
