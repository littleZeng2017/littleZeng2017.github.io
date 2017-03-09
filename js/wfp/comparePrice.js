/**
 * Created by Administrator on 2017/3/6.
 */
define(['jquery','util','template','nprogress','common'],function ($,util,template,Nprogress,undefined) {
    //调用进度条结束的方法
    Nprogress.done();
    $.get('http://139.199.157.195:9090/api/getcategorytitle',function (data) {
        console.log(data);
        $(".brief").html(template('brief_tpl',{list:data.result}));

        for (var i=0;i<data.result.length;i++){
            var obj = {};
            (function (titleid) {
                $.get('http://mmb.ittun.com/api/getcategory',{titleid: titleid},function (data) {
                    // console.log(data.result);
                    obj[titleid]=data;
                    $(".briefin ").eq(titleid).find('.fl_all').html(template("table_tpl",obj[titleid]));
                });
            })(data.result[i].titleId);
            // nprogress.done();
        };
        // $(document).ready(function () {
        $('.fl_all').slideUp();
        $(document).on('click','.fl_t', function () {
            console.log(111);
            if ($(this).next().css("display") == "none") {
                $('.fl_all').slideUp();
                $(this).next().stop().slideDown();
                $(".fl_t a").css('background','url(http://www.zuyushop.com/wap/images/arrow1.gif)right center no-repeat')
                $(this).find('a').css('background','url(http://www.zuyushop.com/wap/images/arrow2.gif)right center no-repeat')
            }
            else {
                $(this).next().slideUp();
                $(this).find('a').css('background','url(http://www.zuyushop.com/wap/images/arrow1.gif) right center no-repeat')
            }
            $(document).on('click','.div1 a',function () {
                var categoryId = $(this).attr('class')
                location.href='/html/wfp/comparePrice_product.html?categoryId='+categoryId;
            })
        });
    });
    // });

    window.onresize = function(){
        if(document.body.clientWidth < 280){
            $("#form_search").css('display','none')
        }else {
            $("#form_search").css('display','block')
        }
    }
})