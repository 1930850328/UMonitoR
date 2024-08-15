import { _Umoni } from "./global";

// 核心就在callback上，以原来的函数作为参数，执行并重写原有函数
export function replaceAop(source: any, name: string, callback: Function) {
  if (source === undefined) return;
  if (name in source) {
    const original = source[name];
    const wrapped = callback(original); //
    if (typeof wrapped === "function") {
      source[name] = wrapped;
    }
  }
}

export function on(
  target: any,
  eventName: string,
  handler: Function,
  opitons = false,
) {
  target.addEventListener(eventName, handler, opitons); // 默认冒泡捕获
}
