export type Id = number | string;

export type Module = {
  id: Id;
  // Defaults to `id` if undefined.
  label?: string;
  edges?: Id[];
  // absolutePath: string;
};

export type GraphData = {
  nodes: Module[];
};
