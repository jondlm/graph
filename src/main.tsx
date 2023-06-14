import { render } from "solid-js/web";
import { Graph } from "./components/graph";

const app = document.getElementById("app");

if (app) {
  render(() => <Graph />, app);
}
