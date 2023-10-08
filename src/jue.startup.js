// 默认启动脚本
$.ready(async function () {
    // 判断配置是否存在
    if (typeof ($.configs) === "undefined") {
        $.notice("未发现配置信息");
        return;
    }
    // 读取主机配置
    let host = window.location.host;
    let cfg = undefined;
    console.log("host: " + host);
    // 以host匹配方式获取
    for (let i = 0; i < $.configs.hosts.length; i++) {
        let item = $.configs.hosts[i];
        if (item.host == host) {
            cfg = item;
            break;
        }
    }
    // 以*方式获取
    if (typeof (cfg) === "undefined") {
        for (let i = 0; i < $.configs.hosts.length; i++) {
            let item = $.configs.hosts[i];
            if (item.host == "*") {
                cfg = item;
                break;
            }
        }
    }
    if (typeof (cfg) === "undefined") {
        $.notice("未发现配置信息");
        return;
    }
    // 显示提示信息
    $.notice(cfg.url);
    // 执行提示优化脚本
    $.start("notice/startup.js");
    // 获取服务器配置
    let res = await $.get(cfg.url + "/juew/configure", {
        "Juew-Web-Protocol": window.location.protocol,
        "Juew-Web-Host": window.location.host,
        "Juew-Server-Host": cfg.host,
        "Juew-Server-Url": cfg.url,
    });
});