import { BasePlugin, vaildType } from "@u-moni/common/";
import { PluginName, PerformanceInitOptions } from "@u-moni/types";
import { version } from "../package.json";
export class PerformancePlugin extends BasePlugin {
  name: PluginName.PERFORMANCE;
  SDK_NAME: string = "@u-moni/performance";
  SDK_VERSION: string = version;
  disabled?: boolean = false;
  isMonitorPerformance?: boolean; // 是否获取页面性能指标
  isMonitorClick?: boolean; // 是否监听click事件
  isMonitorHashChange?: boolean; // 是否监听hash模式
  isMonitorHistory?: boolean; // 是否监听history模式
  isMonitorWhiteScreen?: boolean; // 是否检测白屏
  isSkeletonProject?: boolean; // 是否有骨架屏
  whiteScreenElements?: string[]; // 白屏检测的容器列表
  constructor(option: PerformanceInitOptions) {
    super(PluginName.PERFORMANCE);
    this.name = PluginName.PERFORMANCE;
    this.bindOptions(option);
  }
  bindOptions(options: PerformanceInitOptions): void {
    console.log("Performance bindOptions", options);
    const {
      disabled,
      isMonitorPerformance,
      isMonitorClick,
      isMonitorHashChange,
      isMonitorHistory,
      isMonitorWhiteScreen,
      isSkeletonProject,
      whiteScreenElements,
    } = options;
    vaildType("disabled", disabled, "boolean") && (this.disabled = disabled);
    vaildType("isMonitorPerformance", isMonitorPerformance, "boolean") &&
      (this.isMonitorPerformance = isMonitorPerformance);
    vaildType("isMonitorClick", isMonitorClick, "boolean") &&
      (this.isMonitorClick = isMonitorClick);
    vaildType("isMonitorHashChange", isMonitorHashChange, "boolean") &&
      (this.isMonitorHashChange = isMonitorHashChange);
    vaildType("isMonitorHistory", isMonitorHistory, "boolean") &&
      (this.isMonitorHistory = isMonitorHistory);
    vaildType("isMonitorWhiteScreen", isMonitorWhiteScreen, "boolean") &&
      (this.isMonitorWhiteScreen = isMonitorWhiteScreen);
    vaildType("isSkeletonProject", isSkeletonProject, "boolean") &&
      (this.isSkeletonProject = isSkeletonProject);
    vaildType("whiteScreenElements", whiteScreenElements, "array") &&
      (this.whiteScreenElements = whiteScreenElements);
    this.core();
  }
  core(): void {
    console.log(`${this.SDK_NAME}${this.SDK_VERSION} install success!!!`);
    if (this.disabled) return;
    // 监听click事件
  }
  processingData(data: any): void {
    console.log("Performance processingData", data);
  }
  destroy(): void {
    console.log("Performance destroy");
  }
}
