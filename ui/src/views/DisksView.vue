<script lang="ts" setup>
import { inject, ref, type Ref, onMounted, computed } from 'vue';
import { installationConfigStore } from '@/stores/installationConfig';
import DiskAreaComponent from '@/components/disk/DiskAreaComponent.vue';
import DiskPartitionComponent from '@/components/disk/DiskPartitionComponent.vue';
import DiskSpaceComponent from '@/components/disk/DiskSpaceComponent.vue';
import type { VSK } from '@/types/VSK';
import type { VSKDisk } from '@/types/VSKDisk';

const config = installationConfigStore();
const $vsk = inject('vsk') as VSK;
const disks: Ref<Array<VSKDisk>> = ref([]);
const diskSelected: Ref<string> = ref('null');

const setDisks = async () => {
  const vskDisks = await $vsk.getDisks();
  console.warn(vskDisks);
  disks.value = JSON.parse(vskDisks);
  setDiskSelected(disksAvailable.value[0]);
};

const disksAvailable = computed((): Array<string> => {
  return disks.value.map((disk) => disk.name);
});

const setDiskSelected = (disk: string) => {
  diskSelected.value = disk;
};

const selectedDisk = computed((): VSKDisk | undefined => {
  if (diskSelected.value === 'null') {
    return undefined;
  }
  return disks.value.find((disk) => disk.name === diskSelected.value);
});

onMounted(() => {
  setDisks();
});
</script>

<template>
  <select class="componere-select" v-model="diskSelected">
    <option v-for="disk in disksAvailable" v-bind:key="disk">{{ disk }}</option>
  </select>
  <DiskAreaComponent :name="selectedDisk?.name" :type="selectedDisk?.type">
    <DiskSpaceComponent>
      <DiskPartitionComponent
        v-for="partition in selectedDisk?.partition.list"
        :key="partition.name"
        :name="partition.name"
        :type="partition.type"
        :label="partition.label"
        :diskSpace="selectedDisk?.size"
        :partitionSpace="partition.size"
      />
    </DiskSpaceComponent>
  </DiskAreaComponent>
  <div class="componere-cta-section">
    <button @click="$emit('prevSection')">🢘</button>
    <button @click="$emit('nextSection')">🢚</button>
  </div>
</template>
