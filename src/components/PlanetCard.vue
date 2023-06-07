<script setup lang="ts">
import type { Planet } from "@/store";

export interface Props {
  planet: Planet;
}
defineProps<Props>();
</script>

<template>
  <div class="p-8 rounded-md bg-white shadow">
    <h3>{{ planet.name }}</h3>
    <p>Population: {{ planet.population }}</p>
    <p>Climate: {{ planet.climate }}</p>
  </div>
</template>
