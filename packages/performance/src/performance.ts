import { BasePlugin } from "@u-moni/common/";
import { PluginName } from "@u-moni/types";

export class PerformancePlugin extends BasePlugin {
  name: PluginName.PERFORMANCE;
  constructor() {
    super(PluginName.PERFORMANCE);
    this.name = PluginName.PERFORMANCE;
  }
  bindOptions(options: any): void {
    console.log("Performance bindOptions", options);
  }
  core(): void {
    console.log("Performance core");
  }
  processingData(data: any): void {
    console.log("Performance processingData", data);
  }
  destroy(): void {
    console.log("Performance destroy");
  }
}
