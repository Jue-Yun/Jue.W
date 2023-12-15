/**
 * JuesApi可选配置
 */
class JuesApiOption {
    /**
     * Jues配置
     */
    constructor() {
        /**
         * 是否压制标准事件
         */
        this.IsSuppressEvent = false;
        /**
         * 加载事件
         */
        this.onLoad = function () { };
        /**
         * 成功事件
         */
        this.onSuccess = function () { };
        /**
         * 失败事件
         */
        this.onFail = function () { };
        /**
         * 异常事件
         */
        this.onError = function () { };
    }
}

export default JuesApiOption;