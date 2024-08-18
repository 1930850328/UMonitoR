import { BaseFunctionPlugin } from "../base";
import { global, _Umoni } from "../global";
import { replaceAop, on } from "../replace";
import { ErrorPluginName, EVENTTYPES, HTTPTYPE } from "@u-moni/types";
import { fromHttpStatus } from "../utils";
import { addSign } from "./commonFn";

export class xhrPlugin extends BaseFunctionPlugin {
  name: ErrorPluginName.XHR;
  constructor() {
    super(ErrorPluginName.XHR);
    this.name = ErrorPluginName.XHR;
  }
  // 监听方法
  monitor(): void {
    // 之前在use那注册的时候就绑定了this为对应的大插件实例
    xhrMonitor.call(this);
  }
  // 数据转换
  transform(data: any): any {
    console.log("xhrPlugin monitor", data);
    // 添加标志
    const res = transformData(data);
    addSign(res, "error");
    return res;
  }
  // 数据消费
  consumer(data: any): void {
    const transport = _Umoni.transport;
    transport.send(data);
  }
}

// 重写xhr的open和send方法去监听xhr的请求
function xhrMonitor(this: any) {
  if (!("XMLHttpRequest" in global)) {
    return;
  }
  const Subscribe = _Umoni.subscribe;
  const notify = Subscribe.notify.bind(Subscribe);
  const originalXhrProto = XMLHttpRequest.prototype;

  // aop 面向切面编程，增强（重写）原有函数
  replaceAop(
    originalXhrProto,
    "open",
    (originalOpen: (...args: any) => void) => {
      return function (this: any, ...args: any[]): void {
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

function transformData(data: any) {
  let message: any = "";
  const {
    elapsedTime,
    time,
    method = "",
    type,
    Status = 200,
    response,
    requestData,
  } = data;
  let status;
  if (Status === 0) {
    status = "error";
    message =
      elapsedTime <= 30 * 1000
        ? `请求失败，Status值为:${Status}`
        : "请求失败，接口超时";
  } else if ((Status as number) < 400) {
    status = "ok";
  } else {
    status = "error";
    message = `请求失败，Status值为:${Status}，${fromHttpStatus(Status as number)}`;
  }
  message = `${data.url}; ${message}`;
  return {
    url: data.url,
    time,
    status,
    elapsedTime,
    message,
    requestData: {
      httpType: type as string,
      method,
      data: requestData || "",
    },
    response: {
      Status,
      data: status == "error" ? response : null,
    },
  };
}
