// 定义样式
let css_notice = $.uuid();
$.Body.css()
    // 定义提示
    .set(css_notice, {
        fontSize: "14px",
        position: "fixed",
        left: "50%",
        marginLeft: "-120px",
        width: "240px",
        top: "50px",
        backgroundColor: "#000",
        borderRadius: "4px",
        padding: "10px",
        textAlign: "center",
    })
console.log(css_notice);

// 执行代码
$.ready(function () {
    let $notice = $.element("notice");
    $notice.class(css_notice);
    $.notice = function (content) {
        $notice.Element.innerHTML = content;
        $notice.style({ display: "block" });
        setTimeout(function () {
            $notice.style({ display: "none" });
        }, 3000);
    }
    $.notice("加载完成");
});