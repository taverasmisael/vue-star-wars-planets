import { type Planet } from "@/types/planet";

const sortNumber = (a: number, b: number) => {
  if (Number.isNaN(a)) {
    return -1;
  } else if (Number.isNaN(b)) {
    return 1;
  }
  return a - b;
};

const sortFunctions = {
  name: (a: Planet, b: Planet) => a.name.localeCompare(b.name),
  population: (a: Planet, b: Planet) => sortNumber(a.population, b.population),
  residents: (a: Planet, b: Planet) => sortNumber(a.residents.length, b.residents.length),
  rotationPeriod: (a: Planet, b: Planet) => sortNumber(a.rotationPeriod, b.rotationPeriod),
  gravity: (a: Planet, b: Planet) => sortNumber(a.gravity.value, b.gravity.value),
} as const satisfies Record<SortingKey, CompareFn<Planet>>;

type CompareFn<T> = (a: T, b: T) => number;

const sort = <T>(array: T[], compareFn: CompareFn<T>) => [...array].sort(compareFn);
export function sortPlanets(planets: Planet[], key: SortingKey, order: SortingOrder) {
  const sortFunction = sortFunctions[key];
  const sorted = sort(planets, sortFunction);

  return order === "ASC" ? sorted : sorted.reverse();
}

// Picking these because they represent different types of data and are all sortable... if you do magic.
export const SortingKeys = [
  "name", // string
  "population", // number
  "residents", // array
  "rotationPeriod", // number
  "gravity", // composite string
] as const satisfies ReadonlyArray<keyof Planet>;
export type SortingKey = (typeof SortingKeys)[number];
export const SortingOrders = ["ASC", "DESC"] as const;
export type SortingOrder = (typeof SortingOrders)[number];

export type Sort = {
  key: SortingKey;
  order: SortingOrder;
};
