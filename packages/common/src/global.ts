import { Window, Umoni } from "@u-moni/types";
/*
todo：在对window设置类型遇到如下问题：
类型 "Window & typeof globalThis" 到类型 "Window" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。
  类型 "Window & typeof globalThis" 中缺少属性 "__Umoni__"，但类型 "Window" 中需要该属性。ts(2352)
*/
function getWindow() {
  return window as unknown as Window;
}
export const global = getWindow();
global.__Umoni__ = global.__Umoni__ || ({} as Umoni);
export const _Umoni = global.__Umoni__ || {};

export function hasFlag(type: string) {
  return _Umoni[type] ? true : false;
}

export function setFlag(type: string, value: any) {
  _Umoni[type] = value;
}
