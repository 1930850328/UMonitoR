# UMonitoR

<div align="center">
<p style="font-weight:800"> UMonitoR  (UMR)</p>
<p> A Lightweight SDK For Monitor Web</p>
<p>一款轻量级的前端监控SDK</p>

[![npm version](https://img.shields.io/npm/v/@u-moni/error.svg?style=flat-square)](https://www.npmjs.com/package/@u-moni/error)
[![license](https://img.shields.io/github/license/clouDr-f2e/mitojs)](https://www.npmjs.com/package/@u-moni/error)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub last commit](https://img.shields.io/github/last-commit/1930850328/UMonitoR.svg?style=flat-square)](https://github.com/1930850328/UMonitoR)

</div>

遵循 `内核 + 插件 + 发布订阅模式` 的设计思路，立志实现`高性能`、`高可用`、`可拓展`的SDK

## 特点

- 🔨 使用 `monorepo + pnpm + ts` 进行开发,做到`高内聚 低耦合`,可按需引入所需功能
- 🔨 支持收集项目性能数据（`FCP` | `FMP` | `LCP` | `TTI` | `TLS` ...）
- 🔨 支持收集错误数据, 例如 `JS报错`、`异步任务错误`、`资源加载错误`
- 🔨 支持收集用户数据: PV、路由跳转（hash路由、history路由）、用户行为栈...
- 🔨 支持监控xhr、fetch请求
- 🔨 支持多种上报方式，并且支持多种上报策略，不影响业务逻辑
- 🔨 支持多种错误还原方式，瞬时定位项目错误
- 🔨 丰富的hooks与配置项支持可高定制化
- 🔨 支持原生Web项目和Web框架Vue3、Vue2.6、React项目
- 👌 持续迭代更新

## 核心SDK介绍

### @u-moni/error

一款错误收集sdk, 收集并上报`JS报错`、`异步任务错误`、`资源加载错误`

### @u-moni/performance

performance, 译为性能、表现, 在这里则是希望你理解为表现，因为它不仅仅收集项目的性能数据（FCP、LCP、白屏检测...）,它还兼顾收集用户数据，如PV，用户行为栈等等数据。

### @u-moni/recordscreen

当我们上报错误，得知了错误发生位置但仍是不明白错误发生的原因，就可以启动本sdk直接获取错误发生前的录屏数据，告别分析错误的难题

## Vue2 安装说明

```javascript
import error from '@u-moni/error';
import performance from '@u-moni/performance';
import recordscreen from '@u-moni/recordscreen';

// 注册错误检测插件
Vue.use(error, {
  dsn: 'http://aaa.com/', // 上报的地址
  appId: 'project1', // 项目唯一的id
  isMonitorXHR: true, // 是否监控xhr
  isMonitorFetch: true, // 是否监控fetch
  isMonitorError: true, // 是否监控error事件
  isMonitorUnhandledrejection:false,// 是否监控 unhandledrejection
});

// 注册性能检测插件
Vue.use(performance, {...});
// 注册页面录屏插件
Vue.use(recordscreen, { ... });
```

## Vue3 安装说明

```javascript
import error from '@u-moni/error';
import performance from '@u-moni/performance';
import recordscreen from '@u-moni/recordscreen';

const app = createApp(App);
app.use(error, {
  dsn: 'http://aaa.com/', // 上报的地址
  appId: 'project1', // 项目唯一的id
  isMonitorXHR: true, // 是否监控xhr
  isMonitorFetch: true, // 是否监控fetch
  isMonitorError: true, // 是否监控error事件
  isMonitorUnhandledrejection:false,// 是否监控 unhandledrejection
});

app.use(performancen, { ... });
app.use(recordscreen, { ... });
```

## 常规配置项

### 通用配置项

> 指所有sdk都可以传的通用配置项，请注意两点
>
> 1. 所有sdk都必须传dsn（上报地址）和appId（唯一标识）。
> 2. 每个sdk间通用配置项也是独立的，即Error和Performance的dsn和appId可以不同，请根据实际情况选择，若是同一个项目最好还是使用相同的appId。

|    Name    | Type      | Default | Description                                    |
| :--------: | --------- | ------- | ---------------------------------------------- | 
|   `dsn`    | `string`  | `""`    | (必传项) 上报接口的地址，post 方法             |
|  `appId`   | `string`  | `""`    | (必传项) 每个项目对应一个 appId，唯一标识      |     |
| `disabled` | `boolean` | `false` | 默认是开启 SDK，为 true 时，会将 对应插件 禁用 |

### @u-moni/error 配置项

|             Name              | Type      | Default | Description                          |
| :---------------------------: | --------- | ------- | ------------------------------------ |
|        `isMonitorXHR`         | `boolean` | `true`  | 是否监控xhr 默认开启                 |
|       `isMonitorFetch`        | `boolean` | `true`  | 是否监控fetch 默认开启               |
|       `isMonitorError`        | `boolean` | `true`  | 是否监控error事件 默认开启           |
| `isMonitorUnhandledrejection` | `boolean` | `true`  | 是否监控 unhandledrejection 默认开启 |

### @u-moni/performance 配置项

|          Name          | Type       | Default                   | Description          |
| :--------------------: | ---------- | ------------------------- | -------------------- |
| `isMonitorPerformance` | `boolean`  | `true`                    | 是否获取页面性能指标 |
|    `isMonitorClick`    | `boolean`  | `true`                    | 是否监听click事件    |
| `isMonitorHashChange`  | `boolean`  | `true`                    | 是否监听hash模式     |
|   `isMonitorHistory`   | `boolean`  | `true`                    | 是否监听history模式  |
| `isMonitorWhiteScreen` | `boolean`  | `true`                    | 是否检测白屏         |
|  `isSkeletonProject`   | `boolean`  | `true`                    | 是否有骨架屏         |
| `whiteScreenElements`  | `string[]` | `[#app,#root,#main,body]` | 白屏检测的容器列表   |

### @u-moni/recordScreen 配置项

|        Name        | Type     | Default | Description                |
| :----------------: | -------- | ------- | -------------------------- |
| `recordScreentime` | `number` | `10`    | 单次录屏时长，默认值为 10s |
