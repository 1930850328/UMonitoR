import { InitOptions } from "@u-moni/types";
import { setFlag, hasFlag } from "./global";

export function initPlugin(options: InitOptions, type: string, plugin: any) {
  if (!options.appId || !options.dsn) {
    return console.error(
      `@u-moni/${type} 缺少必须项：${options.appId ? "dsn" : "appId"};可以在Readme文档查看相关配置`,
    );
  }
  if (options.disabled) return;

  const instance = new plugin();
  instance.bindOptions(options);
}

export function installPlugin(
  Vue: any,
  options: InitOptions,
  type: string,
  plugin: any,
) {
  if (hasFlag("vue")) return;
  setFlag("vue", true);
  const handler = Vue.config.errorHandler;
  // vue项目在Vue.config.errorHandler中上报错误
  Vue.config.errorHandler = function (
    err: Error,
    instance: any,
    info: string,
  ): void {
    console.log(err);
    //   HandleEvents.handleError(err);
    if (handler) handler.apply(null, [err, instance, info]);
  };
  initPlugin(options, type, plugin);
}
