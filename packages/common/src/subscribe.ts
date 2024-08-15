import { _Umoni } from "./global";
import handleException from "./handleException";

class Subscribe {
  dep: Map<any, any> = new Map<any, any>();
  constructor() {}
  sub(event: string, fn: Function) {
    if (!this.dep.has(event)) {
      this.dep.set(event, []);
    }
    this.dep.get(event).push(fn);
  }
  notify(event: string, ...args: any) {
    handleException(
      () => {
        if (this.dep.has(event)) {
          this.dep.get(event).forEach((fn: Function) => {
            fn(...args);
          });
        }
      },
      (e: Error) => {
        console.error(
          `@u-moni: 监听事件的回调函数发生错误！\neventName:${event},Error:${e}`,
        );
      },
    );
  }
}
if (!_Umoni.subscribe) {
  _Umoni.subscribe = new Subscribe();
}
