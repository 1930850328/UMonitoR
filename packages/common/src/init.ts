import { InitOptions } from "@u-moni/types";
import { setFlag, hasFlag } from "./global";
import { handleError } from "./plugins/errorPlugin";

export function initPlugin(options: InitOptions, type: string, plugin: any) {
  if (!options.appId || !options.dsn) {
    return console.error(
      `@u-moni/${type} 缺少必须项：${options.appId ? "dsn" : "appId"};可以在Readme文档查看相关配置`,
    );
  }
  if (options.disabled) return;

  // 启动插件
  new plugin(options);
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
    console.log(err, instance, info);
    handleError(err);
    if (handler) handler.apply(null, [err, instance, info]);
  };
  initPlugin(options, type, plugin);
}
