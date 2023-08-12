import {
  createSignal,
  onMount,
  createEffect,
  For,
  Show,
  Switch,
  Match,
} from "solid-js";
import { scaleSequential, type ScaleSequential } from "d3-scale";
import { interpolateCool } from "d3-scale-chromatic";
import {
  Graph as CosmoGraph,
  type GraphConfigInterface,
} from "@cosmograph/cosmos";
// => // fix syntax highlighting
import { parseDotGraph } from "../util/parsers/dot";
import { debounce } from "../util/general";
import { tarjan } from "../util/algo/tarjan";
import List from "./list.js";

import type { Module, GraphData } from "../util/types";

// Little hack to "fix" hmr with tailwind styles
// @ts-expect-error
if (module.hot) {
  // @ts-expect-error
  module.hot.accept(() => {
    document.location.reload();
  });
}

type Node = {
  id: string;
  edgesIn: number;
  edgesOut: number;
};

type Edge = {
  id: string;
  source: string;
  target: string;
};

const slate = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
  950: "#020617",
};

const MAX_LIST_LENGTH = 25;

const Link = (props: any) => (
  <a class="font-medium text-zinc-400 underline" href="#">
    {props.children}
  </a>
);

const buttonClass =
  "bg-indigo-500 hover:bg-indigo-700 text-zinc-200 px-2 rounded";

// I tried putting this in a `createSignal` but it was a hassle to get TS to be
// happy so I'm putting it in module scope here.
const nodeScale = scaleSequential(interpolateCool);

const rawSampleData = `{
  "nodes": [
    { "id": "1", "edges": ["2"]      },
    { "id": "2", "edges": ["3"]      },
    { "id": "3", "edges": ["1", "4"] },
    { "id": "4", "edges": ["5"]      },
    { "id": "5", "edges": ["6"]      },
    { "id": "6", "edges": ["5"]      }
  ]
}`;
const sampleData = JSON.parse(rawSampleData);

