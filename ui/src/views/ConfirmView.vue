<script lang="ts" setup>
import { inject, computed, ref, type Ref, onMounted } from 'vue';
import CardComponent from '@/components/card/CardComponent.vue';
import DiskSpaceComponent from '@/components/disk/DiskSpaceComponent.vue';
import UserPictureComponent from '@/components/user/UserPictureComponent.vue';
import SlidesComponet from '@/components/SlidesComponet.vue';
import installWarns from '@/data/installWarns';
import { installationConfigStore } from '@/stores/installationConfig';
import { vskDiskPartitionDTO } from '@/utils/diskUtils';
import type { VSK } from '@/types/VSK';
import type { VSKDiskPartition, VSKDisk } from '@/types/VSKDisk';
import { getDisks } from '@/utils/vasakFunctions';

const config = installationConfigStore();
const $vsk: VSK = inject('vsk') as VSK;
const disks: Ref<Array<VSKDisk>> = ref([]);

const install = async (): Promise<void> => {
  const installData = JSON.stringify(config.config);
  const userData = JSON.stringify(config.userConfig);
  await $vsk.save(installData, 'config.json');
  await $vsk.save(userData, 'user.json');
  await $vsk.install();
};

const setDisks = async (): Promise<void> => {
  disks.value = await getDisks($vsk);
  console.log(selectedDisk.value)
};

const emulatedFinalStatusPartitions = computed((): VSKDiskPartition[] | undefined => {
  return config.config.disk_config.device_modifications[0].partitions.map((partition) => {
    return vskDiskPartitionDTO(partition);
  });
});

const selectedDisk = computed((): VSKDisk => {
  disks
  return (
    disks.value.find(
      (disk) => disk.deviceId === config.config.disk_config.device_modifications[0].device
    ) || ({} as VSKDisk)
  );
});

onMounted(() => {
  setDisks();
});
</script>

<template>
  <CardComponent>
    <h2 class="card-title"><font-awesome-icon icon="fa-hard-drive" /></h2>
    <DiskSpaceComponent
      :partitions="emulatedFinalStatusPartitions"
      :diskSpace="selectedDisk?.size"
    />
  </CardComponent>
  <CardComponent>
    <h2 class="card-title"><font-awesome-icon icon="fa-users" /></h2>
    <div class="card-body componere-confirm-users-list">
      <UserPictureComponent
        v-for="user in config.userConfig['!users']"
        :key="user.username"
        :user="user"
        :canDelete="false"
      />
    </div>
  </CardComponent>
  <SlidesComponet :slides="installWarns" />
  <div class="componere-cta-section">
    <button @click="$emit('prevSection')"><font-awesome-icon icon="fa-angle-left" /></button>
    <button @click="install"><font-awesome-icon icon="fa-download" /></button>
  </div>
</template>
