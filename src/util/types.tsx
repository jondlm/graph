export type Module = {
  id: string;
  // Defaults to `id` if undefined.
  label?: string;
  edges?: string[];
};

export type GraphData = {
  nodes: Module[];
};
