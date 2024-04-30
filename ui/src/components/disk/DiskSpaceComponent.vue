<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import DiskPartitionComponent from './DiskPartitionComponent.vue';
import type { VSKDiskPartition } from '@/types/VSKDisk';

const props = defineProps<{
  partitions: Array<VSKDiskPartition> | undefined;
  diskSpace: number | undefined;
}>();
</script>

<template>
  <div class="componere-disk-space">
    <DiskPartitionComponent
          v-for="partition in props.partitions"
          :key="partition.name"
          :name="partition.name"
          :type="partition.type"
          :label="partition.label"
          :diskSpace="props.diskSpace"
          :partitionSpace="partition.size"
        />
  </div>
</template>