import { InitOptions } from "@u-moni/types";
import { PerformancePlugin } from "./src/performancePlugin";
import { initPlugin, installPlugin } from "@u-moni/common";

function init(options: InitOptions) {
  initPlugin(options, "performance", PerformancePlugin);
}

function install(Vue: any, options: InitOptions) {
  installPlugin(Vue, options, "performance", PerformancePlugin);
}

export default {
  init,
  install,
};
