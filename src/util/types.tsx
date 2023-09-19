export type Module = {
  id: string;
  // Defaults to `id` if undefined.
  label?: string;
  edges?: string[];
};

export type GraphData = {
  nodes: Module[];
};

export function assertUnreachable(x: never): never {
  throw new Error("This should be impossible courtesy of TypeScript.");
}
