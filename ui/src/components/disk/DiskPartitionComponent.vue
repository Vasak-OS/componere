<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { randomColor } from '@/utils/colorUtils';
import { calculateUnit } from '@/utils/diskUtils';

const props = defineProps<{
  name?: string;
  fsType: string;
  percentage?: number;
  partitionSpace: number;
  label: string;
}>();

const partitionSizeText = computed((): string => {
  return calculateUnit(props.partitionSpace || 0);
});

const colorFormat = computed((): string => {
  return props.fsType || props.label;
});
</script>

<template>
  <div
    :style="`width: ${percentage}%; background: ${randomColor(colorFormat)};`"
    class="componere-disk-partition"
  >
  <p class="text-center">
    <div class="componere-disk-partition-label">{{ props.label }}</div>
    <div class="componere-disk-partition-space">{{ partitionSizeText }}</div>
  </p>
  </div>
</template>
