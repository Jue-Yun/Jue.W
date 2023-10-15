/**
 * Jues配置
 */
class JuesConfigure {
    /**
     * Jues配置
     */
    constructor() {
        //console.log(process.env);
        //kswitch(import.meta)
        this.Mode = process.env.VUE_APP_ENV;
        this.ApiUrl = process.env.VUE_APP_API_URL;
        this.JwtHeader = "Jwt-Token";
        this.JwtTokenStorage = "Jwt-Token";
        this.JwtExpireStorage = "Jwt-Expire";
        this.JwtUpdateStorage = "Jwt-Update";
    }
}

export default JuesConfigure;