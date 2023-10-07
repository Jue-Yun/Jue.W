// 默认启动脚本
$.ready(function () {
    // 判断配置是否存在
    if (typeof ($.configs) === "undefined") $.notice("未发现配置信息");
    // 读取配置
    let cfg = $.configs[0];
    if (typeof (cfg) === "undefined") $.notice("未发现配置信息");
    // 显示提示信息
    $.notice(cfg);
    // 启动远程脚本呢
    $.start("notice/startup.js");
});