import { BaseFunctionPlugin } from "../base";
import { global, _Umoni, getFlag } from "../global";
import { on, interceptStr, getUniqueId } from "../../index";
import { ErrorPluginName, EVENTTYPES } from "@u-moni/types";
import ErrorStackParser from "error-stack-parser";

interface ErrorTarget {
  target?: {
    src?: string;
    href?: string;
    localName?: string;
  };
  error?: any;
  message?: string;
}

export class commonErrorPlugin extends BaseFunctionPlugin {
  name: ErrorPluginName.ERROR;
  constructor() {
    super(ErrorPluginName.ERROR);
    this.name = ErrorPluginName.ERROR;
  }
  // 监听方法
  monitor(): void {
    // 之前在use那注册的时候就绑定了this为对应的大插件实例
    errorMonitor.call(this);
  }
  // 数据转换
  transform(data: any): void {
    data.id = getUniqueId();
    data.sdkName = getFlag(`${EVENTTYPES.ERROR}SdkName`);
    data.sdkVersion = getFlag(`${EVENTTYPES.ERROR}SdkVersion`);
    data.sdkType = "error";
    data.status = "error";
    return data;
  }
  // 数据消费
  consumer(data: any): void {
    const transport = _Umoni.transport;
    transport.send(data);
  }
}

function errorMonitor() {
  // 监听全局错误
  on(global, "error", function (event: ErrorTarget) {
    console.log("error事件", event);
    handleError(event);
  });
  console.log("error监控启动");
}

export function handleError(ev: ErrorTarget): void {
  // 如果是通过框架捕获的错误，就不会通过上面的monitor监听到，所以notify下移
  const Subscribe = _Umoni.subscribe;
  const notify = Subscribe.notify.bind(Subscribe);

  const target = ev.target;

  // js错误
  if (!target || (ev.target && !ev.target.localName)) {
    // vue和react捕获的报错使用ev解析，异步错误使用ev.error解析
    const stackFrame = ErrorStackParser.parse(!target ? ev : ev.error)[0];
    const { fileName, columnNumber, lineNumber } = stackFrame;
    const errorData = {
      type: EVENTTYPES.JSERROR, // 什么类型的事件
      time: Date.now(), // 错误发生时间
      message: ev.message,
      fileName,
      line: lineNumber,
      column: columnNumber,
    };

    const hash: string = `${EVENTTYPES.JSERROR}-${ev.message}-${fileName}-${columnNumber}`; // hash后面也可以拼time，这样就能做到每秒上报一次
    // 重复错误不上报
    if (!hashInMap(hash)) {
      notify(EVENTTYPES.ERROR, errorData);
    }
  }

  // 资源加载报错
  if (target?.localName) {
    const errorData = {
      type: EVENTTYPES.RESOURCEERROR,
      time: Date.now(), // 错误发生时间
      message:
        (interceptStr(target.src as string, 100) ||
          interceptStr(target.href as string, 100)) + " 加载失败",
      fileName: target.localName,
    };
    notify(EVENTTYPES.ERROR, errorData);
  }
}

function hashInMap(hash: String) {
  const flag = _Umoni.errorMap.has(hash);
  if (!flag) {
    _Umoni.errorMap.set(hash, true);
  }
  return flag;
}
