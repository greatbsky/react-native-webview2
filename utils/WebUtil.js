//Web相关的util方法
export default class {

    static getHash(url) {
        if (url.indexOf('http') == 0) {
            var index = url.indexOf('#');
            if (index != -1) {
                return url.substr(index + 1);
            }
        }
        return '';
    }

}
