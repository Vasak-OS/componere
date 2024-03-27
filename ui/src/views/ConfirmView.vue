<script lang="ts" setup>
import { installationConfigStore } from '@/stores/installationConfig';

const config = installationConfigStore();
</script>

<template>
  <h1>Confirm</h1>

  {{ config.config }}
</template>
