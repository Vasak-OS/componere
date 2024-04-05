<script lang="ts" setup>
import { installationConfigStore } from '@/stores/installationConfig';
const config = installationConfigStore();
</script>

<template>
  <h1>Disks</h1>
  <pre><code>{{ config.config.disk_config }}</code></pre>
  <div class="componere-cta-section">
    <button @click="$emit('prevSection')">🢘</button>
    <button @click="$emit('nextSection')">🢚</button>
  </div>
</template>
