import { BaseFunctionPlugin } from "../base";
import { global, _Umoni } from "../global";
import { on } from "../replace";
import { ErrorPluginName, EVENTTYPES } from "@u-moni/types";
import ErrorStackParser from "error-stack-parser";

interface ErrorTarget {
  target?: {
    localName?: string;
  };
  error?: any;
  message?: string;
}

export class errorPlugin extends BaseFunctionPlugin {
  name: ErrorPluginName.ERROR;
  constructor() {
    super(ErrorPluginName.ERROR);
    this.name = ErrorPluginName.ERROR;
  }
  // 监听方法
  monitor(notify: Function): void {
    // 之前在use那注册的时候就绑定了this为对应的大插件实例
    errorMonitor.call(this, notify);
  }
  // 数据转换
  transform(data: any): void {
    console.log("error transform", data);
  }
  // 数据消费
  consumer(data: any): void {}
}

function errorMonitor(this: any, notify: Function) {
  // 监听全局错误
  on(global, "error", function (event: ErrorTarget) {
    console.log("error事件", event);
    handleError(event);
    notify(EVENTTYPES.ERROR, event);
  });
  console.log("error监控启动");
}

export function handleError(ev: ErrorTarget): void {
  const transport = _Umoni.transport;
  const target = ev.target;
  if (!target || (ev.target && !ev.target.localName)) {
    // vue和react捕获的报错使用ev解析，异步错误使用ev.error解析
    const stackFrame = ErrorStackParser.parse(!target ? ev : ev.error)[0];
    const { fileName, columnNumber, lineNumber } = stackFrame;
    const errorData = {
      type: EVENTTYPES.ERROR,
      status: "error",
      time: Date.now(),
      message: ev.message,
      fileName,
      line: lineNumber,
      column: columnNumber,
    };
    //   breadcrumb.push({
    //     type: EVENTTYPES.ERROR,
    //     category: breadcrumb.getCategory(EVENTTYPES.ERROR),
    //     data: errorData,
    //     time: Date.now(),
    //     status: STATUS_CODE.ERROR,
    //   });
    //   const hash: string = getErrorUid(
    //     `${EVENTTYPES.ERROR}-${ev.message}-${fileName}-${columnNumber}`
    //   );
    //   // 开启repeatCodeError第一次报错才上报
    //   if (!options.repeatCodeError || (options.repeatCodeError && !hashMapExist(hash))) {
    return transport.send(errorData);
    //   }
  }

  // 资源加载报错
  if (target?.localName) {
    // 提取资源加载的信息
    //   const data = resourceTransform(target);
    //   breadcrumb.push({
    //     type: EVENTTYPES.RESOURCE,
    //     category: breadcrumb.getCategory(EVENTTYPES.RESOURCE),
    //     status: STATUS_CODE.ERROR,
    //     time: getTimestamp(),
    //     data,
    //   });
    //   return transportData.send({
    //     ...data,
    //     type: EVENTTYPES.RESOURCE,
    //     status: STATUS_CODE.ERROR,
    //   });
  }
}
