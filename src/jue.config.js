$.configs = {
    hosts: [
        { host: "*", url: "http://127.0.0.1:8082" }
    ],
    paths: {
        // 配置接口
        config: "/juew/configure",
        // 登录接口（可选）
        login: "/juew/login",
        // 应用信息（可选）
        app: "/juew/apps",
    }
}