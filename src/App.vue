<script setup lang="ts">
import ListSort from "@/components/ListSort.vue";
import ListContainer from "@/components/ListContainer.vue";
import { useStore } from "@/store";

const { fetchPlanents } = useStore();

fetchPlanents();
</script>

<template>
  <header
    class="relative mb-8 max-h-fit bg-black bg-[url('https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover p-8 py-16 text-slate-100 md:p-16 lg:py-32"
  >
    <div class="absolute inset-0 bg-black bg-opacity-40"></div>
    <div class="container relative mx-auto text-center">
      <h1
        class="mb-4 bg-gradient-to-b from-yellow-50 via-yellow-300 to-yellow-400 bg-clip-text text-4xl font-semibold leading-relaxed text-transparent md:text-6xl lg:text-8xl"
      >
        Star Wars Planets
      </h1>
      <p class="mb-2 md:text-xl">A list of planets in the Star Wars universe</p>
      <p class="text-sm">
        Results provided by <a class="underline" target="_blank" rel="nofollow" href="https://swapi.dev/">SWAPI</a>
      </p>
    </div>
  </header>
  <aside class="container mx-auto mb-4"><ListSort /></aside>
  <main><ListContainer /></main>
</template>
