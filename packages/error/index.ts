import { InitOptions } from "@u-moni/types";
import { ErrorPlugin } from "./src/errorPlugin";
import { initPlugin, installPlugin } from "@u-moni/common";

function init(options: InitOptions) {
  initPlugin(options, "error", ErrorPlugin);
}

function install(Vue: any, options: InitOptions) {
  installPlugin(Vue, options, "error", ErrorPlugin);
}

export default {
  init,
  install,
};
