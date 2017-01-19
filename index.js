'use strict';

import React, { Component } from 'react';
import {
    View,
    WebView
} from 'react-native';

import styles from './style/index.js';

/**
通过webview里网页的url的hash进行js相互调用，并实现autoheight功能，只支持source={uri}，不支持source={html}
Demo:
import Web from 'react-native-webview2';

<Web
    evalReturn={(r) => {eval(r)}
    ref={(c) => {this.web = c}}
    source={{uri: 'xxx'}}
    style={[styles.web, {minHeight: 300}]}
    ...other props
/>
*/
export default class extends Component {

    constructor(props) {
        super(props);
        this.isEnable = (this.props.source && this.props.source.uri) ? true : false;
        this.state = Object.assign({}, props, {
            source: this.props.source,
            pageId: Math.random(),
            nativeJsId: Math.random(),
        });
        this.initJavaScript = this.initJavaScript.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.setHeight = this.setHeight.bind(this);
        this.evalJs = this.evalJs.bind(this);
        this.evalReturn = this.evalReturn.bind(this);
        this.go = this.go.bind(this);
        this.reload = this.reload.bind(this);
        this.newPageId = this.newPageId.bind(this);
        this.initJavaScript();
    }

    initJavaScript() {
        let autoHeightJsFun = `window.autoHeight = function() {window.returnEval('${this.state.nativeJsId};this.setHeight(' + document.documentElement.offsetHeight + ')');};`;
        this.initJsCode = `
        window.returnEval = function (v) {
            setTimeout(function() {
                window.postMessage(String(v));
            }, 0);
        };
        ${autoHeightJsFun}
        window.addEventListener('onresize', window.autoHeight, false);
        window.ready = function(){
            window.autoHeight();
        };
        function isComplete() {
			if (document.readyState == "complete") {
				window.ready();
			} else {
				setTimeout(isComplete);
			}
		};
        isComplete();
        `;
        this.state.injectedJavaScript = this.initJsCode + this.props.injectedJavaScript;
    }

    onMessage(e) {
        // console.log('-----------------------onMessage');
        // console.log(e.nativeEvent.data);
        this.props.onMessage && this.props.onMessage(e);
        this.evalReturn(e.nativeEvent.data);
    }

    setHeight(h) {
        this.setState({
            height: h
        });
    }

    // only support on android
    evalJs(js) {
        // console.log('-----------------------evalJs');
        // console.log(js);
        this.go(`javascript: ${js};` + Math.random());
    }

    evalReturn(r) {
        // console.log('--------------------evalReturn');
        // console.log(r);
        if (this.props.evalReturn && r.indexOf(this.state.nativeJsId) == -1) { //外部有传递evalReturn 并且要执行的hash非内嵌的方法
            this.props.evalReturn(r); //在外部执行hash
        } else {
            eval(r);
        }
    }

    go(uri) {
        this.setState({source: {
            uri: uri
        }});
    }

    goForward() {
        this.newPageId();
        this.webview.goForward();
    }

    goBack() {
        this.newPageId();
        this.webview.goBack();
    }

    stopLoading() {
        this.webview.stopLoading();
    }

    reload() {
        this.newPageId();
        this.webview.reload();
    }

    newPageId() {
        this.setState({
            pageId: Math.random()
        });
    }

    render() {
        let height = this.getHeight(this.props.style); //style设置了height就不会autoheight
        return (
            <View>
                <WebView ref={(c) => {this.webview = c}} {...this.props} style={[this.props.style, {'height': height}]} source={this.state.source} pageId={this.state.pageId} evalReturn={this.evalReturn}
                    injectedJavaScript={this.state.injectedJavaScript}
                    onMessage={this.onMessage} />
            </View>
        );
    }

    getHeight(s) {
        if (s) {
            if (s.length > 1) {
                let lastH = -1;
                for (var item of s) {
                    if (item.height) {
                        lastH = item.height;
                    }
                }
                if (lastH > 0) {
                    return lastH;
                }
            } else if(s.height) {
                return s.height;
            }
        }
        return this.state.height;
    }

}
