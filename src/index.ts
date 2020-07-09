import Foundation from '@hecom/foundation';
import React from 'react';

interface Listener {
    onNavigate(routeName: string, param: object): void

    onPop(popKey: string): void
}

function navicontrol() {
    return navigationContainer.current;
};
export const navigationContainer = React.createRef();
let _setSwitchNav = ()=> {};

let _listener: Listener;

export default {
    setSwitchNav: (switchFunc)=> _setSwitchNav = switchFunc,
    get: () => navicontrol(),
    push: _push,
    navigate: _navigate,
    pop: _pop,
    popByKey: _popByKey,
    popByRoute: _popByRoute,
    popByDelta: _popByDelta,
    switchNav: _switchNav,
    refresh: _refresh,
    setListener: (listener: Listener) => _listener = listener,
};

let lastRoute = '';
function _push(routeName: string, param: object = {}): void {
    const routeStr = routeName + JSON.stringify(param) + '';
    if (lastRoute === routeStr) {
        const {routes} = navicontrol().getRootState();
        if (routes.length > 0 && routes[routes.length - 1].name === routeName) {
            return;
        }
    }
    lastRoute = routeStr;
    navicontrol().navigate({
        name: routeName,
        params: param,
        key: routeName + Foundation.StringUtil.guid()
    });
    setTimeout(() => {
        lastRoute = '';
    }, 2000);
    if (_listener && _listener.onNavigate) {
        _listener.onNavigate(routeName, param);
    }
}

function _navigate(routeName: string, param: object = {}): void {
    navicontrol().navigate(routeName,param);
    if (_listener && _listener.onNavigate) {
        _listener.onNavigate(routeName, param);
    }
}

function _pop(): void {
    const {index, routes} = navicontrol().getRootState();
    _popByParam(routes[index - 1 < 0 ? 0 : index - 1].key)
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
    const fromKey = _keyFromIndex(delta);
    _popByParam(fromKey);
}

function _popByParam(key: string) {
    navicontrol().navigate({key: key});
    if (_listener && _listener.onPop) {
        _listener.onPop(key);
    }
}

function _switchNav(navType: string) {
    _setSwitchNav(navType);
}

function _refresh(_isApiLoading: boolean, _apiLoadingStyle: object) {
    const nav = navicontrol();
    nav.setParams({_isApiLoading, _apiLoadingStyle});
}

global.push = _push;
global.refresh = _refresh;

function _keyFromIndex(delta: number, startIndex?: number) {
    const {index, routes} = navicontrol().getRootState();
    startIndex = startIndex === undefined ? index : startIndex;
    if (startIndex + delta < 0) {
        return;
    }
    return routes[startIndex + delta].key;
}

function _keyFromRouteName(name: string) {
    const {routes} = navicontrol().getRootState();
    const result = routes.filter(item => item.routeName === name);
    if (result.length > 0) {
        return result[result.length - 1].key;
    }
}

function _indexFromKey(key: string) {
    const {routes} = navicontrol().getRootState();
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