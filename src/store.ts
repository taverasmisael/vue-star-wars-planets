import { ref, watch, computed } from "vue";

import { type SortingKey, sortPlanets, type SortingOrder } from "@/utils/sort";
import { responseToPlanetData } from "@/utils/transform";
import type { Planet, PlanetResponse } from "@/types/planet";

export function createStore() {
  const planets = ref<Planet[]>([]);
  const next = ref<null | string>("https://swapi.dev/api/planets/");
  const sortOrder = ref<SortingOrder>("ASC");
  const sortKey = ref<SortingKey>("name");
  const fetchStatus = ref<FetchStatus>("idle");
  const setPlanets = (newPlanets: Planet[]) => {
    const allPlanets = [...planets.value, ...newPlanets];
    planets.value = sortPlanets(allPlanets, sortKey.value, sortOrder.value);
  };

  const setSortKey = (key: SortingKey) => {
    sortKey.value = key;
  };
  const setSortOrder = (order: SortingOrder) => {
    sortOrder.value = order;
  };

  const sort = computed(() => ({ key: sortKey.value, order: sortOrder.value }));

  watch(sort, () => {
    console.log(planets.value);
    planets.value = sortPlanets(planets.value, sortKey.value, sortOrder.value);
  });

  const fetchPlanents = async () => {
    if (!next.value) return;
    if (fetchStatus.value === "pending") return;

    fetchStatus.value = "pending";
    const response = await fetch(next.value);
    const data = (await response.json()) as { results: PlanetResponse[]; next: null | string };
    next.value = data.next;
    setPlanets(data.results.map(responseToPlanetData));

    fetchStatus.value = "success";
  };

  return {
    fetchPlanents,
    fetchStatus,
    planets,
    setSortKey,
    setSortOrder,
    sort: { key: sortKey, order: sortOrder },
  };
}

type FetchStatus = "idle" | "pending" | "success" | "error";
export type Store = ReturnType<typeof createStore>;
export const planetStore = createStore();
