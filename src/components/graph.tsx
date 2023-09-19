import {
  createSignal,
  createMemo,
  onMount,
  createEffect,
  For,
  Show,
  Switch,
  Match,
} from "solid-js";
import { scaleSequential } from "d3-scale";
import type { ScaleSequential } from "d3-scale";
import { interpolateCool } from "d3-scale-chromatic";
import { Graph as CosmoGraph } from "@cosmograph/cosmos";
import type { GraphConfigInterface } from "@cosmograph/cosmos";
import { parseDotGraph } from "../util/parsers/dot";
import { debounce } from "../util/general";
import { tarjan } from "../util/algo/tarjan";
import { pageRank } from "../util/algo/page-rank";
import List from "./list.js";

import type { Module, GraphData } from "../util/types";
import { assertUnreachable } from "../util/types";

// Little hack to "fix" hmr with tailwind styles. This doesn work with
// sub-modules :(
// @ts-expect-error
if (module.hot) {
  // @ts-expect-error
  module.hot.accept(() => {
    document.location.reload();
  });
}

type Format = "json" | "dot";

type Node = {
  id: string;

  // A number between 0 and 1 that colors the node.
  colorScaleValue?: number;
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

const rawStartingSampleData: { [k in Format]: string } = {
  json: `{
  "nodes": [
    { "id": "1", "edges": ["2"]      },
    { "id": "2", "edges": ["3"]      },
    { "id": "3", "edges": ["1", "4"] },
    { "id": "4", "edges": ["5"]      },
    { "id": "5"                      }
  ]
}`,
  dot: `digraph my_graph {
  joe   -> sally;
  joe   -> frank;
  frank -> susan;
  sally -> frank;
  joe   -> susan;
}`,
};

const startingSampleData = JSON.parse(rawStartingSampleData.json);

const Graph = () => {
  const [rawSampleData, setRawSampleData] = createSignal<string>(
    rawStartingSampleData.json
  );

  const [filter, setFilter] = createSignal<string>("");
  const [cosmoGraph, setCosmoGraph] = createSignal<CosmoGraph<Node, Edge>>();
  const [graphData, setGraphData] = createSignal<GraphData>(startingSampleData);
  const [inputFormat, setInputFormat] = createSignal<Format>("json");
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

  // This is computationally expensive but I think solid.js will insulate us
  // fairly well. It should only recompute this if the selected node changes.
  const incomingEdges = createMemo(() => {
    const sn = selectedNodeId();

    return graphData().nodes.reduce<{ id: string }[]>((acc, n) => {
      n?.edges?.forEach((e) => {
        if (e === sn) {
          acc.push({ id: n.id });
        }
      });
      return acc;
    }, []);
  });

  // This is computationally expensive but I think solid.js will insulate us
  // fairly well. It should only recompute this if the selected node changes.
  const outgoingEdges = createMemo(() => {
    const sn = selectedNodeId();

    return graphData()
      .nodes.filter((n) => n.id === sn && n.edges != null)
      .flatMap((n) => n.edges!.map((e) => ({ id: e })));
  });

  const selectNode = (id: string, zoom: boolean) => {
    const cg = cosmoGraph();

    if (cg == null) return;

    setSelectedNodeId(id);
    cg.selectNodeById(id);

    if (zoom) {
      cg.zoomToNodeById(id, 700, cg.getZoomLevel());
    }
  };

  const processInput = (input: string) => {
    const inpf = inputFormat();
    let d: any;

    switch (inpf) {
      case "json": {
        d = JSON.parse(input);
        break;
      }
      case "dot": {
        d = parseDotGraph(input);
        break;
      }
      default: {
        // If this errors then you're missing a switch case above ↑
        assertUnreachable(inpf);
      }
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
      linkArrows: true,
      linkColor: (link) => slate["100"],
      scaleNodesOnZoom: true,
      showFPSMonitor: true,
      nodeColor: (node) =>
        node.colorScaleValue != null
          ? nodeScale(node.colorScaleValue)
          : nodeScale(0.5),
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
            selectNode(node.id, false);
          }
        },
      },
    };

    g = new CosmoGraph(canvasRef, config);
    // @ts-expect-error
    window.g = g;
    setCosmoGraph(g);
  });

  createEffect(() => {
    // 🔁 reactive deps
    const g = cosmoGraph();
    const gd = graphData();

    // make TS happy
    if (canvasRef == null || g == null) {
      return;
    }

    let edgeId = 0;

    const edges: Edge[] = [];
    const nodes: Node[] = gd.nodes.map((node) => {
      if (node.edges != null) {
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
        ...node,
        id: node.id,
      };
    });

    setNumEdges(edgeId);
    g.setData(nodes, edges);

    // TODO: why do I need a timeout here?
    setTimeout(function () {
      g.fitView();
    }, 200);
  });

  createEffect(() => {
    // 🔁 reactive deps
    const size = windowSize();
    const g = cosmoGraph();

    // make TS happy
    if (g == null) {
      return;
    }

    g.fitView();
  });

  createEffect(() => {
    // 🔁 reactive deps
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
              <label class="mr-2" for="input-format">
                Input format:
              </label>
              <select
                class="grow bg-slate-700 px-1"
                id="input-format"
                name="input-format"
                onChange={(evt) => {
                  // @ts-expect-error -- not sure why `value` is missing
                  const format: Format = evt.target.value;

                  setInputFormat(format);
                  setRawSampleData(rawStartingSampleData[format]);
                }}
              >
                {/* Ensure these stay synced with the `Format` type */}
                <option value="json">json</option>
                <option value="dot">dot</option>
              </select>
            </div>
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
            <pre class="bg-slate-700 rounded text-sm p-2">
              {rawSampleData()}
            </pre>
          </Match>
          <Match when={tab() === "algo"}>
            <div>
              <div class="flex my-1 gap-x-1">
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
                <button
                  class={buttonClass}
                  title="Color the graph using the PageRank algorithm. PageRank is a sophisticated measure of the importance of each node in the graph based on how depended upon the nodes are. Runtime ~ O(n^3)."
                  onClick={async () => {
                    const gd = graphData();
                    const cg = cosmoGraph();

                    if (gd.nodes.length >= 5000) {
                      setMessage(
                        `PageRank only works on graphs with fewer than 5000 nodes. It uses matrix multiplication under-the-hood which has O(n^3) time and n^2 space for a large matrix.`
                      );
                      return;
                    }

                    const start = Date.now();
                    const gdWithPageRank = pageRank(gd);
                    const end = Date.now();

                    const domain = [Infinity, -Infinity];
                    const newGraphData = {
                      nodes: gdWithPageRank.map((node) => {
                        if (node.pageRank < domain[0]) {
                          domain[0] = node.pageRank;
                        }

                        if (node.pageRank > domain[1]) {
                          domain[1] = node.pageRank;
                        }

                        return {
                          id: node.id,
                          edges: node.edges,
                          colorScaleValue: node.pageRank,
                        };
                      }),
                    };

                    nodeScale.domain(domain);

                    // This needs to happen after the domain adjustment above
                    setGraphData(newGraphData);

                    setMessage(
                      `PageRank calculated in ${(end - start).toFixed(0)}ms.`
                    );
                  }}
                >
                  PageRank
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
                  Outgoing edges: {outgoingEdges().length}
                  <List
                    data={outgoingEdges()}
                    maxLength={25}
                    onClick={(n) => selectNode(n.id, true)}
                  />
                </li>
                <li>
                  {/* TODO: this is computationally expensive since
                      we have to iterate through every single edge */}
                  Incoming edges: {incomingEdges().length}
                  <List
                    data={incomingEdges()}
                    maxLength={25}
                    onClick={(n) => selectNode(n.id, true)}
                  />
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
              <List
                maxLength={MAX_LIST_LENGTH}
                data={filteredGraphData()}
                onClick={(node) => {
                  const cg = cosmoGraph();
                  if (cg === undefined) return;

                  setTab("node");
                  selectNode(node.id, true);
                }}
              ></List>
            </div>
          </Match>
        </Switch>
      </div>
      {/* main */}
      <div class="w-5/6 bg-slate-800 relative">
        <canvas class="h-screen" ref={canvasRef} />
        <div class="absolute text-sm text-zinc-200 bottom-0 right-0 py-1 px-3 bg-slate-800 border-t border-l border-slate-600 rounded-tl-md">
          <span class="mr-3">Nodes: {graphData().nodes.length}</span>
          <span>Edges: {numEdges()}</span>
        </div>
      </div>
    </div>
  );
};

export { Graph };
