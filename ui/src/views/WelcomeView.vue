<script lang="ts" setup>
import SlidesComponet from '@/components/SlidesComponet.vue';
import { ref, onMounted } from 'vue';

const timezone = ref('');
const loading = ref(true);
const haveInternet = ref(false);

const checkInternet = async () => {
  timezone.value = await fetch('http://ip-api.com/json/')
    .then((response) => response.json())
    .then((data) => {
      haveInternet.value = true;
      return data.timezone;
    })
    .catch(() => 'No internet');
  loading.value = false;
};

onMounted(() => {
  checkInternet();
});
</script>
<template>
  <div>
    <SlidesComponet />
  </div>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <template v-if="haveInternet"> Tienes internet </template>
    <template v-else> No tienes internet </template>
  </div>
  <p>{{ timezone }}</p>
  <div class="componere-cta-section">
    <button @click="$emit('nextSection')">🢚</button>
  </div>
</template>
