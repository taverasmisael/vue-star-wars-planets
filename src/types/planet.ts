// I don't like this `types` structure but I also don't like having the types on the transformers or the store
// because either way they can become too coupled or create a circular dependency. This is a small project so
// I'm not too worried about it but I'd like to find a better way to structure this.

export type PlanetResponse = {
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
};

type PlanetGravity = {
  value: number;
  label: string;
};

export type Planet = {
  climate: string[];
  films: string[];
  gravity: PlanetGravity;
  name: string;
  orbitalPeriod: number;
  population: number;
  residents: string[];
  rotationPeriod: number;
  surfaceWater: number;
  terrain: string[];
  url: URL;
};
