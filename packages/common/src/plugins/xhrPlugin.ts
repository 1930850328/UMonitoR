import { BaseFunctionPlugin } from "../base";
import { global } from "../global";
import { replaceAop, on } from "../replace";
import { ErrorPluginName, EVENTTYPES, HTTPTYPE } from "@u-moni/types";

export class xhrPlugin extends BaseFunctionPlugin {
  name: ErrorPluginName.XHR;
  constructor() {
    super(ErrorPluginName.XHR);
    this.name = ErrorPluginName.XHR;
  }
  // 监听方法
  monitor(notify: Function): void {
    // 之前在use那注册的时候就绑定了this为对应的大插件实例
    xhrMonitor.call(this, notify);
  }
  // 数据转换
  transform(data: any): void {}
  // 数据消费
  consumer(data: any): void {}
}

function xhrMonitor(this: any, notify: Function) {
  if (!("XMLHttpRequest" in global)) {
    return;
  }
  const originalXhrProto = XMLHttpRequest.prototype;
  // aop 面向切面编程，增强（重写）原有函数
  replaceAop(
    originalXhrProto,
    "open",
    (originalOpen: (...args: any) => void) => {
      return function (this: any, ...args: any[]): void {
        console.log("xhr open", this, args);
        this.umoni_xhr = {
          method: args[0] ? args[0].toUpperCase() : args[0],
          url: args[1],
          sTime: Date.now(),
          type: HTTPTYPE.XHR,
        };
        originalOpen.apply(this, args);
      };
    },
  );
  replaceAop(
    originalXhrProto,
    "send",
    (originalSend: (...args: any) => void) => {
      return function (this: any, ...args: any[]): void {
        //   const { method, url } = this.umoni_xhr;
        // 监听loadend事件，接口成功或失败都会执行
        on(this, "loadend", function (this: any) {
          const { responseType, response, status } = this;
          this.umoni_xhr.requestData = args[0];
          const eTime = Date.now();
          // 设置该接口的time，用户用户行为按时间排序
          this.umoni_xhr.time = this.umoni_xhr.sTime;
          this.umoni_xhr.Status = status;
          if (["", "json", "text"].indexOf(responseType) !== -1) {
            this.umoni_xhr.response = response && JSON.parse(response);
          }
          // 接口的执行时长
          this.umoni_xhr.elapsedTime = eTime - this.umoni_xhr.sTime;
          // 执行之前注册的xhr回调函数
          notify(EVENTTYPES.XHR, this.umoni_xhr);
        });
        // 执行原有的send方法
        originalSend.apply(this, args);
      };
    },
  );
  console.log("xhr监控启动");
}
