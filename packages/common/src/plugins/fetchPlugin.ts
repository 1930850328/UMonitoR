import { BaseFunctionPlugin } from "../base";
import { global, _Umoni } from "../global";
import { replaceAop, on } from "../replace";
import { ErrorPluginName, EVENTTYPES, HTTPTYPE } from "@u-moni/types";
import { fromHttpStatus } from "../utils";
import { addSign } from "./commonFn";

export class fetchPlugin extends BaseFunctionPlugin {
  name: ErrorPluginName.FETCH;
  constructor() {
    super(ErrorPluginName.FETCH);
    this.name = ErrorPluginName.FETCH;
  }
  // 监听方法
  monitor(): void {
    // 之前在use那注册的时候就绑定了this为对应的大插件实例
    fetchMonitor.call(this);
  }
  // 数据转换
  transform(data: any): any {
    console.log("fetchPlugin monitor", data);
    // 添加标志
    let res = transformData(data);
    res = addSign(res, "error");
    return res;
  }
  // 数据消费
  consumer(data: any): void {
    const transport = _Umoni.transport;
    transport.send(data);
  }
}

// 重写fetch
function fetchMonitor(this: any) {
  if (!("fetch" in global)) {
    return;
  }
  const Subscribe = _Umoni.subscribe;
  const notify = Subscribe.notify.bind(Subscribe);

  // aop 面向切面编程，增强（重写）原有函数
  replaceAop(global, "fetch", (originalFetch: any) => {
    return function (url: string, config: Partial<Request> = {}): void {
      const sTime = Date.now();
      const method = (config && config.method) || "GET";
      let fetchData = {
        type: "fetch",
        method,
        requestData: config && config.body,
        url,
        response: "",
      };
      // 获取配置的headers
      const headers = new Headers(config.headers || {});
      Object.assign(headers, {
        setRequestHeader: headers.set,
      });
      config = Object.assign({}, config, headers);
      return originalFetch.apply(global, [url, config]).then(
        (res: any) => {
          const tempRes = res.clone();
          const eTime = Date.now();
          fetchData = Object.assign({}, fetchData, {
            elapsedTime: eTime - sTime,
            Status: tempRes.status,
            time: sTime,
          });
          tempRes.text().then((data: any) => {
            fetchData.response = data;
            notify(EVENTTYPES.FETCH, fetchData);
          });
          return res;
        },
        // 接口报错
        (err: any) => {
          const eTime = Date.now();
          fetchData = Object.assign({}, fetchData, {
            elapsedTime: eTime - sTime,
            status: 0,
            time: sTime,
          });
          notify(EVENTTYPES.FETCH, fetchData);
          throw err;
        },
      );
    };
  });
  console.log("fetch监控启动");
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
    ...data,
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
