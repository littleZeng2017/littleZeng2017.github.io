define(['jquery','template','common','nprogress'],function($,template,undefined,Nprogress){
    //调用进度条结束的方法
    Nprogress.done();
    //发送ajax请求获取平牌列表
    $.get('http://mmb.ittun.com/api/getbrandtitle',function(data){
        var html=template("list_ment",{list:data.result});
        $("#list_nav").html(html);
    })


})