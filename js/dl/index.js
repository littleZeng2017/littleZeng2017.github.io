/**
 * Created by Administrator on 2017/3/6.
 */
define(['jquery','common','template','nprogress'],function($,undefined,template,Nprogress){
    //调用进度条结束的方法
    Nprogress.done();
    init();
    function init(){
        //getIndexMenu();
        //menuToggle();
        getmoneyctrl();
    };

    //function menuToggle(){
    //    $('#menu .row>div:nth-last-child(-n+8)').on('click',function(){
    //        $('#menu .row>div:nth-last-child(-n+8)').stop(true,false).slideToggle();
    //
    //    })
    //};

    var pathData={
        0:'/html/wfp',
        1:'/html/lr',
        2:'/html/Discount',
        3:'/html/zy',
        4:'/html/lxh',
        5:'/html/hcx',
        8:'/html/lze',
        10:'/html/zy',
        11:'/html/ly'
    }
    //用来获取图片路径
    function getImgPath(str){
        var arr=str.split('');
        arr.splice(str.indexOf('"'),1,'\"/');
        return arr.join('');
    }
    //发送ajax请求获取导航信息
    $.get('http://mmb.ittun.com/api/getindexmenu',function(data){
        //处理图片路径
        getImgPath("<img src=\"images/ic_search.png\" alt=\"比价搜索\">");
        template.helper('format',getImgPath);

        //设置好跳转的路径
        data.pathData=pathData;
        console.log(data);
        $('#menu>.row').html(template('nav-tpl',data));

        //导航点击时下拉更多导航
        //$('.row>div:nth-last-of-type(-n+4)').hide();

        $('.row>div:nth-of-type(8)').click(function(){
            $('.row>div:nth-last-of-type(-n+4)').slideToggle();
            return false;
        })
    })



    function getmoneyctrl(){
        $.get('http://139.199.157.195:9090/api/getmoneyctrl',function(data){

            function sliceStr(str){
                str=str.slice(1);
                //console.log(str);
                //console.log(str.indexOf('人'));
                return str.slice(0,str.indexOf('人'));
            }

            //console.log(sliceStr("有1人评论"));
            template.helper('format',sliceStr);
            $('#goods_display').html(template('goods_tpl',data));

        })
    }

})
