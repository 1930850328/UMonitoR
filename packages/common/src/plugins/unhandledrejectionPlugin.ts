import { BaseFunctionPlugin } from "../base";
import { global, _Umoni } from "../global";
import { on } from "../../index";
import { ErrorPluginName, EVENTTYPES } from "@u-moni/types";
import ErrorStackParser from "error-stack-parser";
import { addSign } from "./commonFn";

export class unhandledrejectionPlugin extends BaseFunctionPlugin {
  name: ErrorPluginName.UNHANDLEDREJECTION;
  constructor() {
    super(ErrorPluginName.UNHANDLEDREJECTION);
    this.name = ErrorPluginName.UNHANDLEDREJECTION;
  }
  // 监听方法
  monitor(): void {
    // 之前在use那注册的时候就绑定了this为对应的大插件实例
    unhandlerErrorMonitor.call(this);
  }
  // 数据转换
  transform(data: any): void {
    addSign(data, "error");
    data.status = "error";
    return data;
  }
  // 数据消费
  consumer(data: any): void {
    const transport = _Umoni.transport;
    transport.send(data);
  }
}

function unhandlerErrorMonitor() {
  // 监听全局错误
  on(global, "unhandledrejection", function (event: PromiseRejectionEvent) {
    console.log("unhandledrejection事件", event);
    handledrejectionError(event);
  });
  console.log("unhandledrejection监控启动");
}

export function handledrejectionError(ev: PromiseRejectionEvent): void {
  // 如果是通过框架捕获的错误，就不会通过上面的monitor监听到，所以notify下移
  const Subscribe = _Umoni.subscribe;
  const notify = Subscribe.notify.bind(Subscribe);

  const stackFrame = ErrorStackParser.parse(ev.reason)[0];
  const { fileName, columnNumber, lineNumber } = stackFrame;
  const message = ev.reason.message || ev.reason.stack;
  const data = {
    type: EVENTTYPES.UNHANDLEDREJECTION,
    status: "error",
    time: Date.now(),
    message,
    fileName,
    line: lineNumber,
    column: columnNumber,
  };
  const hash: string = `${EVENTTYPES.UNHANDLEDREJECTION}-${message}-${fileName}-${columnNumber}`;

  if (!hashInMap(hash)) {
    notify(EVENTTYPES.UNHANDLEDREJECTION, data);
  }
}

function hashInMap(hash: String) {
  const flag = _Umoni.errorMap.has(hash);
  if (!flag) {
    _Umoni.errorMap.set(hash, true);
  }
  return flag;
}
