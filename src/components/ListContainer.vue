<script setup lang="ts">
import { useStore } from "@/store";
import PlanetCard from "./PlanetCard.vue";

const { planets } = useStore();
</script>
<template>
  <div class="container mx-auto p-8">
    <div class="grid items-start gap-12 md:grid-cols-2 lg:grid-cols-3">
      <PlanetCard v-for="planet in planets" :key="planet.name" :planet="planet" />
    </div>
  </div>
</template>
