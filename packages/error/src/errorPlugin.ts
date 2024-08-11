import { BasePlugin, vaildType } from "@u-moni/common";
import { PluginName, ErrorInitOptions } from "@u-moni/types";

export class ErrorPlugin extends BasePlugin {
  name: PluginName.ERROR;
  disabled?: boolean = false;
  isMonitorXHR?: boolean = true; // 是否监控xhr
  isMonitorFetch?: boolean = true; // 是否监控fetch
  isMonitorError?: boolean = true; // 是否监控error事件
  isMonitorUnhandledrejection?: boolean = true; // 是否监控 unhandledrejection
  constructor(options = {} as ErrorInitOptions) {
    super(PluginName.ERROR);
    this.name = PluginName.ERROR;
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
    console.log("error core");
  }
  processingData(data: any): void {
    console.log("Core processingData", data);
  }
  destroy(): void {
    console.log("Core destroy");
  }
}
