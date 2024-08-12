import { InitOptions } from "@u-moni/types";
import { recordScreenPlugin } from "./src/recordScreenPlugin";
import { initPlugin, installPlugin } from "@u-moni/common";

function init(options: InitOptions) {
  initPlugin(options, "recordScreen", recordScreenPlugin);
}

function install(Vue: any, options: InitOptions) {
  installPlugin(Vue, options, "recordScreen", recordScreenPlugin);
}

export default {
  init,
  install,
};
