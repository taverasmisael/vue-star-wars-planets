<script setup lang="ts">
import type { Planet } from "@/types/planet";
import { SortingKeys } from "@/utils/sort";
import { headerCase } from "change-case";

export type Props = {
  planet: Planet;
};
defineProps<Props>();

function toDisplayableProperty(prop: Planet[keyof Planet]): string {
  if (Array.isArray(prop)) return prop.length.toString();
  if (Number.isNaN(prop)) return "Unknown";
  return prop.toString();
  
}
</script>

<template>
  <div class="p-8 rounded-md bg-white shadow">
    <h3>{{ planet.name }}</h3>
    <p v-for="key in SortingKeys" :key="key">{{ headerCase(key) }}: {{ toDisplayableProperty(planet[key]) }}</p>
  </div>
</template>
