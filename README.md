# UMonitoR
<div align="center">
<p style="font-weight:800"> UMonitoR  (UMR)</p>
<p> A Lightweight SDK For Monitor Web</p>
<p>一款轻量级的前端监控SDK</p>

[![npm version](https://img.shields.io/npm/v/@u-moni/core.svg?style=flat-square)](https://www.npmjs.com/package/@u-moni/core)
[![license](https://img.shields.io/github/license/clouDr-f2e/mitojs)](https://www.npmjs.com/package/@u-moni/core)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub last commit](https://img.shields.io/github/last-commit/1930850328/UMonitoR.svg?style=flat-square)](https://github.com/1930850328/UMonitoR)


</div>

遵循  `内核 + 插件 + 发布订阅模式` 的设计思路，立志实现`高性能`、`高可用`、`可拓展`的SDK

## 特点

- 🔨 使用 `monorepo + pnpm + ts` 进行开发,做到`高内聚 低耦合`,可按需引入所需功能
- 🔨 支持收集项目性能数据（`FCP` | `FMP` | `LCP` | `TTI` | `TLS`  ...）
- 🔨 支持收集错误数据, 例如 `JS报错`、`异步任务错误`、`资源加载错误`
- 🔨 支持收集用户数据: PV、路由跳转（hash路由、history路由）、用户行为栈...
- 🔨 支持监控xhr、fetch请求
- 🔨 支持多种上报方式，并且支持多种上报策略，不影响业务逻辑
- 🔨 支持多种错误还原方式，瞬时定位项目错误
- 🔨 丰富的hooks与配置项支持可高定制化 
- 🔨 支持原生Web项目和Web框架Vue3、Vue2.6、React项目
- 👌 持续迭代更新

