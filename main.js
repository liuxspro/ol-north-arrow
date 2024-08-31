import "./style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { NorthArrow } from "./src/index";
import { ScaleLine } from "ol/control";
import svgs from "./src/northsvg.js";
import XYZ from "ol/source/XYZ.js";
const GoogleMap = new XYZ({
  url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
});

const Google = new TileLayer({
  title: "Google Map",
  type: "base",
  visible: false,
  source: GoogleMap,
});

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: GoogleMap,
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
  controls: [new ScaleLine({ units: "metric" }), new NorthArrow({ style: "D3", width: "128px" })],
});

function create_svg_element(name, data) {
  const container = document.createElement("div");
  container.className = "north";
  const north_box = document.createElement("div");
  const desp = document.createElement("div");
  north_box.style.width = "64px";
  north_box.style.height = "64px";
  north_box.innerHTML = data;
  desp.innerHTML = name;
  container.append(north_box);
  container.appendChild(desp);
  return container;
}

const c = document.querySelector("#styles");

Object.keys(svgs).forEach((key) => {
  const item = create_svg_element(key, svgs[key]);
  c.appendChild(item);
});
