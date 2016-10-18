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
        let hash = WebUtil.getHash(e.nativeEvent.url);
        if (hash.indexOf(this.props.pageId) == -1) {
            this.superOnLoadingStart(e);
        } else if (hash.indexOf(this.props.pageId) == 0) { // 非原始页，需要执行返回结果
            this.props.evalReturn && this.props.evalReturn(decodeURIComponent(hash)); //执行返回结果
        }
    }

}
