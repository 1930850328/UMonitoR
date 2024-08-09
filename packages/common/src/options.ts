import { InitOptions } from "@u-moni/types";

// 挂载各模块的配置
export default function handlingOptions(options: InitOptions, type: string) {
  console.log("handlingOptions");
  switch (type) {
    case "core":
      console.log("core");
      break;
    case "performance":
      console.log("performance");
      break;
    case "recordScreen":
      console.log("recordScreen");
      break;
  }
}
