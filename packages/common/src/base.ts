import { InitOptions, PluginName } from "@u-moni/types";

// 所有插件的基础类
export abstract class BasePlugin {
  public name: PluginName;
  constructor(name: PluginName) {
    this.name = name;
  }
  // 挂载参数
  abstract bindOptions(options: InitOptions): void;
  // 核心方法
  abstract core(): void;
  // 处理数据(数据清理，转换格式)
  abstract processingData(data: any): void;
  // 销毁方法
  abstract destroy(): void;
}
