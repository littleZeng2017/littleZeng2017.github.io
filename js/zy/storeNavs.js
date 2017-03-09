/**
 * Created by Pig on 2017/3/8.
 */
define(['jquery','template','common','nprogress'],function($,template,undefined,Nprogress){
    //调用进度条结束的方法
    Nprogress.done();
    //发送ajax请求获取要渲染的数据
    $.get('http://mmb.ittun.com/api/getsitenav',function(result){
        console.log(result);
        //渲染模板引擎的数据到网页中
        $('.navs').html(template('navs-tpl',result));
    })


});