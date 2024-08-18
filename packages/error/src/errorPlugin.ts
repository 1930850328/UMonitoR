import {
  BasePlugin,
  vaildType,
  _Umoni,
  setOptionFlag,
  setFlag,
  xhrPlugin,
  fetchPlugin,
  unhandledrejectionPlugin,
  commonErrorPlugin,
  use,
} from "@u-moni/common";
import { PluginName, ErrorInitOptions } from "@u-moni/types";
import { version } from "../package.json";

export class ErrorPlugin extends BasePlugin {
  name: PluginName.ERROR;
  SDK_NAME: string = "@u-moni/error";
  SDK_VERSION: string = version;
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
      dsn,
      appId,
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

    setFlag("errorSdkName", this.SDK_NAME);
    setFlag("errorSdkVersion", this.SDK_VERSION);
    // 设置全局参数
    setOptionFlag("errorDsn", dsn);
    setOptionFlag("errorAppId", appId);
    setOptionFlag("errorDisabled", this.disabled);
    setOptionFlag("isXhrPlugin", this.isMonitorXHR); // 启动xhr监听
    setOptionFlag("isFetchPlugin", this.isMonitorFetch); // 启动fetch监听
    setOptionFlag("isErrorPlugin", this.isMonitorError); // 启动error监听
    setOptionFlag(
      "isUnhandledrejectionPlugin",
      this.isMonitorUnhandledrejection,
    ); // 启动unhandledrejection监听

    this.core();
  }
  core(): void {
    this.isMonitorXHR && use(xhrPlugin);
    this.isMonitorFetch && use(fetchPlugin);
    this.isMonitorError && use(commonErrorPlugin);
    this.isMonitorUnhandledrejection && use(unhandledrejectionPlugin);
    console.log(`${this.SDK_NAME}${this.SDK_VERSION} install success!!!`);
  }
  processingData(data: any): void {
    console.log("Core processingData", data);
  }
  destroy(): void {
    console.log("Core destroy");
  }
}
