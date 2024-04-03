<script setup lang="ts">
import { inject, onMounted, ref, computed, type Component } from 'vue';
import { WindowFrame, SideBar, SideButton } from '@vasakgroup/vue-libvasak';
import routers from '@/routers/index';
import type { VSK } from '@/types/VSK';
import type { VSKRoute } from '@/types/VSKRoute';

const $vsk: VSK = inject('vsk') as VSK;
const icon = ref('');
const section = ref(0);
const routersData = ref(routers);

const setIcon = async () => {
  icon.value = await $vsk.getIcon('calamares');
};

const routerComponent = computed((): Component => {
  return routers[section.value]?.component as Component;
});

const getImage = (image: string): Promise<string> => $vsk.getIcon(image);

routersData.value.forEach((router: VSKRoute) => {
  getImage(router.image).then((img: string) => {
    router.image = img;
  });
});

const nextSection = (): void => {
  section.value += 1;
};

const prevSection = (): void => {
  section.value -= 1;
};

onMounted(() => {
  $vsk.loadUIConfig();
  setIcon();
});
</script>

<template>
  <WindowFrame title="Componere" v-bind:image="icon">
    <div class="flex">
      <SideBar>
        <SideButton
          v-for="router in routersData"
          :key="router.tag"
          :title="router.title"
          :image="router.image"
          @click="(): void => {}"
        />
      </SideBar>

      <div class="p-3 col side-content-area">
        <component :is="routerComponent" @nextSection="nextSection" @prevSection="prevSection" />
      </div>
    </div>
  </WindowFrame>
</template>
