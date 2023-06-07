<script setup lang="ts">
import ListFilter from "@/components/ListFilter.vue";
import ListContainer from "@/components/ListContainer.vue";
import { useStore } from "@/store";

const { fetchPlanents } = useStore();

fetchPlanents();
</script>

<template>
  <header>
    <h1 class="text-4xl">Star Wars Planets</h1>
    <p class="text-xl">A list of planets in the Star Wars universe</p>
    <p class="text-sm">
      Results provided by <a class="underline" target="_blank" rel="nofollow" href="https://swapi.dev/">SWAPI</a>
    </p>
  </header>
  <aside class="mb-4 container mx-auto"><ListFilter /></aside>
  <main class="p-8"><ListContainer /></main>
</template>
