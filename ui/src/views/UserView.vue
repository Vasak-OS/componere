<script lang="ts" setup>
import { inject, ref, onMounted, computed, type ComputedRef } from 'vue';
import UserPictureComponent from '@/components/user/UserPictureComponent.vue';
import { installationConfigStore } from '@/stores/installationConfig';
import type { VSK } from '@/types/VSK';
import type { User } from '@/types/InstallationConfig';

const $vsk = inject('vsk') as VSK;
const $emit = defineEmits(['nextSection', 'prevSection']);
const config = installationConfigStore();
const image = ref('');
const username = ref('');
const password = ref('');

const addUser = (e) => {
  const newUser: User = {
    username: username.value,
    '!password': password.value,
    sudo: true
  };
  config.setUser(newUser);
  //$emit('nextSection');
  e.preventDefault();
};

const users: ComputedRef<User[]> = computed(() => config.userConfig['!users']);

onMounted(() => {
  $vsk.getIcon('user_auth').then((img: string) => {
    image.value = img;
  });
});
</script>
<template>
  <div class="componere-user-section">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-24 w-auto" :src="image" alt="Add user" />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="addUser">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Usuario</label
          >
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
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
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
            <font-awesome-icon icon="fa-user-plus" />
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="componere-user-list">
    <div class="componere-user-list-section">
      <UserPictureComponent v-for="user in users" :key="user.username" :user="user" />
    </div>
  </div>
  <div class="componere-cta-section">
    <button @click="$emit('prevSection')"><font-awesome-icon icon="fa-angle-left" /></button>
    <button @click="$emit('nextSection')"><font-awesome-icon icon="fa-angle-right" /></button>
  </div>
</template>
