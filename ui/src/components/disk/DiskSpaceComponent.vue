<script setup lang="ts">
import { defineProps, computed, type ComputedRef } from 'vue';
import DiskPartitionComponent from './DiskPartitionComponent.vue';
import { calculatePercentage } from '@/utils/diskUtils';
import type { VSKDiskPartition } from '@/types/VSKDisk';

const props = defineProps<{
  partitions: Array<VSKDiskPartition> | undefined;
  diskSpace: number | undefined;
}>();

const partitionFormated: ComputedRef<any[]> = computed(() => {
  let partitions =
    props.partitions?.map((partition) => {
      return {
        key: partition.name,
        name: partition.name,
        type: partition.type,
        label: partition.label,
        partitionSpace: partition.size,
        percentage: Math.max(calculatePercentage(partition.size, props.diskSpace || 1), 7)
      };
    }) || [];

  const totalPercentage = partitions.reduce((acc, partition) => acc + partition.percentage, 0);

  if (totalPercentage > 100) {
    let corrected = false;
    partitions = partitions.map((partition) => {
      if (partition.percentage <= 100 && partition.percentage > 10 && !corrected) {
        partition.percentage = partition.percentage - (totalPercentage - 100);
        corrected = true;
      }
      return partition;
    });
  }
  return partitions;
});
</script>

<template>
  <div class="componere-disk-space">
    <DiskPartitionComponent v-for="partition in partitionFormated" v-bind="partition" />
  </div>
</template>
