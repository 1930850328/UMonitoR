export enum PluginName {
  CORE = "core",
  PERFORMANCE = "performance",
  RECORDSCREEN = "recordScreen",
}

export interface Window {
  __Umoni__: {
    [key: string]: any;
  };
}

export interface Umoni {
  [key: string]: any;
}
