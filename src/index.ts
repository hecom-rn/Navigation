import Foundation from '@hecom/foundation';


interface Listener {
    onNavigate(routeName: string, param: object): void

    onPop(popKey: string): void
}

let navicontrol = null;

let _listener: Listener;

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
    setListener: (listener: Listener) => _listener = listener,
};

function _push(routeName: string, param: object = {}): void {
    navicontrol.navigate({
        routeName: routeName,
        params: param,
        key: routeName + Foundation.StringUtil.guid(),
    });
    if (_listener && _listener.onNavigate) {
        _listener.onNavigate(routeName, param);
    }
}

function _navigate(routeName: string, param: object = {}): void {
    navicontrol.navigate({
        routeName: routeName,
        params: param,
    });
    if (_listener && _listener.onNavigate) {
        _listener.onNavigate(routeName, param);
    }
}

function _pop(): void {
    const {index, routes} = navicontrol.state;
    _popByParam(routes[index].key)
}

function _popByKey(key: string): void {
    const index = _indexFromKey(key);
    const fromKey = _keyFromIndex(1, index);
    _popByParam(fromKey);
}

function _popByRoute(routeName: string): void {
    const key = _keyFromRouteName(routeName);
    _popByKey(key);
}

function _popByDelta(delta: number): void {
    const fromKey = _keyFromIndex(delta + 1);
    _popByParam(fromKey);
}

function _popByParam(key: string) {
    navicontrol.goBack(key);
    if (_listener && _listener.onPop) {
        _listener.onPop(key);
    }
}

function _reset(routeName: string, param: object = {}) {
    navicontrol.navigate(routeName, param);
    if (_listener && _listener.onNavigate) {
        _listener.onNavigate(routeName, param);
    }
}

function _refresh(_isApiLoading: boolean, _apiLoadingStyle: object) {
    navicontrol.setParams({_isApiLoading, _apiLoadingStyle});
}

global.push = _push;
global.refresh = _refresh;

function _keyFromIndex(delta: number, startIndex?: number) {
    const {index, routes} = navicontrol.state;
    startIndex = startIndex === undefined ? index : startIndex;
    if (startIndex + delta < 0) {
        return;
    }
    return routes[startIndex + delta].key;
}

function _keyFromRouteName(name: string) {
    const {routes} = navicontrol.state;
    const result = routes.filter(item => item.routeName === name);
    if (result.length > 0) {
        return result[result.length - 1].key;
    }
}

function _indexFromKey(key: string) {
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