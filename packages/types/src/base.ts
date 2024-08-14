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

export type FunctionPluginName = ErrorPluginName;

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
  HASHCHANGE = "hashchange",
  UNHANDLEDREJECTION = "unhandledrejection",
  RESOURCE = "resource",
  DOM = "dom",
  VUE = "vue",
  REACT = "react",
  CUSTOM = "custom",
  PERFORMANCE = "performance",
  RECORDSCREEN = "recordScreen",
  WHITESCREEN = "whiteScreen",
}
