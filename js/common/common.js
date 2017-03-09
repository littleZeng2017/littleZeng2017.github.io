/**
 * Created by Administrator on 2017/3/9.
 */
define(['jquery'],function ($) {
    $(document).ajaxStart(function () {
        $(".overlay").show();
    }).ajaxStop(function () {
        $(".overlay").hide();
    });
})