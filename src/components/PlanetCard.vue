<script setup lang="ts">
import { type Planet, SortingKeys } from "@/store";
import { headerCase } from "change-case";

export interface Props {
  planet: Planet;
}
defineProps<Props>();
</script>

<template>
  <div class="p-8 rounded-md bg-white shadow">
    <h3>{{ planet.name }}</h3>
    <p v-for="key in SortingKeys" :key="key">{{ headerCase(key) }}: {{ planet[key] }}</p>
  </div>
</template>
