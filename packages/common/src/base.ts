import { InitOptions, PluginName, FunctionPluginName } from "@u-moni/types";

// 所有大插件的基础类
export abstract class BasePlugin {
  public name: PluginName;
  constructor(name: PluginName) {
    this.name = name;
  }
  // 挂载参数
  abstract bindOptions(options: InitOptions): void;
  // 核心方法
  abstract core(): void;
  // 处理数据(数据清理，转换格式)
  abstract processingData(data: any): void;
  // 销毁方法
  abstract destroy(): void;
}

// 所有功能插件的基础类
export abstract class BaseFunctionPlugin {
  public name: FunctionPluginName;
  constructor(name: FunctionPluginName) {
    this.name = name;
  }
  // 监听方法
  abstract monitor(): void;
  // 数据转换
  abstract transform(data: any): void;
  // 数据消费
  abstract consumer(data: any): void;
}

/**
 * 接口错误状态
 */
export enum SpanStatus {
  Ok = "ok",
  DeadlineExceeded = "deadline_exceeded",
  Unauthenticated = "unauthenticated",
  PermissionDenied = "permission_denied",
  NotFound = "not_found",
  ResourceExhausted = "resource_exhausted",
  InvalidArgument = "invalid_argument",
  Unimplemented = "unimplemented",
  Unavailable = "unavailable",
  InternalError = "internal_error",
  UnknownError = "unknown_error",
  Cancelled = "cancelled",
  AlreadyExists = "already_exists",
  FailedPrecondition = "failed_precondition",
  Aborted = "aborted",
  OutOfRange = "out_of_range",
  DataLoss = "data_loss",
}
