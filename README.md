# Navigation

[![npm version](https://img.shields.io/npm/v/@hecom/navigation.svg?style=flat)](https://www.npmjs.com/package/@hecom/navigation)

这是导航模块，使用`react-navigation`作为导航器，这里集成了一些API供用户使用。

**封装接口**：

`withBasicWrapper`对页面级组件进行封装，这是一个高阶组件，主要是对于传入的`props`进行处理，增加刷新状态，同时内部参数会被提取到外部。

封装后的组件，参数直接在`props`中，而不是在`props.navigation.state.params`中。同时多了一个接口，`apiRefresh: (isLoading, loadingStyle) => void`，可以通过`this.apiRefresh`调用，重置当前页面的刷新图标显示与否。

**导航接口**：

* `set: (navigation) => void`：设置导航器对象。
* `get: () => object`：获取导航器对象。
* `push: (routeName, param) => void`：推入页面。
* `pop: () => void`：回退到上一页。
* `popByKey: (key) => void`：回退到指定`key`页面，这里`key`是导航器内部标识。
* `popByRoute: (routeName) => void`：回退到指定`routeName`页面。
* `popByDelta: (delta) => void`：回退指定增量的页面，其中`delta`小于0，如果等于-1，则等价于`pop`方法。
* `reset: (routeName, param) => void`：重置导航器的路由到指定页面，用于登陆部分和主页面部分的切换。
* `refresh: (isLoading, loadingStyle) => void`：等价于在页面中调用`this.apiRefresh`，更新刷新状态。