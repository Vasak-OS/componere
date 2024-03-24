<script setup lang="ts">
import { inject, onMounted, ref, computed } from 'vue';
import { WindowFrame, SideBar, SideButton } from '@vasakgroup/vue-libvasak';
import routers from '@/routers/index';

const $vsk: any = inject('vsk');
const icon = ref('');
const section = ref('WELCOME');
const routersData = ref(routers);

const setIcon = async () => {
  icon.value = await $vsk.getIcon('calamares');
};

const changeSection = (newSection: string) => {
  console.log('changeSection', newSection);
  section.value = newSection;
};

const routerComponent = computed(() => {
  return routers.find((router: any) => router.tag === section.value)?.component;
});

const getImage = (image: string): Promise<string> => $vsk.getIcon(image);

routersData.value.forEach((router: any) => {
  getImage(router.image).then((img: string) => {
    router.image = img;
  });
});

onMounted(() => {
  $vsk.loadUIConfig();
  setIcon();
});
</script>

<template>
  <WindowFrame title="componere" v-bind:image="icon">
    <div class="flex">
      <SideBar>
        <SideButton
          v-for="router in routersData"
          :key="router.tag"
          :title="router.title"
          :image="router.image"
          @click="changeSection(router.tag)"
        />
      </SideBar>

      <div class="p-3 col side-content-area">
        <transition name="slide-fade" mode="out-in" appear>
          <component :is="routerComponent"></component>
        </transition>
      </div>
    </div>
  </WindowFrame>
</template>
