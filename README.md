# 基于Spring Cloud的学生管理平台（前端 Angular）

[![GitHub stars](https://img.shields.io/github/stars/itning/smp-client-angular.svg?style=social&label=Stars)](https://github.com/itning/smp-client-angular/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/itning/smp-client-angular.svg?style=social&label=Fork)](https://github.com/itning/smp-client-angular/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/itning/smp-client-angular.svg?style=social&label=Watch)](https://github.com/itning/smp-client-angular/watchers)
[![GitHub followers](https://img.shields.io/github/followers/itning.svg?style=social&label=Follow)](https://github.com/itning?tab=followers)

[![GitHub issues](https://img.shields.io/github/issues/itning/smp-client-angular.svg)](https://github.com/itning/smp-client-angular/issues)
[![GitHub license](https://img.shields.io/github/license/itning/smp-client-angular.svg)](https://github.com/itning/smp-client-angular/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/itning/smp-client-angular.svg)](https://github.com/itning/smp-client-angular/commits)
[![GitHub release](https://img.shields.io/github/release/itning/smp-client-angular.svg)](https://github.com/itning/smp-client-angular/releases)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/itning/smp-client-angular.svg)](https://github.com/itning/smp-client-angular)
[![HitCount](http://hits.dwyl.io/itning/smp-client-angular.svg)](http://hits.dwyl.io/itning/smp-client-angular)
[![language](https://img.shields.io/badge/language-Vue.JS-green.svg)](https://github.com/itning/smp-client-angular)

## 工程

1. 前端项目
   - [Vue.JS 实现](https://github.com/itning/smp-client)
   - [Angular 实现](https://github.com/itning/smp-client-angular)
2. Android移动端项目
   - [教师端](https://github.com/itning/smp-android-teacher)
   - [学生端](https://github.com/itning/smp-android)
3. 后端
   - [Spring Cloud](https://github.com/itning/smp-server)
4. 人脸识别模型库
   - [smp-ext-lib](https://gitee.com/itning/smp-ext-lib)
5. 统一配置中心数据存放仓库
   - [smp-server-config](https://gitee.com/itning/smp-server-config)

## 依赖

### 编译器

| 编译器            | 版本      |
| ----------------- | --------- |
| android studio    | 3.5.3+    |
| intellij idea     | 2019.3.1+ |
| intellij webstorm | 2019.3.1+ |

### 编译与运行

| 依赖                    | 版本                |
| ----------------------- | ------------------- |
| Java SE Development Kit | 8u231 (JDK 8<JDK11) |
| maven                   | 3.6.3+              |
| node.js                 | 12.14.0+            |
| yarn                    | 1.21.1+             |
| npm                     | 6.13.4+             |
| mysql                   | 8.0.18+             |

## 设置代理

### npm

```shell
npm config set registry https://registry.npm.taobao.org
```

### yarn

```shell
yarn config set registry https://registry.npm.taobao.org
```

## 项目编译

配置目录：[src/app/api/index.ts](https://github.com/itning/smp-client-angular/blob/master/src/app/api/index.ts#L1)

[高德地图开发者地址](https://lbs.amap.com/)

```js
export const SERVER_HOST = 'http://localhost:8888';
export const API = {
  // 高德地图API KEY
  aMapKey: ''
}
```

安装依赖

```bash
npm install
```

打包发布

```bash
npm run build
```

调试运行

```bash
npm run start
```

## 预览

![login](https://raw.githubusercontent.com/itning/smp-client-angular/master/pic/login.png)

![first](https://raw.githubusercontent.com/itning/smp-client-angular/master/pic/first.png)

![student](https://raw.githubusercontent.com/itning/smp-client-angular/master/pic/student.png)

![leave](https://raw.githubusercontent.com/itning/smp-client-angular/master/pic/leave.png)

![room](https://raw.githubusercontent.com/itning/smp-client-angular/master/pic/room.png)

## 版权声明

该项目仅用于学习，禁止用于商业用途。

项目是我个人毕业项目，**不建议作为您毕业项目来使用**。
