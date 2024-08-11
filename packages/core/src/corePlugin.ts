import { BasePlugin } from "@u-moni/common";
import { PluginName, CoreInitOptions } from "@u-moni/types";

export class CorePlugin extends BasePlugin {
  name: PluginName.CORE;
  constructor(options = {} as CoreInitOptions) {
    super(PluginName.CORE);
    this.name = PluginName.CORE;
    this.bindOptions(options);
  }
  bindOptions(options: any): void {
    console.log("Core bindOptions", options);

    this.core();
  }
  core(): void {
    console.log("Core core");
  }
  processingData(data: any): void {
    console.log("Core processingData", data);
  }
  destroy(): void {
    console.log("Core destroy");
  }
}
