import JuesApiOption from './JuesApiOption';
import JuesApiResult from './JuesApiResult';
import JuesConfigure from './JuesConfigure'
import JuesJwt from './JuesJwt';

// 定义常量
const EVENT_LOAD = "Load";
const EVENT_SUCCESS = "Success";
const EVENT_FAIL = "Fail";
const EVENT_ERROR = "Error";
const EVENT_MESSAGE = "Message";

/**
 * Jues插件
 */
class Jues {
    /**
     * Jues插件
     * @param {JuesConfigure} config 
     */
    constructor(config) {
        if (typeof (config) === "undefined") config = new JuesConfigure();
        console.log(config);
        this.Config = config
        this.Jwt = new JuesJwt(config);
        this.__handles = {};
    }
    /**
     * 是否为空
     * @param {any} obj 
     */
    isNull(obj) {
        if (typeof (obj) === "undefined") return true;
        if (obj === null) return true;
        return false;
    }
    /**
     * 创建ApiOption
     * @param {*} fn 
     */
    createApiOption(fn) {
        let opt = new JuesApiOption()
        if (typeof (fn) === "function") fn(opt);
        return opt;
    }
    /**
     * 绑定事件
     * @param {String} evt 
     * @param {void} fn 
     */
    on(evt, fn) {
        if (typeof (this.__handles[evt]) === "undefined") this.__handles[evt] = [];
        this.__handles[evt].push(fn);
    }
    /**
     * 绑定加载事件
     * @param {void} fn 
     */
    onLoad(fn) {
        this.on(EVENT_LOAD, fn);
    }
    /**
     * 绑定成功事件
     * @param {void} fn 
     */
    onSuccess(fn) {
        this.on(EVENT_SUCCESS, fn);
    }
    /**
     * 绑定失败事件
     * @param {void} fn 
     */
    onFail(fn) {
        this.on(EVENT_FAIL, fn);
    }
    /**
     * 绑定异常事件
     * @param {void} fn 
     */
    onError(fn) {
        this.on(EVENT_ERROR, fn);
    }
    /**
     * 绑定消息事件
     * @param {void} fn 
     */
    onMessage(fn) {
        this.on(EVENT_MESSAGE, fn);
    }
    /**
     * 触发事件
     * @param {String} evt 
     * @param {any} arg 
     * @param {Boolean} once 
     */
    raise(evt, arg, once = false) {
        let that = this;
        if (typeof (that.__handles[evt]) === "undefined") return;
        let list = that.__handles[evt];
        // 依次执行函数
        for (let i = 0; i < list.length; i++) {
            if (typeof list[i] !== "function") continue;
            list[i](arg);
        }
        // 单次执行模式下，清除所有绑定事件
        if (once) that.__handles[evt] = [];
    }
    /**
     * 触发消息事件
     * @param {String} evt 
     * @param {any} arg 
     * @param {Boolean} once 
     */
    raiseMessage(arg) {
        this.raise(EVENT_MESSAGE, arg);
    }
    /**
     * 获取API结果
     * @param {Response} response 
     * @param {JuesApiOption} opt 
     * @returns 
     */
    async getApiReult(response, opt) {
        // 判断返回状态
        if (response.status !== 200) {
            // 触发异常事件
            if (typeof (opt) === "undefined") {
                this.raise(EVENT_ERROR, response);
            } else {
                opt.onError(response);
                if (!opt.IsSuppressEvent) this.raise(EVENT_ERROR, response);
            }
            return new JuesApiResult("Status " + response.status);
        }
        // 解析内容
        let res = await response.json();
        if (!res.success) {
            // 触发失败事件
            if (typeof (opt) === "undefined") {
                this.raise(EVENT_FAIL, res);
            } else {
                opt.onFail(res);
                if (!opt.IsSuppressEvent) this.raise(EVENT_FAIL, res);
            }
            return res;
        }
        // 触发失败事件
        if (typeof (opt) === "undefined") {
            this.raise(EVENT_SUCCESS, res);
        } else {
            opt.onSuccess(res);
            if (!opt.IsSuppressEvent) this.raise(EVENT_SUCCESS, res);
        }
        return res;
    }
    /**
     * 以GET方式获取数据
     * @param {String} url 
     * @param {JuesApiOption} opt 
     */
    async get(url, opt) {
        // 触发异常事件
        if (typeof (opt) === "undefined") {
            this.raise(EVENT_LOAD, url);
        } else {
            opt.onLoad(url);
            if (!opt.IsSuppressEvent) this.raise(EVENT_LOAD, url);
        }
        // 拼接完整地址
        let fullUrl = this.Config.ApiUrl + url;
        // 设置头
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append(this.Config.JwtHeader, this.Jwt.Token);
        // 获取应答结果
        let response = await fetch(fullUrl, {
            method: "GET",
            //body: JSON.stringify(data),
            headers: headers,
            mode: 'cors',
        });
        return await this.getApiReult(response, opt);
    }
    /**
     * 以GET方式获取数据
     * @param {String} url 
     * @param {any} data 
     * @param {JuesApiOption} opt 
     */
    async post(url, data, opt) {
        // 触发异常事件
        if (typeof (opt) === "undefined") {
            this.raise(EVENT_LOAD, url);
        } else {
            opt.onLoad(url);
            if (!opt.IsSuppressEvent) this.raise(EVENT_LOAD, url);
        }
        // 拼接完整地址
        let fullUrl = this.Config.ApiUrl + url;
        // 设置头
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append(this.Config.JwtHeader, this.Jwt.Token);
        // 兼容空内容
        if (typeof (data) === "undefined") data = {};
        // 获取应答结果
        let response = await fetch(fullUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: headers,
            mode: 'cors',
        });
        return await this.getApiReult(response, opt);
    }
    /**
     * 以GET方式获取数据
     * @param {String} url 
     * @param {any} data 
     * @param {JuesApiOption} opt 
     */
    async put(url, data, opt) {
        // 触发异常事件
        if (typeof (opt) === "undefined") {
            this.raise(EVENT_LOAD, url);
        } else {
            opt.onLoad(url);
            if (!opt.IsSuppressEvent) this.raise(EVENT_LOAD, url);
        }
        // 拼接完整地址
        let fullUrl = this.Config.ApiUrl + url;
        // 设置头
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append(this.Config.JwtHeader, this.Jwt.Token);
        // 兼容空内容
        if (typeof (data) === "undefined") data = {};
        // 获取应答结果
        let response = await fetch(fullUrl, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: headers,
            mode: 'cors',
        });
        return await this.getApiReult(response, opt);
    }
}

let obj = {
    /**
     * 安装
     * @param {App<Element>} app 
     */
    install: function (app) {
        app.config.globalProperties.$jues = new Jues(new JuesConfigure());
    }
}

// 外部暴露
export default obj;