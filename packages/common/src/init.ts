import { InitOptions } from "@u-moni/types";
import handlingOptions from "./options";

export function init(options: InitOptions, type: string) {
  console.log("init");
  if (!options.appId || !options.dsn) {
    return console.error(
      `u-moni 缺少必须项：${options.appId ? "dsn" : "appId"};可以在Readme文档查看相关配置`,
    );
  }
  if (options.disabled) return;
  handlingOptions(options, type);
  // 调用各模块的core方法
  switch (type) {
    case "core":
    case "performance":
    case "recordScreen":
  }
}
