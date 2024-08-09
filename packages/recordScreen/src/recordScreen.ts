import { BasePlugin } from "../../common/src/base";
import { PluginName } from "@u-moni/types";

export class recordScreenPlugin extends BasePlugin {
  name: PluginName.RECORDSCREEN;
  constructor() {
    super(PluginName.RECORDSCREEN);
    this.name = PluginName.RECORDSCREEN;
  }
  bindOptions(options: any): void {
    console.log("recordScreen bindOptions", options);
  }
  core(): void {
    console.log("recordScreen core");
  }
  processingData(data: any): void {
    console.log("recordScreen processingData", data);
  }
  destroy(): void {
    console.log("recordScreen destroy");
  }
}
