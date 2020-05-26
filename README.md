# Navigation

[![npm version](https://img.shields.io/npm/v/@hecom/navigation.svg?style=flat)](https://www.npmjs.com/package/@hecom/navigation)
[![Build Status](https://travis-ci.org/hecom-rn/navigation.svg?branch=master)](https://travis-ci.org/hecom-rn/navigation)

这是导航模块，使用`react-navigation`作为导航器，这里集成了一些API供用户使用。

**接口**：

* `setSwitchNav: (switchFunc) => void`：设置切换导航器方法。
* `get: () => object`：获取导航器对象。
* `push: (routeName, param) => void`：推入页面。
* `pop: () => void`：回退到上一页。
* `popByKey: (key) => void`：回退到指定`key`页面，这里`key`是导航器内部标识。
* `popByRoute: (routeName) => void`：回退到指定`routeName`页面。
* `popByDelta: (delta) => void`：回退指定增量的页面，其中`delta`小于0，如果等于-1，则等价于`pop`方法。
* `reset: (routeName, param) => void`：重置导航器的路由到指定页面，用于登陆部分和主页面部分的切换。
* `refresh: (isLoading, loadingStyle) => void`：等价于在页面中调用`this.apiRefresh`，更新刷新状态。
