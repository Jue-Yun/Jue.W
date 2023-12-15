import JuesConfigure from "./JuesConfigure";

/**
 * 转为不为空字符串
 * @param {String} str 
 */
let NotNullString = function (str) {
    if (typeof (str) === "undefined") return "";
    if (str === null) return "";
    return str;
}

/**
 * 转为不为空数值
 * @param {any} str 
 * @returns 
 */
let NotNullNumber = function (str) {
    if (typeof (str) === "undefined") return 0;
    if (str === null) return 0;
    let num = parseFloat(str);
    if (isNaN(num)) return 0;
    return num;
}

/**
 * Jues Jwt组件
 */
class JuesJwt {
    /**
     * Jues Jwt组件
     * @param {JuesConfigure} config 
     */
    constructor(config) {
        /**
         * 令牌
         */
        this.Token = "";
        /**
         * 过期时间
         */
        this.ExpireTimestamp = 0;
        /**
         * 更新时间
         */
        this.UpdateTimestamp = 0;
        // 读取jwt信息
        if (typeof (config) === "undefined") config = new JuesConfigure();
        this.Config = config;
        this.read();
    }
    /**
     * 清理Jwt信息
     */
    clear() {
        this.Token = "";
        this.ExpireTimestamp = 0;
        this.UpdateTimestamp = 0;
        localStorage.setItem(this.Config.JwtTokenStorage, this.Token);
        localStorage.setItem(this.Config.JwtExpireStorage, this.ExpireTimestamp);
        localStorage.setItem(this.Config.JwtUpdateStorage, this.UpdateTimestamp);
    }
    /**
     * 从本地存储中读取Jwt信息
     */
    read() {
        // 读取令牌
        let jwtToken = NotNullString(localStorage.getItem(this.Config.JwtTokenStorage));
        if (jwtToken === "") {
            this.clear();
            return;
        }
        // 读取生效
        let jwtExpire = NotNullNumber(localStorage.getItem(this.Config.JwtExpireStorage));
        var ts = (new Date()).getTime();
        if (ts > jwtExpire) {
            this.clear();
            return;
        }
        let jwtUpdate = NotNullNumber(localStorage.getItem(this.Config.JwtUpdateStorage));
        // 更新内容
        this.Token = jwtToken;
        this.ExpireTimestamp = jwtExpire;
        this.UpdateTimestamp = jwtUpdate;
    }
    /**
     * 更新Jwt信息并存储
     * @param {String} token 
     * @param {Date} expireTime
     * @param {Date} updateTime
     */
    update(token, expireTime, updateTime) {
        this.Token = token;
        this.ExpireTimestamp = expireTime.getTime();
        this.UpdateTimestamp = updateTime.getTime();
        if (this.isExpire()) {
            this.clear();
            return;
        }
        localStorage.setItem(this.Config.JwtTokenStorage, this.Token);
        localStorage.setItem(this.Config.JwtExpireStorage, this.ExpireTimestamp);
        localStorage.setItem(this.Config.JwtUpdateStorage, this.UpdateTimestamp);
    }
    /**
     * 获取是否过期
     */
    isExpire() {
        if (this.Token === "") return true;
        var ts = (new Date()).getTime();
        return ts > this.ExpireTimestamp;
    }
    /**
     * 获取是否需要升级
     */
    isNeedUpdate() {
        var ts = (new Date()).getTime();
        return ts > this.UpdateTimestamp;
    }
}

export default JuesJwt;