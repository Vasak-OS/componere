<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { randomColor } from '@/utils/colorUtils';
import { calculateUnit } from '@/utils/diskUtils';

const props = defineProps<{
  name?: string | undefined | unknown;
  type?: string | undefined | unknown;
  percentage?: number | undefined | unknown;
  partitionSpace: number | undefined;
  label: string | undefined;
}>();

const partitionSizeText = computed(() => {
  return calculateUnit(props.partitionSpace || 0);
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
