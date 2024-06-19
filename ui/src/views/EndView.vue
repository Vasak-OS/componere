
<script lang="ts" setup>
import { i18n } from '@/plugins/i18n';

const { $t } = i18n();
</script>
<template>
  <div>
    <h2>{{ $t('end.title') }}</h2>
    <p>{{ $t('end.text') }}</p>
  </div>
</template>