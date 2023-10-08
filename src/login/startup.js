// 执行代码
$.ready(function () {
    // 注册样式
    let compnentName = "jue.login";
    for (let i = 0; i < $.compnents.length; i++) {
        let compnent = $.compnents[i];
        if (compnent.Name === compnentName) throw "组件" + compnentName + "已经存在";
    }
    $.Body.div().attr({ "class": "jue-login" });
});