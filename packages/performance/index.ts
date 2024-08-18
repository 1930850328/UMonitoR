import { InitOptions } from "@u-moni/types";
import { PerformancePlugin } from "./src/performancePlugin";
import { initPlugin, installPlugin, handleReactError } from "@u-moni/common";

function init(options: InitOptions) {
  initPlugin(options, "performance", PerformancePlugin);
}

function install(Vue: any, options: InitOptions) {
  installPlugin(Vue, options, "performance", PerformancePlugin);
}

// react项目在ErrorBoundary中上报错误
function errorBoundary(err: Error): void {
  handleReactError(err);
}

export default {
  init,
  install,
  errorBoundary,
};
