/**
 * Jues Api返回结果
 */
class JuesApiResult {
    /**
     * Jues Api返回结果
     * @param {String} message 
     */
    constructor(message) {
        this.success = false;
        if (typeof (message) === "undefined") message = "";
        this.message = message;
    }
}

export default JuesApiResult;