<script lang="ts" setup>
import { inject, ref, type Ref, onMounted, computed } from 'vue';
import { installationConfigStore } from '@/stores/installationConfig';
import DiskAreaComponent from '@/components/disk/DiskAreaComponent.vue';
import DiskPartitionComponent from '@/components/disk/DiskPartitionComponent.vue';
import DiskSpaceComponent from '@/components/disk/DiskSpaceComponent.vue';
import PartitionTableComponent from '@/components/disk/PartitionTableComponent.vue';
import type { VSK } from '@/types/VSK';
import type { VSKDisk } from '@/types/VSKDisk';
import type { DiskModificationConfig } from '@/types/InstallationConfig';
import { presetDiskPartition, calcuclateSwapSize } from '@/utils/diskUtils';

const config = installationConfigStore();
const $vsk = inject('vsk') as VSK;
const disks: Ref<Array<VSKDisk>> = ref([]);
const diskSelected: Ref<string> = ref('null');
const diskConfig: Ref<DiskModificationConfig> = ref({
  device: '',
  partitions: []
});
const useSWAP = ref(false);

const setDisks = async () => {
  const vskDisks = await $vsk.getDisks();
  disks.value = JSON.parse(vskDisks);
  setDiskSelected(disksAvailable.value[0]);
};

const disksAvailable = computed((): Array<string> => {
  return disks.value.map((disk) => disk.name);
});

const setDiskSelected = (disk: string) => {
  var swapSize = 0;
  diskSelected.value = disk;
  if (selectedDisk.value !== undefined) {
    diskConfig.value.device = selectedDisk.value.deviceId;
    if (useSWAP.value) {
      swapSize = calcuclateSwapSize(selectedDisk.value.size);
    }
    diskConfig.value.partitions = presetDiskPartition(
      config.config.bootloader,
      swapSize,
      selectedDisk.value.size
    );
  }
  config.setDiskConfig({
    config_type: 'manual_partitioning',
    device_modifications: [diskConfig.value]
  });
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
    <PartitionTableComponent :disk="selectedDisk" />
  </DiskAreaComponent>
  <div class="componere-cta-section">
    <button @click="$emit('prevSection')">🢘</button>
    <button @click="$emit('nextSection')">🢚</button>
  </div>
</template>
