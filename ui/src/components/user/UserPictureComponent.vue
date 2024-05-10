<script lang="ts" setup>
import { defineProps } from 'vue';
import { installationConfigStore } from '@/stores/installationConfig';
import type { User } from '@/types/InstallationConfig';

const props = defineProps<{
  user: User;
}>();

const config = installationConfigStore();

const deleteUser = () => {
  config.deleteUser(props.user.username);
};
</script>

<template>
  <div class="componere-user-profile-area">
    <img
      :src="`https://ui-avatars.com/api/?name=${user.username}&background=random&size=64&bold=true&rounded=true`"
      :alt="user.username"
    />
    <button class="componere-user-profile-button" @click="deleteUser">
      <font-awesome-icon icon="fa-close" />
    </button>
  </div>
</template>
