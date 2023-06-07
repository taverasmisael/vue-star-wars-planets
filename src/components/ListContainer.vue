<script setup lang="ts">
import { useStore } from "@/store";
import PlanetCard from "./PlanetCard.vue";

const { planets } = useStore();
</script>
<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-3 items-start gap-12">
      <PlanetCard v-for="planet in planets" :key="planet.name" :planet="planet" />
    </div>
  </div>
</template>