const Graph = () => {
  const [filter, setFilter] = createSignal<string>("");
  const [cosmoGraph, setCosmoGraph] = createSignal<CosmoGraph<Node, Edge>>();
  const [graphData, setGraphData] = createSignal<GraphData>(sampleData);
  const [filteredGraphData, setFilteredGraphData] = createSignal<Module[]>([]);
  const [numEdges, setNumEdges] = createSignal<number>(1); // hard coded start value :|
  const [windowSize, setWindowSize] = createSignal<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [message, setMessage] = createSignal<string>("");
  const [domain, setDomain] = createSignal<[number, number]>([1, 0]);
  const [selectedNodeId, setSelectedNodeId] = createSignal<string>();
  const [tab, setTab] = createSignal<"load" | "algo" | "node" | "search">(
    "load"
  );

  const processInput = (input: string) => {
    let d: any;

    try {
      d = JSON.parse(input);
    } catch (e) {
      d = parseDotGraph(input);
    }
    setGraphData(d);
  };

  let canvasRef: HTMLCanvasElement | undefined = undefined;

  onMount(() => {
    // make TS happy
    if (canvasRef == null) {
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

    let g: CosmoGraph<Node, Edge>;

    const config: GraphConfigInterface<Node, Edge> = {
      nodeGreyoutOpacity: 0.2,
      backgroundColor: slate["900"],
      linkArrows: false,
      linkColor: (link) => slate["100"],
      linkWidth: 0.1,
      scaleNodesOnZoom: true,
      showFPSMonitor: true,
      nodeColor: (node) => nodeScale(node.edgesIn),
      nodeSizeScale: 0.6,
      events: {
        onClick: (node) => {
          // This handler introduces a closure that'll hold on to `g`. Not sure
          // if that'll cause problems down the road.
          if (node == null) {
            setSelectedNodeId();
            g.unselectNodes();
          } else {
            setTab("node");
            setSelectedNodeId(node.id);
            g.selectNodeById(node.id);
          }
        },
      },
    };

    g = new CosmoGraph(canvasRef, config);
    // @ts-expect-error
    window.g = g;
    setCosmoGraph(g);
  }); // end onMount

  createEffect(() => {
    // reactive deps
    const g = cosmoGraph();
    const gd = graphData();

    // make TS happy
    if (canvasRef == null || g == null) {
      return;
    }

    let edgeId = 0;
    let largestEdgesIn = 0;

    const edges: Edge[] = [];
    const nodes: Node[] = gd.nodes.map((node) => {
      let edgesIn = 0;

      if (node.edges != null) {
        edgesIn = node.edges.length;

        if (edgesIn > largestEdgesIn) {
          largestEdgesIn = edgesIn;
        }

        node.edges.forEach((endId) => {
          edges.push({
            id: edgeId.toString(),
            source: node.id,
            target: endId,
          });
          edgeId += 1;
        });
      }

      return {
        id: node.id,
        edgesIn,
        edgesOut: 0, // TODO
      };
    });

    // Adjust the scale domain based on the observed data
    nodeScale.domain([0, largestEdgesIn]);
    setNumEdges(edgeId);

    g.setData(nodes, edges);
    // TODO: why do I need a timeout here?
    setTimeout(function () {
      g.fitView();
    }, 200);
  }); // end createEffect

  createEffect(() => {
    const size = windowSize();
    const g = cosmoGraph();

    // make TS happy
    if (g == null) {
      return;
    }

    g.fitView();
  }); // end createEffect

  createEffect(() => {
    // reactive deps
    const gd = graphData();

    setFilteredGraphData(
      gd.nodes
        .filter((n) => String(n.id).includes(filter()))
        .sort((a, b) => (a.id > b.id ? 1 : -1))
    );
  });

  return (
    <div class="h-screen flex flex-initial">
      {/* sidebar */}
      <div class="w-2/6 overflow-auto bg-slate-800 text-zinc-200 px-2">
        {/* top bar */}
        <ul class="p-2 flex mt-1 mb-2 items-baseline justify-evenly text-sm border-b border-slate-600">
          <li
            class="cursor-pointer"
            onClick={() => setTab("load")}
            classList={{ underline: tab() === "load" }}
          >
            load data
          </li>
          <li
            class="cursor-pointer"
            onClick={() => setTab("algo")}
            classList={{ underline: tab() === "algo" }}
          >
            algorithms
          </li>
          <li
            class="cursor-pointer"
            onClick={() => setTab("node")}
            classList={{ underline: tab() === "node" }}
          >
            node
          </li>
          <li
            class="cursor-pointer"
            onClick={() => setTab("search")}
            classList={{ underline: tab() === "search" }}
          >
            search
          </li>
        </ul>
        <Switch>
          <Match when={tab() === "load"}>
            <div class="flex mb-2">
              <button
                class={buttonClass}
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  processInput(text);
                  setTab("search");
                }}
              >
                From clipboard
              </button>
              <div
                class="bg-slate-700 rounded border border-dashed px-1 ml-1 border-slate-500 text-center grow"
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
            <p>Sample data:</p>
            <pre class="bg-slate-700 rounded text-sm p-2">{rawSampleData}</pre>
          </Match>
          <Match when={tab() === "algo"}>
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

                    setMessage(
                      `No cycles found in ${(end - start).toFixed(0)}ms.`
                    );
                  }}
                >
                  Detect cycles
                </button>
              </div>
              {/* info box */}
              <Show when={message()}>
                <pre class="bg-slate-700 overflow-auto text-sm rounded border p-2 border-slate-600 mb-1">
                  {message}
                </pre>
              </Show>
            </div>
          </Match>
          <Match when={tab() === "node"}>
            <Show
              when={selectedNodeId() != null}
              fallback={"No selected node."}
            >
              <ul>
                <li>Id: {selectedNodeId()}</li>
                <li>
                  Outgoing edges:{" "}
                  {
                    graphData().nodes.filter(
                      (n) => n.id === selectedNodeId()
                    )[0]?.edges?.length
                  }
                </li>
                <li>
                  {/* TODO: this is computationally expensive since
                      we have to iterate through every single edge */}
                  Incoming edges:{" "}
                  <List
                    data={graphData().nodes}
                    maxLength={25}
                    onClick={(n) => console.log("TODO", n.id)}
                  />
                  {graphData().nodes.reduce((acc, n) => {
                    n?.edges?.forEach((e) => {
                      if (e === selectedNodeId()) {
                        acc++;
                      }
                    });
                    return acc;
                  }, 0)}
                </li>
              </ul>
            </Show>
          </Match>
          <Match when={tab() === "search"}>
            <div>
              <div class="flex justify-between mb-2">
                <input
                  class="p-1 w-8/12 border bg-slate-700 border-slate-600 rounded"
                  type="text"
                  value={filter()}
                  // @ts-expect-error -- not sure why `value` is missing
                  onInput={(e) => setFilter(e.target.value)}
                  placeholder="filter nodes"
                />
                <div class="text-right text-xs self-center">
                  click item(s) to select
                </div>
              </div>
              <ul class="border border-slate-600 divide-y divide-slate-600 rounded text-xs">
                <For each={filteredGraphData().slice(0, MAX_LIST_LENGTH)}>
                  {(node) => (
                    <li
                      class="py-1 px-2 cursor-pointer hover:underline"
                      onClick={() => {
                        const o = cosmoGraph();
                        if (o === undefined) return;

                        setTab("node");
                        setSelectedNodeId(node.id);
                        o.selectNodeById(node.id);
                      }}
                    >
                      <a href="#">{node.id}</a>
                    </li>
                  )}
                </For>
              </ul>
              <Show when={filteredGraphData().length > MAX_LIST_LENGTH}>
                <div class="mt-2 text-xs text-zinc-500 text-right">
                  {filteredGraphData().length - MAX_LIST_LENGTH} results hidden
                </div>
              </Show>
            </div>
          </Match>
        </Switch>
      </div>
      {/* main */}
      <div class="w-5/6 bg-slate-800 relative">
        <canvas class="h-screen" ref={canvasRef} />
        <div class="absolute text-sm text-zinc-200 bottom-0 right-0 py-2 px-4 bg-slate-800 border-t border-l border-slate-600 rounded-tl-md">
          <div>Nodes: {graphData().nodes.length}</div>
          <div>Edges: {numEdges()}</div>
        </div>
      </div>
    </div>
  );
};

export { Graph };
