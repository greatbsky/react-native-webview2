# react-native-webview2

[![reactnative Version](https://img.shields.io/badge/reactnative-V0.30.0%2B-brightgreen.svg)](http://facebook.github.io/react-native/versions.html)
[![NPM Version](https://img.shields.io/npm/v/react-native-webview2.svg?style=flat-square)](https://www.npmjs.com/package/react-native-webview2)
[![GitHub issues](https://img.shields.io/github/issues/greatbsky/react-native-webview2.svg)](https://github.com/greatbsky/react-native-webview2/issues)
[![GitHub stars](https://img.shields.io/github/stars/greatbsky/react-native-webview2.svg)](https://github.com/greatbsky/react-native-webview2/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/greatbsky/react-native-webview2/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/greatbsky/react-native-webview2.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)


This is the `WebView` or `Web` component in React Native both for Android and iOS, support `auto height` & `call js` between component and html document, very useful & easily!

  This is a JavaScript-only implementation of `WebView` in React Native, named `react-native-webview2` or `WebView` or `Web`.
  1. `react-native-webview2` can change the height of `WebView` dynamically when you change the prop `source={uri:xxx}`(until now not yet support html) if you not set the prop `style={height:xxx}`, otherwise the height of `WebView` is fixed.
  2. `react-native-webview2` also can make you call js in html document or reactnative, if you want to call js in html page from react-native, you just invoke `this.web.evalJs("js code...here")` from react-native, if you want to call react-native code, you just invoke `returnEval("rn code...here")` from html page, and set the prop `evalReturn={(r) => {eval(r)}` of this component `WebView`.
  3. `react-native-webview2` support all of props like `WebView` in React Native.

`WebView` demo project: https://github.com/greatbsky/react-native-webview2-demo

## `WebView` Demo

  ![](https://raw.githubusercontent.com/greatbsky/react-native-webview2-demo/master/PullViewDemo/image/demo.gif)

## `WebView` Usage
  1. Run `npm install react-native-webview2 --save`
  2. Code like this:
  ```
  import Web from 'react-native-webview2';

  <Web
    ref={(c) => {this.web = c}}
    evalReturn={(r) => {eval(r)}
    source={{uri: 'xxx'}}
    style={[styles.web, {minHeight: 300}]}
    ...other props
    />
  ```
  3. Full demo code: https://github.com/greatbsky/react-native-webview2-demo/blob/master/WebView2App/app.js


## `WebView` configuration

  **special props for `WebView` **

  * **`evalJs`**: handle function if you want to call js in html page from react-native. eg: ``` this.web.evalJs('var t = document.title; alert(t)'); ```
  * **`evalReturn`**: require if you need call js fun in react-native from html page. evalReturn={(r) => {eval(r)}.
  * **`go`**: handle function if you need open a new uri. eg: ``` this.web.go('http://xxxxxx'); ```

## Licensed
  MIT License

# 中文说明请参见

  https://github.com/greatbsky/react-native-webview2/wiki
