'use strict';

import React, { Component } from 'react';
import {
    WebView,
    View
} from 'react-native';

import styles from './style/index.css';

import WebUtil from './utils/WebUtil';
import WebViewParent from './WebViewParent';

export default class extends WebViewParent {

    constructor(props) {
        super(props);
        this._onLoadingStart = (e) => {this.__onLoadingStart (e);};
        this.superOnLoadingStart = (e) => {
            let onLoadStart = this.props.onLoadStart;
            onLoadStart && onLoadStart(e);
            this._updateNavigationState(e);
        };
    }
}
