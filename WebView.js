'use strict';

import React, { Component } from 'react';
import {
    WebView,
    View
} from 'react-native';

import styles from './style/index.css';

const getHash = (url) => {
    if (url.indexOf('http') == 0) {
        var index = url.indexOf('#');
        if (index != -1) {
            return url.substr(index + 1);
        }
    }
    return '';
}

/**
通过webview里网页的url的hash进行js相互调用，并实现autoheight功能，暂时只支持source={uri}，不支持source={html}
Demo:
    <WebView
        autoheight={true}
    />
*/
export default class extends WebView {

    constructor(props) {
        super(props);
        this.onLoadingStart = (e) => {this._onLoadingStart (e);};
        this.onLoadingFinish = (e) => {this._onLoadingFinish (e);};
    }

    _onLoadingStart(e) {
        // console.log(`............................_onLoadingStart`);
        // console.log(e.nativeEvent);
        if (getHash(e.nativeEvent.url).indexOf(this.props.pageId) == -1) {
            super.onLoadingStart(e);
        }
    }

    _onLoadingFinish (e) {
        // console.log('...................onLoadingFinish current url:' + e.nativeEvent.url);
        let hash = getHash(e.nativeEvent.url);
        if (hash.indexOf(this.props.pageId) == 0) { // 非原始页，需要执行返回结果
            this.props.evalReturn && this.props.evalReturn(decodeURIComponent(hash)); //执行返回结果
        } else if (hash.indexOf(this.props.pageId) == -1) {
            super.onLoadingFinish(e);
            this.props.initJavaScript && this.props.initJavaScript();
        }
    }
}
