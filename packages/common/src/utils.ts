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
