import { BasePlugin, vaildType } from "@u-moni/common";
import { PluginName, ErrorInitOptions } from "@u-moni/types";
import { version } from "../package.json";
import { Subscribe } from "@u-moni/common";
import { xhrPlugin } from "./xhrPlugin";

export class ErrorPlugin extends BasePlugin {
  name: PluginName.ERROR;
  SDK_NAME: string = "@u-moni/error";
  SDK_VERSION: string = version;
  disabled?: boolean = false;
  isMonitorXHR?: boolean = true; // 是否监控xhr
  isMonitorFetch?: boolean = true; // 是否监控fetch
  isMonitorError?: boolean = true; // 是否监控error事件
  Subscribe: Subscribe;
  isMonitorUnhandledrejection?: boolean = true; // 是否监控 unhandledrejection
  constructor(options = {} as ErrorInitOptions) {
    super(PluginName.ERROR);
    this.name = PluginName.ERROR;
    this.Subscribe = new Subscribe();
    this.bindOptions(options);
  }
  bindOptions(options: ErrorInitOptions): void {
    console.log("error bindOptions", options);
    const {
      disabled,
      isMonitorXHR,
      isMonitorFetch,
      isMonitorError,
      isMonitorUnhandledrejection,
    } = options;
    vaildType("disabled", disabled, "boolean") && (this.disabled = disabled);
    vaildType("isMonitorXHR", isMonitorXHR, "boolean") &&
      (this.isMonitorXHR = isMonitorXHR);
    vaildType("isMonitorFetch", isMonitorFetch, "boolean") &&
      (this.isMonitorFetch = isMonitorFetch);
    vaildType("isMonitorError", isMonitorError, "boolean") &&
      (this.isMonitorError = isMonitorError);
    vaildType(
      "isMonitorUnhandledrejection",
      isMonitorUnhandledrejection,
      "boolean",
    ) && (this.isMonitorUnhandledrejection = isMonitorUnhandledrejection);
    this.core();
  }
  core(): void {
    this.isMonitorXHR && this.use(xhrPlugin);
    this.isMonitorFetch && console.log("监控fetch");
    this.isMonitorError && console.log("监控error事件");
    this.isMonitorUnhandledrejection &&
      console.log("监控unhandledrejection事件");
    console.log(`${this.SDK_NAME}${this.SDK_VERSION} install success!!!`);
  }
  use(FunctionPlugin: any): void {
    const plugin = new FunctionPlugin();
    if (!plugin || !plugin.name) return;
    // 大概逻辑就是：发布订阅中心订阅插件的事件，当事件发生时，触发发布订阅中心的notify方法去执行插件的处理数据方法

    // 调用插件的监听方法
    plugin.monitor(this.Subscribe.notify); // todo 不知道不绑定this有没有问题

    // 调用插件的处理数据方法（格式转换 & 消费）
    const process = (...args: any[]) => {
      const res = plugin.transform.apply(plugin, args);
      plugin.consumer(res);
    };

    this.Subscribe?.sub(plugin.name, process);
  }
  processingData(data: any): void {
    console.log("Core processingData", data);
  }
  destroy(): void {
    console.log("Core destroy");
  }
}
