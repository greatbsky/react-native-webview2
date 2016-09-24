'use strict';

import React, { Component } from 'react';
import {
    WebView
} from 'react-native';

import styles from './style/index.css';

import WebUtil from './utils/WebUtil';

export default class extends WebView {

    constructor(props) {
        super(props);
    }

    __onLoadingStart(e) {
        // console.log(`............................__onLoadingStart`);
        // console.log(e.nativeEvent);
        if (WebUtil.getHash(e.nativeEvent.url).indexOf(this.props.pageId) == -1) {
            this.superOnLoadingStart(e);
        }
    }

    __onLoadingFinish (e, propsOnLoadEnd) {
        // console.log('...................__onLoadingFinish current url:' + e.nativeEvent.url);
        let hash = WebUtil.getHash(e.nativeEvent.url);
        if (hash.indexOf(this.props.pageId) == 0) { // 非原始页，需要执行返回结果
            this.props.evalReturn && this.props.evalReturn(decodeURIComponent(hash)); //执行返回结果
        } else if (hash.indexOf(this.props.pageId) == -1) {
            this.props.initJavaScript && this.props.initJavaScript();
            propsOnLoadEnd && propsOnLoadEnd(); //执行用户的onLoadingFinish属性
        }
    }
}
