<script lang="ts" setup>
import { inject, ref, onMounted, computed, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import UserPictureComponent from '@/components/user/UserPictureComponent.vue';
import { installationConfigStore } from '@/stores/installationConfig';
import type { VSK } from '@/types/VSK';
import type { User } from '@/types/InstallationConfig';

const $vsk: VSK = inject('vsk') as VSK;
const { t } = useI18n();
const $emit = defineEmits(['nextSection', 'prevSection']);
const config = installationConfigStore();
const image = ref('');
const username = ref('');
const password = ref('');
const showError = ref(false);

const addUser = (e) => {
  const newUser: User = {
    username: username.value,
    '!password': password.value,
    sudo: true
  };
  config.setUser(newUser);
  e.preventDefault();
};

const users: ComputedRef<User[]> = computed(() => config.userConfig['!users']);

const verificarYContinuar = (): void => {
  if (users.value.length > 0) {
    $emit('nextSection');
  } else {
    showNoUsersError();
  }
};

const dismissError = (): void => {
  showError.value = false;
};

const showNoUsersError = async (): Promise<void> => {
  showError.value = true;
  setTimeout(() => {
    showError.value = false;
  }, 4000);
};

onMounted(() => {
  $vsk.getIcon('user_auth').then((img: string) => {
    image.value = img;
  });
});
</script>
<template>
  <div class="componere-notification-error" role="alert" v-if="showError">
    <span class="block sm:inline">{{ t('userView.noUsersError') }}</span>

    <span class="componere-notification-error-button" @click="dismissError">
      <font-awesome-icon icon="fa-close" />
    </span>
  </div>
  <div class="componere-user-section">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-24 w-auto" :src="image" alt="Add user" />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="addUser">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">{{
            t('userView.username')
          }}</label>
          <div class="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              required
              v-model="username"
              class="componere-user-input"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">{{
              t('userView.password')
            }}</label>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              v-model="password"
              class="componere-user-input"
            />
          </div>
        </div>

        <div>
          <button type="submit" class="componere-user-cta-button">
            {{ t('userView.addUser') }} &nbsp; <font-awesome-icon icon="fa-user-plus" />
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="componere-user-list">
    <div class="componere-user-list-section">
      <UserPictureComponent
        v-for="user in users"
        :key="user.username"
        :user="user"
        :canDelete="true"
      />
    </div>
  </div>
  <div class="componere-cta-section">
    <button @click="$emit('prevSection')"><font-awesome-icon icon="fa-angle-left" /></button>
    <button @click="verificarYContinuar">
      <font-awesome-icon icon="fa-angle-right" />
    </button>
  </div>
</template>
