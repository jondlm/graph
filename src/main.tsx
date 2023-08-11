import { render } from "solid-js/web";
import { Graph } from "./components/graph";

import "./index.css";

const app = document.getElementById("app");

if (app) {
  render(() => <Graph />, app);
}
