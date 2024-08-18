export enum PluginName {
  ERROR = "error",
  PERFORMANCE = "performance",
  RECORDSCREEN = "recordScreen",
}

export enum ErrorPluginName {
  XHR = "xhr",
  FETCH = "fetch",
  ERROR = "error",
  UNHANDLEDREJECTION = "unhandledrejection",
}

export enum PerformancePluginName {
  BEHAVIOR = "behavior",
}

export type FunctionPluginName = ErrorPluginName | PerformancePluginName;

export interface Window {
  __Umoni__: {
    [key: string]: any;
  };
}

export interface UmoniType {
  option: {
    [key: string]: any;
  };
  [key: string]: any;
}

export enum EVENTTYPES {
  XHR = "xhr",
  FETCH = "fetch",
  CLICK = "click",
  HISTORY = "history",
  ERROR = "error",
  JSERROR = "jsError",
  RESOURCEERROR = "resourceError",
  HASHCHANGE = "hashchange",
  UNHANDLEDREJECTION = "unhandledrejection",
  DOM = "dom",
  VUE = "vue",
  REACT = "react",
  CUSTOM = "custom",
  BEHAVIOR = "behavior",
  PERFORMANCE = "performance",
  RECORDSCREEN = "recordScreen",
  WHITESCREEN = "whiteScreen",
}

export enum HTTPTYPE {
  XHR = "xhr",
  FETCH = "fetch",
}
