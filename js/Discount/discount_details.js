/**
 * Created by hujiacheng on 2017/3/6.
 */
define(['jquery','template','util','common','nprogress'],function ($,template,util,undefined,Nprogress) {
    //调用进度条结束的方法
    Nprogress.done();
    var productid=util.queryUrl('id');
    var str='';
    console.log(productid);
    $.get('http://mmb.ittun.com/api/getdiscountproduct',{productid :productid},function (data) {
        console.log(data.result[0]);
        //渲染之前注册自己的方法
        template.helper('Map',Map);
        function Map(str) {
            var str1=str.slice(0,8);
            return str1;
        }
        var html=template('discount_details_tpl',data.result[0]);
        $('#details_tpl').html(html);
        $('.carousel').carousel({
            interval: 2000
        })
        var startX=0,moveX=0,distance=0;
        $('.carousel-inner').on('touchstart',function (e) {
            startX=e.originalEvent.changedTouches[0].pageX;
        })
        $('.carousel-inner').on('touchmove',function (e) {
            moveX=e.originalEvent.changedTouches[0].pageX;
            distance=moveX-startX;
        })
        $('.carousel-inner').on('touchend',function (e) {
            if(Math.abs(distance)>$(window).width()/3){
                if(distance>0){
                    $('.carousel').carousel('prev');
                }else if(distance<0){
                    $('.carousel').carousel('next');
                }
            }
        })

        var userName=$('#ctl00_ContentBody_lbl_fbr').val();//评论用户名
        var comments=$('#ctl00_ContentBody_hid_name').val();//评论内容
        var NowTime=util.getNowTime();//评论当前时间
        str+='<li class="ui-border-b">'+
            '<div class="userimg">'+
            '<img src="http://bbs.manmanbuy.com/images/face/none.gif">'+
            '</div>'+
            '<div class="con">'+
            '<div class="name clearfix">'+
            '<div class="username">'+userName+'</div>'+
            '<div class="time">'+NowTime+'</div>'+
            '</div>'+
            '<div class="content">'+comments+'</div>'+
            '</div>'+
            '</li>';
        $('.list ul').html(str);

        //点击评论按钮进行评论
        var submit=document.querySelector("#ctl00_ContentBody_Button1");
        //清除提交按钮的type类型
        $('#ctl00_ContentBody_Button1').attr('type','button')
        submit.onclick=function () {
            //获取输入的内容
            var writeComments=$('#ctl00_ContentBody_txt_nr').val();
            $('#ctl00_ContentBody_txt_nr').val('');
            str+='<li class="ui-border-b">'+
                '<div class="userimg">'+
                '<img src="http://bbs.manmanbuy.com/images/face/none.gif">'+
                '</div>'+
                '<div class="con">'+
                '<div class="name clearfix">'+
                '<div class="username">手机端网友58***74</div>'+
                '<div class="time">'+NowTime+'</div>'+
                '</div>'+
                '<div class="content">'+writeComments+'</div>'+
                '</div>'+
                '</li>';
            $('.list ul').html(str);
            console.log(util.getNowTime());
        }
    })
})