import { createSignal, onMount, createEffect, For, Show } from "solid-js";
import { Orb } from "@memgraph/orb";
import { parseDotGraph } from "../util/parsers/dot";
import { debounce } from "../util/general";
import { tarjan } from "../util/algo/tarjan";

import type { Id, Module, GraphData } from "../util/types";

type Edge = {
  id: Id;
  start: Id;
  end: Id;
};

const tableauColors = [
  "#4e79a7",
  "#f28e2b",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc948",
  "#b07aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ac",
];

const buttonClass = "bg-blue-500 hover:bg-blue-700 text-white px-2 rounded";

const sampleData = {
  nodes: [{ id: 1, edges: [2] }, { id: 2 }],
};

const Graph = () => {
  const [filter, setFilter] = createSignal<string>("");
  const [orb, setOrb] = createSignal<Orb>();
  const [graphData, setGraphData] = createSignal<GraphData>(sampleData);
  const [windowSize, setWindowSize] = createSignal<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [message, setMessage] = createSignal<string>("");

  const processInput = (input: string) => {
    let d: any;

    try {
      d = JSON.parse(input);
    } catch (e) {
      d = parseDotGraph(input);
    }
    setGraphData(d);
  };

  let graphRef: HTMLDivElement | undefined = undefined;

  onMount(() => {
    // make TS happy
    if (graphRef == null) {
      return;
    }

    window.addEventListener(
      "resize",
      debounce(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      })
    );

    const o = new Orb(graphRef);
    o.data.setDefaultStyle({
      getNodeStyle(node) {
        const basicStyle = {
          borderColor: "#d5dbe1",
          borderWidth: 0.4,
          color: "#f6f8fa",
          colorHover: "#d5dbe1",
          colorSelected: "#ddfffe",
          fontSize: 3,
          label: node.data.label,
          size: 6,
        };

        // if (node.data.label === "Node A") {
        //   return {
        //     ...basicStyle,
        //     size: 10,
        //     color: "#00FF2B",
        //   };
        // }

        return {
          ...basicStyle,
        };
      },
      getEdgeStyle(edge) {
        return {
          color: "#999999",
          colorHover: "#1d1d1d",
          colorSelected: "#1d1d1d",
          fontSize: 3,
          width: 0.3,
          widthHover: 0.5,
          widthSelected: 0.5,
          label: edge.data.label,
        };
      },
    });

    setOrb(o);
  }); // end onMount

  createEffect(() => {
    // reactive deps
    const o = orb();
    const gd = graphData();

    // make TS happy
    if (graphRef == null || o == null) {
      return;
    }

    let edgeId = 0;
    const edges: Edge[] = [];
    const nodes = gd.nodes.map((node) => {
      if (node.edges != null) {
        node.edges.forEach((endId) => {
          edges.push({ id: edgeId, start: node.id, end: endId });
          edgeId += 1;
        });
      }

      return {
        id: node.id,
        label: node.label ?? node.id,
      };
    });

    o.data.setup({ nodes, edges });

    o.data.getNodeById("");
    o.view.render(() => {
      o.view.recenter();
    });
  }); // end createEffect

  createEffect(() => {
    const size = windowSize();
    const o = orb();

    // make TS happy
    if (o == null) {
      return;
    }

    o.view.recenter();
  }); // end createEffect

  return (
    <div class="h-screen flex flex-initial">
      {/* sidebar */}
      <div class="w-2/6 overflow-auto bg-slate-50 p-2">
        <h1 class="text-xl mb-3">Load Data</h1>
        <div class="flex mb-3">
          <button
            class={buttonClass}
            onClick={async () => {
              const text = await navigator.clipboard.readText();
              processInput(text);
            }}
          >
            From clipboard
          </button>
          <div
            class="bg-white rounded-md border border-dashed px-1 ml-1 border-slate-300"
            onDragOver={(ev) => {
              ev.preventDefault();
            }}
            onDrop={(ev) => {
              ev.preventDefault();
              if (ev.dataTransfer != null && ev.dataTransfer.items) {
                // Use DataTransferItemList interface to access the file(s)
                [...ev.dataTransfer.items].forEach((item, i) => {
                  // If dropped items aren't files, reject them
                  if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file) {
                      file.text().then((input) => {
                        processInput(input);
                      });
                    }
                  }
                });
              }
            }}
          >
            Drag file here
          </div>
        </div>
        <h1 class="text-xl mb-3">Tools</h1>
        <div>
          <div class="flex my-1 justify-between">
            <button
              class={buttonClass}
              onClick={async () => {
                const gd = graphData();
                const start = Date.now();
                const cycles = tarjan(gd);
                const end = Date.now();

                if (cycles.length > 0) {
                  setMessage(
                    `Cycles found in ${(end - start).toFixed(
                      0
                    )}ms:\n${JSON.stringify(cycles, null, 2)}`
                  );

                  return;
                }

                setMessage(`No cycles found in ${(end - start).toFixed(0)}ms.`);
              }}
            >
              Detect cycles
            </button>
          </div>
          {/* info box */}
          <Show when={message()}>
            <pre class="bg-white overflow-auto text-sm rounded-md border p-2 border-slate-300 mb-1">
              {message}
            </pre>
          </Show>
          <h1 class="text-xl mb-3 mt-3">Search</h1>
          <div class="flex justify-between">
            <input
              class="p-1 w-8/12 border border-slate-300 rounded-md"
              type="text"
              // @ts-expect-error -- not sure why `value` is missing
              onInput={(e) => setFilter(e.target.value)}
              placeholder="filter nodes"
            />
            <div class="text-right text-xs self-center">
              click item to select
            </div>
          </div>
          <ul class="list-disc list-inside text-xs">
            <For
              each={graphData()
                .nodes.filter((n) => String(n.id).includes(filter()))
                .sort((a, b) => (a.id > b.id ? 1 : -1))}
            >
              {(node) => (
                <li
                  onClick={() => {
                    const o = orb();
                    if (o === undefined) return;

                    const n = o.data.getNodeById(node.id);
                    if (n === undefined) return;
                    n.state = 1; // "selected", doesnt seem to be accessible via api
                    o.view.render(); // won't redraw unless you call this
                  }}
                >
                  <a
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    href="#"
                  >
                    {node.id}
                  </a>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
      {/* main */}
      <div class="w-5/6">
        <div class="h-screen" ref={graphRef} />
      </div>
    </div>
  );
};

export { Graph };
