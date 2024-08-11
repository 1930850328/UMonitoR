import { InitOptions } from "@u-moni/types";
import { CorePlugin } from "./src/corePlugin";
import { setFlag, hasFlag, global } from "@u-moni/common/";

function init(options: InitOptions) {
  if (!options.appId || !options.dsn) {
    return console.error(
      `u-moni 缺少必须项：${options.appId ? "dsn" : "appId"};可以在Readme文档查看相关配置`,
    );
  }
  if (options.disabled) return;

  const instance = new CorePlugin();
  instance.bindOptions(options);
}

function install(Vue: any, options: InitOptions) {
  console.log("Core install!!!");
  if (hasFlag("vue")) return;
  setFlag("vue", true);
  console.log(global, global.__Umoni__);
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
  init(options);
}

export default {
  init,
  install,
};
