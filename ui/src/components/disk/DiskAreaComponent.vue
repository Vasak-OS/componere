<script lang="ts" setup>
import type { VSK } from '@/types/VSK';
import { defineProps, inject, onMounted, ref } from 'vue';
import { getIcon } from '@/utils/vasakFunctions';

const img = ref('');
const $vsk = inject('vsk') as VSK;
const props = defineProps<{
  name?: string | undefined | unknown;
  type?: string | undefined | unknown;
}>();

const setImage = async () => {
  if (props.type === 'NVME' || props.type === 'SSD') {
    img.value = await getIcon($vsk, 'drive-harddisk-solidstate');
  } else {
    img.value = await getIcon($vsk, 'drive-harddisk');
  }
};

onMounted(() => {
  setImage();
});
</script>
<template>
  <div class="card-head-disk">
    <div>
      <img :src="img" alt="Disk icon" />
    </div>
    <div class="card-head-disk-info">
      <h2 class="card-title">{{ name }}({{ type }})</h2>
      <slot />
    </div>
  </div>
</template>
