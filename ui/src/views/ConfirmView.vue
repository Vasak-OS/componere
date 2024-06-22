<script lang="ts" setup>
import { inject, computed, ref, type Ref, onMounted } from 'vue';
import { i18n } from '@/plugins/i18n';
import CardComponent from '@/components/card/CardComponent.vue';
import WarnComponent from '@/components/card/WarnComponent.vue';
import DiskSpaceComponent from '@/components/disk/DiskSpaceComponent.vue';
import UserPictureComponent from '@/components/user/UserPictureComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { installationConfigStore } from '@/stores/installationConfig';
import { vskDiskPartitionDTO } from '@/utils/diskUtils';
import { formatDisk } from '@/utils/formatUtils';
import type { VSK } from '@/types/VSK';
import type { VSKDiskPartition, VSKDisk } from '@/types/VSKDisk';
import { getDisks } from '@/utils/vasakFunctions';

const config = installationConfigStore();
const { $t } = i18n();
const $vsk: VSK = inject('vsk') as VSK;
const $emit = defineEmits(['nextSection', 'prevSection']);
const disks: Ref<Array<VSKDisk>> = ref([]);
const installing: Ref<boolean> = ref(false);
const showError: Ref<boolean> = ref(false);
const errorData: Ref<string> = ref('');

const install = async (): Promise<void> => {
  try {
    installing.value = true;
    await formatDisk(config.config.disk_config, $vsk);
    const installData = JSON.stringify(config.config);
    const userData = JSON.stringify(config.userConfig);
    await $vsk.save(installData, 'config.json');
    await $vsk.save(userData, 'user.json');
    await $vsk.install();
    installing.value = false;
    $emit('nextSection');
  } catch (error: any) {
    errorData.value = error?.message || 'Error';
    showInstallError();
    installing.value = false;
    console.error(error);
  }
};

const setDisks = async (): Promise<void> => {
  disks.value = await getDisks($vsk);
  console.log(selectedDisk.value);
};

const emulatedFinalStatusPartitions = computed((): VSKDiskPartition[] | undefined => {
  return config.config.disk_config.device_modifications[0].partitions.map((partition) => {
    return vskDiskPartitionDTO(partition);
  });
});

const selectedDisk = computed((): VSKDisk => {
  disks;
  return (
    disks.value.find(
      (disk) => disk.path === config.config.disk_config.device_modifications[0].device
    ) || ({} as VSKDisk)
  );
});

const dismissError = (): void => {
  showError.value = false;
};

const showInstallError = async (): Promise<void> => {
  showError.value = true;
  setTimeout(() => {
    showError.value = false;
  }, 4000);
};

onMounted(() => {
  setDisks();
});
</script>

<template>
  <div class="componere-notification-error" role="alert" v-if="showError">
    <span class="block sm:inline">{{ errorData }}</span>

    <span class="componere-notification-error-button" @click="dismissError">
      <font-awesome-icon icon="fa-close" />
    </span>
  </div>
  <LoadingComponent v-if="installing" />
  <CardComponent>
    <h2 class="card-title"><font-awesome-icon icon="fa-hard-drive" /> {{ $t('confirm.disks') }}</h2>
    <DiskSpaceComponent
      :partitions="emulatedFinalStatusPartitions"
      :diskSpace="selectedDisk.size"
    />
  </CardComponent>
  <CardComponent>
    <h2 class="card-title"><font-awesome-icon icon="fa-users" /> {{ $t('confirm.users') }}</h2>
    <div class="card-body componere-confirm-users-list">
      <UserPictureComponent
        v-for="user in config.userConfig['!users']"
        :key="user.username"
        :user="user"
        :canDelete="false"
      />
    </div>
  </CardComponent>
  <WarnComponent>
    <h2 class="card-title">{{ $t('confirm.warn.title') }}</h2>
    <p>{{ $t('confirm.warn.text') }}</p>
  </WarnComponent>
  <div class="componere-cta-section">
    <button @click="$emit('prevSection')"><font-awesome-icon icon="fa-angle-left" /></button>
    <button @click="install"><font-awesome-icon icon="fa-download" /></button>
  </div>
</template>
