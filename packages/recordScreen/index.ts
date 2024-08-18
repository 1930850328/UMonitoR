import { InitOptions } from "@u-moni/types";
import { recordScreenPlugin } from "./src/recordScreenPlugin";
import { initPlugin, installPlugin, handleReactError } from "@u-moni/common";

function init(options: InitOptions) {
  initPlugin(options, "recordScreen", recordScreenPlugin);
}

function install(Vue: any, options: InitOptions) {
  installPlugin(Vue, options, "recordScreen", recordScreenPlugin);
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
