import { InitOptions } from "@u-moni/types";
import { ErrorPlugin } from "./src/errorPlugin";
import { initPlugin, installPlugin, handleReactError } from "@u-moni/common";

function init(options: InitOptions) {
  initPlugin(options, "error", ErrorPlugin);
}

function install(Vue: any, options: InitOptions) {
  installPlugin(Vue, options, "error", ErrorPlugin);
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
