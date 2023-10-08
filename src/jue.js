/**
 * Jue样式集合
 */
class JueStyleCollection {
    /**
     * 构造函数
     * @param {JueStyleCollection} parent 
     */
    constructor(parent) {
        this.ParentStyles = parent;
        this.Styles = {};
    }
    /**
     * 设置样式
     * @param {String} name 
     * @param {*} styles 
     */
    set(name, styles) {
        this.Styles[name] = styles;
        return this;
    }
    /**
     * 获取样式
     * @param {String} name 
     */
    get(name) {
        // 存在是返回
        if (typeof (this.Styles[name]) !== "undefined") return this.Styles[name];
        // 不存在则从父集合中取
        if (typeof (this.ParentStyles) !== "undefined") return this.ParentStyles.get(name);
        // 不存在父集合则返回未定义
        return undefined;
    }
    /**
     * 移除
     * @param {String} name 
     */
    remove(name) {
        // 存在是返回
        if (typeof (this.Styles[name]) === "undefined") return;
        this.Styles[name] = undefined;
        return this;
    }
    /**
     * 清理
     */
    clear() {
        this.Styles = {};
        return this;
    }
}

/**
 * Jue元素
 */
class JueElement {
    /**
     * 构造函数
     * @param {HTMLElement} ele 
     * @param {JueStyleCollection} styles
     */
    constructor(ele, styles) {
        this.Element = ele;
        if (typeof (styles) === "undefined") {
            this.Styles = new JueStyleCollection();
        } else {
            this.Styles = styles;
        }
    }
    /**
     * 生效一个样式
     * @returns {JueElement}
     */
    class(name) {
        let styles = this.Styles.get(name);
        return this.style(styles);
    }
    /**
     * 生效一个样式
     * @returns {JueElement}
     */
    style(styles) {
        if (typeof (styles) === "undefined") return;
        for (let key in styles) {
            this.Element.style[key] = styles[key];
        }
        return this;
    }
    /**
     * 获取或设置属性
     * @param {*} attrs 
     */
    attr(attrs) {
        // 批量设置属性
        if (typeof (attrs) === "object") {
            for (let key in attrs) {
                this.Element.setAttribute(key, attrs[key]);
            }
            return this;
        }
        // 返回属性值
        return this.Element.getAttribute(attrs);
    }
}

/**
 * Jue元素
 */
class JueContainerElement extends JueElement {
    /**
     * 构造函数
     * @param {HTMLElement} ele 
     * @param {JueStyleCollection} styles
     */
    constructor(ele, styles) {
        super(ele, new JueStyleCollection(styles));
    }
    /**
     * 创建一个子div
     */
    div() {
        let ele = document.createElement("div");
        this.Element.appendChild(ele);
        return new JueContainerElement(ele, this.Styles);
    }
    /**
     * 获取css管理器
     */
    css() {
        return this.Styles;
    }
}

/**
 * Jue主体
 */
class JueBody extends JueContainerElement {
    /**
     * 构造函数
     */
    constructor() {
        super(document.body)
    }
}

// 封装对象
(function () {
    // 注册对象
    let jue = {};
    let $ = jue;
    // 判断对象是否存在
    if (typeof (window.jue) !== "undefined") {
        console.warn("jue对象被占用");
    } else {
        window.jue = jue;
    }
    // 判断对象是否存在
    if (typeof (window.$) !== "undefined") {
        console.warn("$对象被占用");
    } else {
        window.$ = jue;
    }
    // 获取数据
    let getData = async function (response) {
        // 判断返回状态
        if (response.status !== 200) {
            $.raise("fetch_fail", response);
            return undefined;
        }
        // 解析内容
        let res = await response.json();
        if (!res.success) {
            if (typeof onFail === "function") {
                onFail(res.message);
            } else {
                this.raise(EventTypes.API_FAIL, res.message);
            }
            return null;
        }
        return res.data;
    }
    // 网络访问
    $.get = async function (url, headers) {
        let response = await fetch(url, {
            method: "GET",
            headers: headers,
            mode: 'cors',
        });
        return await getData(response);
    }
    // uuid
    $.uuid = function () {
        let s = [];
        var keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        for (var i = 0; i < 32; i++) {
            s.push(keys[parseInt(Math.random() * keys.length)]);
        }
        var uuid = s.join("");
        return uuid;
    }
    // 定义所有内置元素
    let eles = {};
    // 获取缓存元素
    $.element = function (name) {
        return eles[name];
    }
    // 定义所有事件
    let events = {};
    // 触发事件
    $.raise = function (name, args) {
        if (typeof (events[name]) === "undefined") return;
        // 读取列表
        let list = events[name];
        for (let i = 0; i < list.length; i++) {
            let fn = list[i];
            if (typeof (fn) !== "function") continue;
            try {
                fn(args);
            } catch (ex) {
                console.error(ex);
            }
        }
        // 清空列表
        events[name] = [];
    }
    // 注册事件
    $.event = function (name, fn) {
        // 新建对象
        if (typeof (events[name]) === "undefined") events[name] = [];
        // 读取列表
        let list = events[name];
        list.push(fn);
    }
    // 注册就绪事件
    $.ready = function (fn) { $.event("ready", fn); }
    // 添加入口函数
    $.event("initialize", function () {
        // 封装函数
        $.Body = new JueBody();
        // 标准提示框
        eles.notice = $.Body.div().style({ padding: "5px", color: "#ffffff" });
        $.notice = function (content) { eles.notice.Element.innerHTML = content; }
        // 触发ready事件
        $.raise("ready");
    });
    // 启动远程脚本
    $.start = function (url) {
        // 创建js脚本
        let js = document.createElement("script");
        js.src = url;
        js.onload = js.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                $.raise("ready");
            };
            js.onload = js.onreadystatechange = null;
        };
        // 添加js脚本
        document.head.appendChild(js);
    }
})();

// 添加内容加载完成事件
document.addEventListener("DOMContentLoaded", function () {
    // 判断对象是否存在
    if (typeof (window.jue) !== "undefined") {
        window.jue.raise("initialize");
    }
});