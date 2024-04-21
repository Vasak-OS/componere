<script lang="ts" setup>
import { calculateUnit } from '@/utils/diskUtils';
import { defineProps } from 'vue';

const props = defineProps<{
  disk: any;
}>();
</script>
<template>
  <table class="min-w-full divide-y">
    <thead>
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Partition
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Type
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Usage
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Free
        </th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Size
        </th>
      </tr>
    </thead>
    <tbody class="divide-y">
      <tr v-for="partition in props.disk.partition.list" :key="partition.name">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">
            {{ partition.fsMountingPoint }} ({{ partition.name }})
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ partition.fsLabel }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">
            {{ calculateUnit(partition.size - partition.fsFreeSize) }}
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ calculateUnit(partition.fsFreeSize) }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ calculateUnit(partition.size) }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
