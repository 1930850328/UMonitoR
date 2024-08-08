interface InitBaseOptions {
  dsn: string; // 上报地址
  appId: string; // 项目id
  disabled?: boolean; // 是否禁用u-moni
}

// core模块主要是监控错误
export interface CoreInitOptions extends InitBaseOptions {
  isMonitorXHR?: boolean; // 是否监控xhr
  isMonitorFetch?: boolean; // 是否监控fetch
  isMonitorError?: boolean; // 是否监控error事件
  isMonitorUnhandledrejection?: boolean; // 是否监控 unhandledrejection
}

/**
 *   performance 模块包含两部分 1. 性能数据 2. 用户数据
 *   这里的performance 我理解为表现而不是性能，所以包含性能和用户两部分
 *  */
export interface PerformanceInitOptions extends InitBaseOptions {
  isMonitorPerformance?: boolean; // 是否获取页面性能指标
  isMonitorClick?: boolean; // 是否监听click事件
  isMonitorHashChange?: boolean; // 是否监听hash模式
  isMonitorHistory?: boolean; // 是否监听history模式
  isMonitorWhiteScreen?: boolean; // 是否检测白屏
  isSkeletonProject?: boolean; // 是否有骨架屏
  whiteScreenElements?: string[]; // 白屏检测的容器列表
}

export interface RecordScreenInitOptions extends InitBaseOptions {
  recordScreentime?: number; // 单次录屏时长，单位为秒
}
