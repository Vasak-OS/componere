<script lang="ts" setup>
import { inject, ref, type Ref, onMounted, computed } from 'vue';
import { installationConfigStore } from '@/stores/installationConfig';
import CardComponent from '@/components/card/CardComponent.vue';
import DiskAreaComponent from '@/components/disk/DiskAreaComponent.vue';
import DiskSpaceComponent from '@/components/disk/DiskSpaceComponent.vue';
import PartitionTableComponent from '@/components/disk/PartitionTableComponent.vue';
import type { VSK } from '@/types/VSK';
import type { VSKDisk } from '@/types/VSKDisk';
import type { DiskModificationConfig } from '@/types/InstallationConfig';
import type { VSKDiskPartition } from '../types/VSKDisk';
import {
  presetDiskPartition,
  calcuclateSwapSize,
  bytesToMB,
  vskDiskPartitionDTO
} from '@/utils/diskUtils';
import { getDisks } from '@/utils/vasakFunctions';

const config = installationConfigStore();
const $vsk = inject('vsk') as VSK;
const disks: Ref<Array<VSKDisk>> = ref([]);
const diskSelected: Ref<string> = ref('null');
const diskConfig: Ref<DiskModificationConfig> = ref({
  device: '',
  partitions: []
});
const useSWAP = ref(false);

const swapChange = (): void => {
  useSWAP.value = !useSWAP.value;
  setDiskConfig();
};

const setDisks = async (): Promise<void> => {
  disks.value = await getDisks($vsk);
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
    diskConfig.value.partitions = presetDiskPartition({
      bootloader: config.config.bootloader,
      swapSize,
      diskSize: bytesToMB(selectedDisk.value.size)
    });
    config.setDiskConfig({
      config_type: 'manual_partitioning',
      device_modifications: [diskConfig.value]
    });
  }
};

const selectedDisk = computed((): VSKDisk => {
  return disks.value.find((disk) => disk.name === diskSelected.value) || ({} as VSKDisk);
});

const emulatedFinalStatusPartitions = computed((): VSKDiskPartition[] | undefined => {
  return config.config.disk_config.device_modifications[0].partitions.map((partition) => {
    return vskDiskPartitionDTO(partition);
  });
});

onMounted(() => {
  setDisks();
});
</script>

<template>
  <select class="componere-select" v-model="diskSelected" @change="setDiskConfig">
    <option v-for="disk in disksAvailable" v-bind:key="disk">{{ disk }}</option>
  </select>
  <div class="componere-swap-area">
    <label for="useSWAP">Use SWAP</label>
    <label class="flex cursor-pointer select-none items-center">
      <div class="relative">
        <input type="checkbox" id="useSwap" class="sr-only" @change="swapChange" />
        <div class="block h-8 w-14 rounded-full background"></div>
        <div
          class="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"
          :class="{ 'translate-x-full bg-vsk': useSWAP }"
        ></div>
      </div>
    </label>
  </div>
  <CardComponent>
    <DiskAreaComponent :name="selectedDisk?.name" :type="selectedDisk?.type">
      <DiskSpaceComponent
        :partitions="selectedDisk?.partition.list"
        :diskSpace="selectedDisk?.size"
      />
    </DiskAreaComponent>
    <PartitionTableComponent :disk="selectedDisk" />
  </CardComponent>
  <CardComponent>
    <h2 class="card-title">After</h2>
    <DiskSpaceComponent
      :partitions="emulatedFinalStatusPartitions"
      :diskSpace="selectedDisk?.size"
    />
  </CardComponent>
  <div class="componere-cta-section">
    <button @click="$emit('prevSection')"><font-awesome-icon icon="fa-angle-left" /></button>
    <button @click="$emit('nextSection')"><font-awesome-icon icon="fa-angle-right" /></button>
  </div>
</template>
