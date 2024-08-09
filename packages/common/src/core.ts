import { BasePlugin } from "./base";
import { PluginName } from "@u-moni/types";

export class CorePlugin extends BasePlugin {
  name: PluginName.CORE;
  constructor() {
    super(PluginName.CORE);
    this.name = PluginName.CORE;
  }
  bindOptions(options: any): void {
    console.log("Core bindOptions", options);
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
