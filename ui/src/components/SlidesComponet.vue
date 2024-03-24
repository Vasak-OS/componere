<script lang="ts" setup>
import slides from '@/data/slides';
import { onMounted, ref } from 'vue';

const cantSlides = slides.length;
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
          <div
            class="bg-cover bg-center h-auto text-white py-24 px-10 object-fill rounded-vsk aspect-video"
            style="
              background-image: url(https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1422&q=80);
            "
          >
            <div class="md:w-1/2">
              <p class="font-bold text-sm uppercase">{{ slide.title }}</p>
              <p class="text-3xl font-bold">Hello world</p>
              <p class="text-2xl mb-10 leading-none">{{ slide.title }}</p>
            </div>
          </div>
          <!-- container -->
          <br />
        </div>
      </template>
    </transition>
  </div>
</template>
