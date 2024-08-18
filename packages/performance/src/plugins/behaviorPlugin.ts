import { EVENTTYPES, PerformancePluginName } from "@u-moni/types";
import {
  addSign,
  setFlag,
  on,
  global,
  _Umoni,
  BaseFunctionPlugin,
} from "@u-moni/common";
import { onLCP, onFID, onCLS, onFCP, onTTFB, onINP } from "web-vitals";

export class behaviorPlugin extends BaseFunctionPlugin {
  name: PerformancePluginName.BEHAVIOR;
  constructor() {
    super(PerformancePluginName.BEHAVIOR);
    this.name = PerformancePluginName.BEHAVIOR;
  }
  // 监听方法
  monitor(): void {
    behaviorMonitor.call(this);
  }
  // 数据转换
  transform(data: any): any {
    console.log("behaviorMonitor monitor", data);
    // 添加标志
    data = addSign(data, "performance");
    return data;
  }
  // 数据消费
  consumer(data: any): void {
    const transport = _Umoni.transport;
    transport.send(data);
  }
}

const Subscribe = _Umoni.subscribe;
const notify = Subscribe.notify.bind(Subscribe);

// 监听fcp
function behaviorMonitor(this: any) {
  // 测试发现web-vitals库的onFCP跟自己获取的是一样的
  // onFCP(res=>{
  //     console.log("Res",res)
  //     const data = res
  //     notify(PerformancePluginName.BEHAVIOR, data);
  // })
  getFCP();
  getFP();
  getLCP();
  onCLS((res) => callback(res));
  onFID((res) => callback(res));
  onINP((res) => callback(res));
  onTTFB((res) => callback(res));
}

function callback(res: any): void {
  const { name, rating, value } = res;
  const data = {
    type: name,
    status: "ok",
    time: Date.now(),
    value,
    rating,
  };
  notify(PerformancePluginName.BEHAVIOR, data);
}

function getFCP() {
  const entryHandler = (list: any) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-contentful-paint") {
        observer.disconnect();
      }
      const data = {
        type: "FCP",
        status: "ok",
        time: Date.now(),
        value: entry.startTime,
        rating: entry.startTime < 2500 ? "good" : "bad",
      };
      notify(PerformancePluginName.BEHAVIOR, data);
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  // buffered 属性表示是否观察缓存数据，也就是说观察代码添加时机比事情触发时机晚也没关系。
  observer.observe({ type: "paint", buffered: true });
}

function getFP() {
  const entryHandler = (list: any) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-paint") {
        observer.disconnect();
      }
      const data = {
        type: "FP",
        status: "ok",
        time: Date.now(),
        value: entry.startTime,
        rating: entry.startTime < 2500 ? "good" : "bad",
      };
      notify(PerformancePluginName.BEHAVIOR, data);
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "paint", buffered: true });
}

function getLCP() {
  const entryHandler = (list: any) => {
    for (const entry of list.getEntries()) {
      if (observer) {
        observer.disconnect();
      }
      const data = {
        type: "LCP",
        status: "ok",
        time: Date.now(),
        value: entry.startTime,
        rating: entry.startTime < 2500 ? "good" : "bad",
      };
      notify(PerformancePluginName.BEHAVIOR, data);
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "largest-contentful-paint", buffered: true });
}
