import Control from "ol/control/Control.js";
import svgs from "./northsvg.js";

class NorthArrow extends Control {
  constructor(opt_options) {
    const options = opt_options || {};
    const width = options["width"] || "64px";
    const north_style = options["style"] || "1";
    const northArrowSvg = svgs[north_style];
    // 创建元素
    const element = document.createElement("div");
    element.style.width = width;
    element.style.position = "absolute";
    element.style.right = "15px"; // 调整 X 坐标，以便控件位于右上角
    element.style.top = "15px"; // 调整 Y 坐标，以便控件位于右上角
    element.style.cursor = "pointer";
    element.innerHTML = northArrowSvg;
    super({
      element: element,
      target: opt_options.target,
    });

    element.addEventListener("click", this.reset_rotation.bind(this), false);
  }
  rotate_map() {
    // this 指 当前的 bind 的 NorthArrow 对象
    const rotate_value = this.getMap().getView().getRotation();
    this.element.style.transform = `rotate(${rotate_value}rad)`;
  }
  reset_rotation() {
    this.getMap().getView().setRotation(0);
  }

  // 重写setMap函数
  setMap(map) {
    super.setMap(map); // 通过 super.setMap(map) 调用了父类 ol/control/Control 中的 setMap 方法，以确保执行了父类的地图关联行为。
    if (map) {
      map.getView().on("change:rotation", this.rotate_map.bind(this));
    }
  }
}

export { NorthArrow };
