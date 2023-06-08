export type Id = number | string;

export type Module = {
  id: Id;
  label: string; // e.g. `react`, `@sail/ui`
  edges?: Id[];
  // absolutePath: string;
};

export type GraphData = {
  nodes: Module[];
};
