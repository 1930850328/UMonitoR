import { SpanStatus } from "./base";
import { _Umoni } from "./global";
import { isString } from "./vaildType";

export function throttle(fn: Function, delay: number) {
  let timer: any = null;
  return function (...args: any) {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
        clearInterval(timer);
        timer = null;
      }, delay);
    }
  };
}

export function interceptStr(str: string, interceptLength: number): string {
  if (isString(str)) {
    return (
      str.slice(0, interceptLength) +
      (str.length > interceptLength ? `:截取前${interceptLength}个字符` : "")
    );
  }
  return "";
}

export function getUniqueId() {
  return "u-moni-" + Math.random().toString(36).slice(2);
}

export function fromHttpStatus(httpStatus: any) {
  if (httpStatus < 400) {
    return SpanStatus.Ok;
  }
  if (httpStatus >= 400 && httpStatus < 500) {
    switch (httpStatus) {
      case 401:
        return SpanStatus.Unauthenticated;
      case 403:
        return SpanStatus.PermissionDenied;
      case 404:
        return SpanStatus.NotFound;
      case 409:
        return SpanStatus.AlreadyExists;
      case 413:
        return SpanStatus.FailedPrecondition;
      case 429:
        return SpanStatus.ResourceExhausted;
      default:
        return SpanStatus.InvalidArgument;
    }
  }
  if (httpStatus >= 500 && httpStatus < 600) {
    switch (httpStatus) {
      case 501:
        return SpanStatus.Unimplemented;
      case 503:
        return SpanStatus.Unavailable;
      case 504:
        return SpanStatus.DeadlineExceeded;
      default:
        return SpanStatus.InternalError;
    }
  }
  return SpanStatus.UnknownError;
}

export function use(this: any, FunctionPlugin: any): void {
  const Subscribe = _Umoni.subscribe;
  const plugin = new FunctionPlugin();
  if (!plugin || !plugin.name) return;
  // 大概逻辑就是：发布订阅中心订阅插件的事件，当事件发生时，触发发布订阅中心的notify方法去执行插件的处理数据方法

  // 调用插件的处理数据方法（格式转换 & 消费）
  const process = (...args: any[]) => {
    // 转换格式
    const res = plugin.transform.apply(plugin, args);
    // 消费数据（）
    plugin.consumer(res);
  };

  Subscribe?.sub(plugin.name, process);
  // 调用插件的监听方法
  plugin.monitor.call(this);
}
