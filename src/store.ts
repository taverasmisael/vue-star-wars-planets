import { ref, watch, computed } from "vue";
const stringToUrl = (url: string) => new URL(url);

const planets = ref<Planet[]>([]);
const sortOrder = ref<SortingOrder>("ASC");
const sortKey = ref<SortingKey>("name");

export function useStore() {
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
    console.log(data.results);
    setPlanets(sortPlanets(data.results.map(responseToPlanetData), sortKey.value, sortOrder.value));
  };

  return { planets, fetchPlanents, setSortKey, setSortOrder, sort: { key: sortKey, order: sortOrder } };
}

function planetGravityToNumber(gravity: string) {
  return gravity
    .split(", ")
    .map((g) => g.split(" "))
    .reduce((acc, cur) => {
      const value = Number(cur[0]);
      const nonStandardG = cur[1] === "standard" ? 1 : 2;
      return Number.isNaN(value) ? acc : acc + value * nonStandardG;
    }, 0);
}

const sortNumber = (a: number, b: number) => a - b;
const sortString = (a: string, b: string) => a.localeCompare(b);
const sortFunctions = {
  name: (a: Planet, b: Planet) => sortString(a.name, b.name),
  population: (a: Planet, b: Planet) => sortNumber(a.population, b.population),
  residents: (a: Planet, b: Planet) => sortNumber(a.residents.length, b.residents.length),
  rotationPeriod: (a: Planet, b: Planet) => sortNumber(a.rotationPeriod, b.rotationPeriod),
  gravity: (a: Planet, b: Planet) => sortNumber(planetGravityToNumber(a.gravity), planetGravityToNumber(b.gravity)),
} as const satisfies Record<SortingKey, CompareFn<Planet>>;

type CompareFn<T> = (a: T, b: T) => number;

const sort = <T>(array: T[], compareFn: CompareFn<T>) => [...array].sort(compareFn);
function sortPlanets(planets: Planet[], key: SortingKey, order: SortingOrder) {
  const sortFunction = sortFunctions[key];

  return order === "ASC" ? sort(planets, sortFunction) : sort(planets, sortFunction).reverse();
}

function responseToPlanetData(planet: PlanetResponse): Planet {
  return {
    climate: planet.climate.split(", "),
    films: planet.films.map(stringToUrl),
    gravity: planet.gravity,
    name: planet.name,
    orbitalPeriod: parseInt(planet.orbital_period, 10),
    population: parseInt(planet.population, 10),
    residents: planet.residents.map(stringToUrl),
    rotationPeriod: parseInt(planet.rotation_period, 10),
    surfaceWater: parseInt(planet.surface_water, 10),
    terrain: planet.terrain.split(", "),
    url: new URL(planet.url),
  };
}

interface PlanetResponse {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export interface Planet {
  climate: string[];
  films: URL[];
  gravity: string;
  name: string;
  orbitalPeriod: number;
  population: number;
  residents: URL[];
  rotationPeriod: number;
  surfaceWater: number;
  terrain: string[];
  url: URL;
}

// Picking these because they represent different types of data and are all sortable... if you do magic.
export const SortingKeys = [
  "name", // string
  "population", // number
  "residents", // array
  "rotationPeriod", // number
  "gravity", // composite string
] as const satisfies ReadonlyArray<keyof Planet>;
type SortingKey = (typeof SortingKeys)[number];
export const SortingOrders = ["ASC", "DESC"] as const;
type SortingOrder = (typeof SortingOrders)[number];

export interface Sort {
  key: SortingKey;
  order: SortingOrder;
}
