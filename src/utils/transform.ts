import type { PlanetResponse, Planet } from "@/types/planet";

export function responseToPlanetData(planet: PlanetResponse): Planet {
  const gravity = {
    value: planetGravityToNumber(planet.gravity),
    label: planet.gravity,
    toString() {
      return this.label;
    },
  };
  return {
    climate: planet.climate.split(", "),
    films: planet.films,
    gravity,
    name: planet.name,
    orbitalPeriod: parseInt(planet.orbital_period, 10),
    population: parseInt(planet.population, 10),
    residents: planet.residents,
    rotationPeriod: parseInt(planet.rotation_period, 10),
    surfaceWater: parseInt(planet.surface_water, 10),
    terrain: planet.terrain.split(", "),
    url: new URL(planet.url),
  };
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
