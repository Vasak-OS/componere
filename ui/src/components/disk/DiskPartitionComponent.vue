<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  name?: string | undefined | unknown;
  type?: string | undefined | unknown;
  diskSpace: number | undefined;
  partitionSpace: number | undefined;
  label: string | undefined;
}>();

const percentage = computed(() => {
  return Math.round(((props.partitionSpace || 1) / (props.diskSpace || 1)) * 100);
});

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const partitionSizeText = computed(() => {
  const k = 1024;
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  let l = 0,
    n = props.partitionSpace || 0;

  while (n >= k && ++l) {
    n = n / k;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
});
</script>

<template>
  <div
    :style="`width: ${percentage}%; background: ${randomColor()};`"
    class="componere-disk-partition"
  >
    <div class="componere-disk-partition-label">{{ props.label }}</div>
    <div class="componere-disk-partition-space">{{ partitionSizeText }}</div>
  </div>
</template>
