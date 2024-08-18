import { SpanStatus } from "./base";
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
