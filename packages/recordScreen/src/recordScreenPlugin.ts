import { BasePlugin } from "@u-moni/common/";
import { PluginName, RecordScreenInitOptions } from "@u-moni/types";
import { version } from "../package.json";
export class recordScreenPlugin extends BasePlugin {
  name: PluginName.RECORDSCREEN;
  SDK_NAME: string = "@u-moni/recordScreen";
  SDK_VERSION: string = version;
  constructor(options: RecordScreenInitOptions) {
    super(PluginName.RECORDSCREEN);
    this.name = PluginName.RECORDSCREEN;
    this.bindOptions(options);
  }
  bindOptions(options: RecordScreenInitOptions): void {
    console.log("recordScreen bindOptions", options);
  }
  core(): void {
    console.log(`${this.SDK_NAME}${this.SDK_VERSION} install success!!!`);
  }
  processingData(data: any): void {
    console.log("recordScreen processingData", data);
  }
  destroy(): void {
    console.log("recordScreen destroy");
  }
}
