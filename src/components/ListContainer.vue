<script setup lang="ts">
import { onMounted, ref } from "vue";
import { planetStore } from "@/store";
import PlanetCard from "./PlanetCard.vue";

const bottom = ref<HTMLElement | null>(null);
const { planets, fetchPlanents, fetchStatus } = planetStore;

onMounted(() => {
  // Very rudimentary infinite scroll
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) fetchPlanents();
    },
    { threshold: 1 },
  );
  observer.observe(bottom.value!);
});
</script>
<template>
  <div class="container mx-auto p-8">
    <div class="grid items-start gap-12 md:grid-cols-2 lg:grid-cols-3">
      <TransitionGroup name="planets">
        <PlanetCard v-for="planet in planets" :key="planet.name" :planet="planet" />
      </TransitionGroup>
    </div>
    <div ref="bottom" class="h-0"></div>
    <p v-if="fetchStatus === 'pending'" class="mx-auto mt-10 text-center">
      <img
        class="inline-block w-24 motion-safe:animate-bounce"
        alt="Grogu is loading more planets"
        src="/baby-yoda.png"
        width="48"
        height="24"
      />
    </p>
  </div>
</template>
