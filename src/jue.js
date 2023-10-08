// 助手
let JueHelper = {};

// uuid
JueHelper.uuid = function () {
    let s = [];
    var keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    for (var i = 0; i < 32; i++) {
        s.push(keys[parseInt(Math.random() * keys.length)]);
    }
    var uuid = s.join("");
    return uuid;
}

/**
 * Jue虚拟元素
 */
class JueVirtualElement {
    /**
     * 元素名称
     * @param {String} name 
     */
    constructor(name) {
        this.Id = JueHelper.uuid();
        this.Name = name;
        this.Styles = {};
        this.Attributes = {};
        this.Content = undefined;
        this.ParentElementId = undefined;
    }
    /**
     * 设置父元素
     * @param {JueVirtualElement} element 
     */
    setParent(element) {
        this.ParentElementId = element.Id;
    }
    /**
     * 创建元素视图
     */
    createView() {
        return new JueElementView(this);
    }
    /**
     * 设置样式
     * @returns {JueElement}
     */
    css(styles) {
        if (typeof (styles) === "undefined") return;
        for (let key in styles) {
            this.Styles[key] = styles[key];
        }
        return this;
    }
    /**
     * 设置属性
     * @param {*} attrs 
     */
    attr(attrs) {
        for (let key in attrs) {
            this.Attributes[key] = attrs[key];
        }
        return this;
    }
}

/**
 * Jue元素视图
 */
class JueElementView {
    /**
     * Jue视图
     * @param {JueVirtualElement} virtualElement 
     */
    constructor(virtualElement) {
        this.Element = document.createElement(virtualElement.Name);
        // 复制属性
        this.Id = virtualElement.Id;
        this.ParentElementId = virtualElement.ParentElementId;
        this.Content = virtualElement.Content;
        // 复制样式
        this.Styles = {};
        for (let key in virtualElement.Styles) {
            this.Styles[key] = virtualElement.Styles[key];
        }
        // 复制属性
        this.Attributes = {};
        for (let key in virtualElement.Attributes) {
            this.Attributes[key] = virtualElement.Attributes[key];
        }
    }
    /**
     * 绑定
     * @param {HTMLElement} element 
     */
    bind(element) {
        if (typeof (this.ParentElement) !== "undefined") throw "视图已有绑定对象";
        this.ParentElement = element;
        this.ParentElement.appendChild(this.Element);
    }
    /**
     * 呈现
     */
    render() {
        if (typeof (this.ParentElement) === "undefined") return;
        // 生效所有的样式
        for (let key in this.Styles) {
            this.Element.style[key] = this.Styles[key];
        }
        // 生效所有的属性
        for (let key in this.Attributes) {
            this.Element.setAttribute(key, this.Attributes[key]);
        }
        // 生效内容
        if (typeof (this.Content) !== "undefined") {
            this.Element.innerHTML = this.Content;
        }
    }
    /**
     * 解绑
     */
    unbind() {
        if (typeof (this.ParentElement) === "undefined") return;
        this.ParentElement.removeChild(this.Element);
        this.ParentElement = undefined;
    }
}

/**
 * Jue组件
 */
class JueCompnent {
    /**
     * 组件名称
     * @param {String} name 
     */
    constructor(name) {
        this.Name = name;
        this.Elements = [];
    }
    /**
     * 创建元素视图
     * @param {HTMLElement} element 
     */
    createView(element) {
        return new JueCompnentView(element, this);
    }
    /**
     * 创建元素
     * @param {String} name 
     */
    createElement(name) {
        let ele = new JueVirtualElement(name);
        this.Elements.push(ele);
        return ele;
    }
}

/**
 * Jue组件视图
 */
class JueCompnentView {
    /**
     * 组件名称
     * @param {HTMLElement} element 
     * @param {JueCompnent} compnent 
     */
    constructor(element, compnent) {
        this.Element = element;
        this.Compnent = compnent;
        this.Views = [];
        for (let i = 0; i < this.Compnent.Elements.length; i++) {
            let ele = this.Compnent.Elements[i];
            // 创建新视图
            let view = ele.createView();
            this.Views.push(view);
            // 绑定子视图
            if (typeof (ele.ParentElementId) !== "undefined") {
                let parentView = this.getViewById(ele.ParentElementId);
                if (typeof (parentView) !== "undefined") {
                    //parentView.Element.appendChild(view.Element);
                    view.bind(parentView.Element);
                }
            }
        }
    }
    /**
     * 根据Id获取相关视图
     * @param {String} id 
     * @returns 
     */
    getViewById(id) {
        for (let i = 0; i < this.Views.length; i++) {
            let view = this.Views[i];
            if (view.Id === id) return view;
        }
        return undefined;
    }
    /**
     * 呈现
     * @param {HTMLElement} element 
     */
    render() {
        // 将所有顶层视图附加到关联元素中
        for (let i = 0; i < this.Views.length; i++) {
            let view = this.Views[i];
            // 绑定子视图
            if (typeof (view.ParentElementId) === "undefined") {
                view.bind(this.Element);
                //this.Element.appendChild(view.Element);
            }
            // 呈现视图
            view.render();
        }
    }
    /**
     * 销毁
     */
    destroy() {
        // 将所有顶层视图附加到关联元素中
        for (let i = 0; i < this.Views.length; i++) {
            let view = this.Views[i];
            // 绑定子视图
            if (typeof (ele.ParentElementId) === "undefined") {
                this.Element.removeChild(view.Element);
            }
        }
    }
}

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

/**
 * Jue头部
 */
class JueHeader extends JueContainerElement {
    /**
     * 构造函数
     */
    constructor() {
        super(document.head)
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
            this.raise("fetch_fail", res.message);
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
    // 注册所有组件
    $.compnents = [];
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
        // 建立一个Demo组件并生效
        let demo = new JueCompnent("demo");
        let demoDiv = demo.createElement("div");
        console.log("demoDiv: " + demoDiv.Id);
        let demoDiv2 = demo.createElement("div");
        demoDiv2.setParent(demoDiv);
        demoDiv2.css({ fontSize: "14px" });
        //demoDiv2.Content = "Demo";
        let demoDiv3 = demo.createElement("div");
        demoDiv3.setParent(demoDiv2);
        demoDiv3.css({ color: "#fff" });
        demoDiv3.Content = "Demo";
        demo.createView(document.body).render();
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