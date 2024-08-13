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

export interface Umoni {
  [key: string]: any;
}
