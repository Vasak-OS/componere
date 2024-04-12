<script lang="ts" setup>
import type { VSK } from '@/types/VSK';
import { defineProps, inject, onMounted, ref } from 'vue';

const img = ref('');
const $vsk = inject('vsk') as VSK;
const props = defineProps<{
  name?: string | undefined | unknown;
  type?: string | undefined | unknown;
}>();

const setImage = async () => {
  if (props.type === 'NVME' || props.type === 'SSD') {
    img.value = await $vsk.getIcon('drive-harddisk-solidstate');
  } else {
    img.value = await $vsk.getIcon('drive-harddisk');
  }
};

onMounted(() => {
  setImage();
});
</script>
<template>
  <div class="card flex">
    <div class="flex-none w-48 relative">
      <img class="absolute top-0 left-0 w-48 h-48 object-cover" :src="img" alt="Disk icon" />
    </div>
    <div class="flex-auto p-8">
      <h2 class="card-title">{{ name }}({{ type }})</h2>
      <slot />
    </div>
  </div>
</template>
