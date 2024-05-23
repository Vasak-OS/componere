<script lang="ts" setup>
import { i18n } from '@/plugins/i18n';
import SlidesComponet from '@/components/SlidesComponet.vue';
import slides from '@/data/slides';
import { ref, onMounted } from 'vue';

const timezone = ref('');
const loading = ref(true);
const haveInternet = ref(false);
const { $t, SUPPORT_LOCALES, setI18nLanguage, locale } = i18n();

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
    <SlidesComponet :slides="slides" />
  </div>
  <div v-if="loading">
    <p>Loading...</p>
  </div>
  <div v-else>
    <template v-if="haveInternet"> Tienes internet </template>
    <template v-else> No tienes internet </template>
  </div>
  <div>
    <label for="language">{{ $t('welcome.language') }}</label>
    <select id="language" @change="setI18nLanguage(($event.target as HTMLTextAreaElement).value)">
      <option
        v-for="localeSupported in SUPPORT_LOCALES"
        :value="localeSupported"
        :selected="localeSupported === locale"
      >
        {{ localeSupported }}
      </option>
    </select>
  </div>
  <p>{{ timezone }}</p>
  <div class="componere-cta-section">
    <button @click="$emit('nextSection')"><font-awesome-icon icon="fa-angle-right" /></button>
  </div>
</template>
