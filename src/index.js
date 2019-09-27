import Foundation from '@hecom/foundation';

let navicontrol = null;

export default {
    set: (navigation) => navicontrol = navigation,
    get: () => navicontrol,
    push: _push,
    navigate: _navigate,
    pop: _pop,
    popByKey: _popByKey,
    popByRoute: _popByRoute,
    popByDelta: _popByDelta,
    reset: _reset,
    refresh: _refresh,
};

function _push(routeName, param = {}) {
    navicontrol.navigate({
        routeName: routeName,
        params: param,
        key: routeName + Foundation.StringUtil.guid(),
    });
}

function _navigate(routeName, param = {}) {
    navicontrol.navigate({
        routeName: routeName,
        params: param,
    });
}

function _pop() {
    const {index, routes} = navicontrol.state;
    navicontrol.goBack(routes[index].key);
}

function _popByKey(key) {
    const index = _indexFromKey(key);
    const fromKey = _keyFromIndex(1, index);
    navicontrol.goBack(fromKey);
}

function _popByRoute(routeName) {
    const key = _keyFromRouteName(routeName);
    _popByKey(key);
}

function _popByDelta(delta) {
    const fromKey = _keyFromIndex(delta + 1);
    navicontrol.goBack(fromKey);
}

function _reset(routeName, param = {}) {
    navicontrol.navigate(routeName, param);
}

function _refresh(_isApiLoading, _apiLoadingStyle) {
    navicontrol.setParams({_isApiLoading, _apiLoadingStyle});
}

global.push = _push;
global.refresh = _refresh;

function _keyFromIndex(delta, startIndex) {
    const {index, routes} = navicontrol.state;
    startIndex = startIndex === undefined ? index : startIndex;
    if (startIndex + delta < 0) {
        return;
    }
    return routes[startIndex + delta].key;
}

function _keyFromRouteName(name) {
    const {routes} = navicontrol.state;
    const result = routes.filter(item => item.routeName === name);
    if (result.length > 0) {
        return result[result.length - 1].key;
    }
}

function _indexFromKey(key) {
    const {routes} = navicontrol.state;
    if (key) {
        let result = -1;
        routes.forEach((item, index) => {
            if (item.key === key) {
                result = index;
            }
        });
        return result;
    } else {
        return routes.length;
    }
}