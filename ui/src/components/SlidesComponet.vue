<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { Slide } from '@/types/Slide';

const props = defineProps({
  slides: Array<Slide>,
});

const cantSlides = props.slides?.length || 0;
const currentSlide = ref(0);

const nextSlide = () => {
  if (currentSlide.value < cantSlides - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0;
  }
};

onMounted(() => {
  setInterval(() => {
    nextSlide();
  }, 3000);
});
</script>

<template>
  <div class="h-auto">
    <transition name="slide-fade" mode="out-in" appear>
      <template v-for="(slide, index) in slides" :key="index">
        <div :id="`slide-${index}`" v-if="index == currentSlide" class="container mx-auto">
          <div class="slide" :style="`background-image: url(${slide.background});`">
            <div class="md:w-1/2">
              <p class="font-bold text-sm uppercase">{{ slide.title }}</p>
              <p class="text-3xl font-bold">{{ slide.title }}</p>
              <p class="text-2xl mb-10 leading-none">{{ slide.description }}</p>
            </div>
          </div>
          <!-- container -->
          <br />
        </div>
      </template>
    </transition>
  </div>
</template>
