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
import { presetDiskPartition, calcuclateSwapSize, bytesToMB } from '@/utils/diskUtils';

const config = installationConfigStore();
const $vsk = inject('vsk') as VSK;
const disks: Ref<Array<VSKDisk>> = ref([]);
const diskSelected: Ref<string> = ref('null');
const diskConfig: Ref<DiskModificationConfig> = ref({
  device: '',
  partitions: []
});
const useSWAP = ref(false);

const setDisks = async (): Promise<void> => {
  const vskDisks = await $vsk.getDisks();
  disks.value = JSON.parse(vskDisks);
  setDiskSelected(disksAvailable.value[0]);
};

const disksAvailable = computed((): Array<string> => {
  return disks.value.map((disk) => disk.name);
});

const setDiskSelected = async (disk: string): Promise<void> => {
  diskSelected.value = disk;
  setDiskConfig();
};

const setDiskConfig = async (): Promise<void> => {
  var swapSize = 0;
  if (selectedDisk.value !== undefined) {
    diskConfig.value.device = selectedDisk.value.deviceId;
    if (useSWAP.value) {
      const ram = JSON.parse(await $vsk.getHardInfo()).ram;
      swapSize = calcuclateSwapSize(ram * 1024);
    }
    diskConfig.value.partitions = presetDiskPartition(
      config.config.bootloader,
      swapSize,
      bytesToMB(selectedDisk.value.size)
    );
    config.setDiskConfig({
      config_type: 'manual_partitioning',
      device_modifications: [diskConfig.value]
    });
  }
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
  <select class="componere-select" v-model="diskSelected" @change="setDiskConfig">
    <option v-for="disk in disksAvailable" v-bind:key="disk">{{ disk }}</option>
  </select>
  <div>
    <label for="useSWAP">Use SWAP</label>
    <input type="checkbox" v-model="useSWAP" @change="setDiskConfig" />
  </div>
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
  <h2>After</h2>
  <DiskSpaceComponent>
    <DiskPartitionComponent
      v-for="partition in config.config.disk_config.device_modifications[0].partitions"
      :key="partition.mountpoint"
      :name="partition.obj_id"
      :type="partition.type"
      :label="partition.flags[0]"
      :diskSpace="selectedDisk?.size"
      :partitionSpace="partition.length.value * 1024 * 1024"
    />
  </DiskSpaceComponent>
  <div class="componere-cta-section">
    <button @click="$emit('prevSection')">🢘</button>
    <button @click="$emit('nextSection')">🢚</button>
  </div>
</template>
