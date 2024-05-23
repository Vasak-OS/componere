<script lang="ts" setup>
import { i18n } from '@/plugins/i18n';
import SlidesComponet from '@/components/SlidesComponet.vue';
import slides from '@/data/slides';
import { installationConfigStore } from '@/stores/installationConfig';
import type { Country } from '@/types/Country';
import { getCountryByCode } from '@/utils/countryUtils';
import { ref, onMounted } from 'vue';

const config = installationConfigStore();
const loading = ref(true);
const haveInternet = ref(false);
const { $t, SUPPORT_LOCALES, setI18nLanguage, locale } = i18n();

const checkInternet = async () => {
  fetch('http://ip-api.com/json/')
    .then((response) => response.json())
    .then((data) => {
      haveInternet.value = true;
      const country: Country = getCountryByCode(data.countryCode) as Country;
      setI18nLanguage(country.officialLanguageCode);
      config.setTimeZone(data.timezone) ;
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
  <div class="componere-cta-section">
    <button @click="$emit('nextSection')"><font-awesome-icon icon="fa-angle-right" /></button>
  </div>
</template>
