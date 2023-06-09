import { render } from "solid-js/web";
import { Graph } from "./components/graph";

console.log('Hi!');

const app = document.getElementById("app");

if (app) {
  render(() => <Graph />, app);
}
