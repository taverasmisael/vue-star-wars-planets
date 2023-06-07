import { ref, watch, computed } from "vue";

import { type SortingKey, sortPlanets, type SortingOrder } from "@/utils/sort";
import { responseToPlanetData } from "@/utils/transform";
import type { Planet, PlanetResponse } from "@/types/planet";

export function createStore() {
  const planets = ref<Planet[]>([]);
  const sortOrder = ref<SortingOrder>("ASC");
  const sortKey = ref<SortingKey>("name");
  const setPlanets = (newPlanets: Planet[], append?: boolean) => {
    if (append) {
      planets.value = [...planets.value, ...newPlanets];
    } else {
      planets.value = newPlanets;
    }
  };

  const setSortKey = (key: SortingKey) => {
    sortKey.value = key;
  };
  const setSortOrder = (order: SortingOrder) => {
    sortOrder.value = order;
  };

  const sort = computed(() => ({ key: sortKey.value, order: sortOrder.value }));

  watch(sort, () => {
    setPlanets(sortPlanets(planets.value, sortKey.value, sortOrder.value));
  });

  const fetchPlanents = async () => {
    const response = await fetch("https://swapi.dev/api/planets/");
    const data = (await response.json()) as { results: PlanetResponse[] };
    setPlanets(sortPlanets(data.results.map(responseToPlanetData), sortKey.value, sortOrder.value));
  };

  return { planets, fetchPlanents, setSortKey, setSortOrder, sort: { key: sortKey, order: sortOrder } };
}

export type Store = ReturnType<typeof createStore>;
export const planetStore = createStore();
