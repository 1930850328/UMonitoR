import { BaseFunctionPlugin } from "@u-moni/common";
import { ErrorPluginName } from "@u-moni/types";

export class xhrPlugin extends BaseFunctionPlugin {
  name: ErrorPluginName.XHR;
  constructor() {
    super(ErrorPluginName.XHR);
    this.name = ErrorPluginName.XHR;
  }
  // 监听方法
  monitor(notify: Function): void {
    console.log("xhrPlugin monitor", notify);
  }
  // 数据转换
  transform(data: any): void {}
  // 数据消费
  consumer(data: any): void {}
}
