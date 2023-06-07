import { ref } from "vue";
const stringToUrl = (url: string) => new URL(url);

const planets = ref<Planet[]>([]);

export function useStore() {
  const setPlanets = (newPlanets: Planet[], append?: boolean) => {
    if (append) {
      planets.value = [...planets.value, ...newPlanets];
    } else {
      planets.value = newPlanets;
    }
  };

  const fetchPlanents = async () => {
    const response = await fetch("https://swapi.dev/api/planets/");
    const data = (await response.json()) as { results: PlanetResponse[] };
    setPlanets(data.results.map(responseToPlanetData));
  };

  return { planets, fetchPlanents };
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
